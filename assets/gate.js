/* לאחבר: entry gate for the public build.
   The place data, hours and photos ship only as an AES-GCM encrypted vault.
   Ways in: the password (key derived with PBKDF2-SHA256), or "Continue with Google"
   once that Google account has entered the password before (the key is then kept in
   the user's own Firestore doc, readable only by them). */
window.Gate = (() => {
  "use strict";
  let resolve;
  const ready = new Promise(r => (resolve = r));
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const toB64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const G_ICON = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  async function deriveKey(pw, salt, iter) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, true, ["decrypt"]);
  }
  const importRaw = raw => crypto.subtle.importKey("raw", b64(raw), "AES-GCM", true, ["decrypt"]);
  async function unlock(vault, key) {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(vault.iv) }, key, b64(vault.ct));
    const d = JSON.parse(new TextDecoder().decode(pt));
    window.PLACES = d.places;
    window.HOURS = d.hours;
  }
  const remember = (vault, raw) => { try { localStorage.setItem("lachaver.key." + vault.id, raw); } catch (_) {} };
  async function saveToCloud(vault, raw) {
    if (!window.Cloud || !Cloud.user) return;
    try { await Cloud.write({ vault: { [vault.id]: raw } }); } catch (e) { console.warn(e); }
  }
  function done() {
    document.documentElement.classList.remove("locked");
    const g = document.getElementById("gate");
    if (g) g.remove();
    resolve();
  }
  async function tryCloud(vault) {
    if (!window.Cloud || !Cloud.user) return false;
    try {
      const d = await Cloud.read();
      const raw = d && d.vault && d.vault[vault.id];
      if (!raw) return false;
      await unlock(vault, await importRaw(raw));
      remember(vault, raw);
      return true;
    } catch (_) { return false; }
  }
  function form(vault) {
    const g = document.createElement("div");
    g.id = "gate";
    g.className = "gate";
    const google = window.Cloud && Cloud.enabled;
    g.innerHTML = `<form class="gate-card" novalidate>
      <img src="assets/logo.svg" alt="" width="56" height="56">
      <h1 translate="no">לא<span>חבר</span></h1>
      <p>האתר פרטי.</p>
      ${google ? `<button type="button" class="gbtn" data-google>${G_ICON}<span>המשך עם Google</span></button>
      <div class="gate-or"><span>או עם סיסמה</span></div>` : `<p>כדי להיכנס צריך סיסמה.</p>`}
      <label class="sr" for="gatepw">סיסמה</label>
      <input id="gatepw" name="password" type="password" autocomplete="current-password" placeholder="סיסמה…" required>
      <label class="gate-remember"><input type="checkbox" name="remember" checked> לזכור אותי בדפדפן הזה</label>
      <button class="btn primary" type="submit">כניסה</button>
      <p class="gate-err" role="alert" aria-live="polite"></p>
    </form>`;
    document.body.append(g);
    const f = g.querySelector("form"), err = g.querySelector(".gate-err"), btn = f.querySelector("button[type=submit]");
    const gbtn = f.querySelector("[data-google]");
    if (matchMedia("(pointer:fine)").matches && !google) f.password.focus();
    const signedInNote = u => { if (gbtn && u) { gbtn.querySelector("span").textContent = "מחובר כ-" + (u.displayName || u.email); gbtn.disabled = true; } };
    if (gbtn) {
      gbtn.onclick = async () => {
        err.textContent = ""; gbtn.disabled = true;
        try {
          await Cloud.signIn();
          if (!Cloud.user) return;               // redirect flow continues after reload
          if (await tryCloud(vault)) return done();
          signedInNote(Cloud.user);
          err.textContent = "בפעם הראשונה צריך גם את הסיסמה. אחר כך Google לבד יספיק, בכל מכשיר.";
          f.password.focus();
        } catch (e) {
          gbtn.disabled = false;
          err.textContent = e && e.code === "auth/popup-closed-by-user" ? "" : "ההתחברות עם Google לא הצליחה. נסו שוב או היכנסו עם הסיסמה.";
        }
      };
      Cloud.onChange(u => signedInNote(u));
    }
    f.onsubmit = async e => {
      e.preventDefault();
      const pw = f.password.value;
      if (!pw) { err.textContent = "כתבו את הסיסמה."; f.password.focus(); return; }
      btn.disabled = true; btn.textContent = "פותח…"; err.textContent = "";
      try {
        const key = await deriveKey(pw, b64(vault.salt), vault.iter);
        await unlock(vault, key);
        const raw = toB64(await crypto.subtle.exportKey("raw", key));
        if (f.remember.checked) remember(vault, raw);
        await saveToCloud(vault, raw);
        done();
      } catch (_) {
        btn.disabled = false; btn.textContent = "כניסה";
        err.textContent = "הסיסמה לא נכונה. נסו שוב.";
        f.password.select();
      }
    };
  }
  async function start() {
    document.documentElement.classList.add("locked");
    let vault;
    try { vault = await (await fetch("assets/vault.json", { cache: "no-cache" })).json(); }
    catch (_) { document.body.insertAdjacentHTML("beforeend", '<p class="gate-fail">לא הצלחתי לטעון את האתר. בדקו את החיבור ורעננו.</p>'); return; }
    try {
      const raw = localStorage.getItem("lachaver.key." + vault.id);
      if (raw) { await unlock(vault, await importRaw(raw)); return done(); }
    } catch (_) { try { localStorage.removeItem("lachaver.key." + vault.id); } catch (e) {} }
    if (window.Cloud && Cloud.enabled) {
      const u = await Promise.race([Cloud.whenReady(), new Promise(r => setTimeout(() => r(null), 4000))]);
      if (u && await tryCloud(vault)) return done();
    }
    form(vault);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return { ready };
})();
