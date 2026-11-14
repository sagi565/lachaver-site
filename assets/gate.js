/* Lohaver: entry gate for the public build.
   - Signing in with Google is required to see the site.
   - The place data, hours and photos ship only as an AES-GCM encrypted vault. The first
     time a Google account comes in, it also enters the password; the key is then kept in
     that user's own Firestore doc (readable only by them) and in this browser, so after
     that Google alone opens the site, on any device.
   - Firebase keeps the Google session, so returning users go straight in. */
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
  const localKey = vault => { try { return localStorage.getItem("lachaver.key." + vault.id); } catch (_) { return null; } };
  const remember = (vault, raw) => { try { localStorage.setItem("lachaver.key." + vault.id, raw); } catch (_) {} };
  const forget = vault => { try { localStorage.removeItem("lachaver.key." + vault.id); } catch (_) {} };

  function done() {
    document.documentElement.classList.remove("locked");
    const g = document.getElementById("gate");
    if (g) g.remove();
    resolve();
    // signing out locks the site again
    let seen = true;
    Cloud.onChange(u => { if (!u && seen) location.reload(); });
  }
  async function keyFor(vault) {            // the key this signed-in user may use, or null
    const raw = localKey(vault);
    if (raw) { try { await unlock(vault, await importRaw(raw)); return true; } catch (_) { forget(vault); } }
    try {
      const d = await Cloud.read();
      const r = d && d.vault && d.vault[vault.id];
      if (r) { await unlock(vault, await importRaw(r)); remember(vault, r); return true; }
    } catch (e) { console.warn(e); }
    return false;
  }

  function card(inner) {
    let g = document.getElementById("gate");
    if (!g) { g = document.createElement("div"); g.id = "gate"; g.className = "gate"; document.body.append(g); }
    g.innerHTML = `<div class="gate-card">
      <img src="assets/logo.svg" alt="" width="56" height="56">
      <h1 translate="no" dir="ltr">Lo<span>haver</span></h1>
      ${inner}
      <p class="gate-err" role="alert" aria-live="polite"></p>
    </div>`;
    return g;
  }
  function signInScreen(vault) {
    const g = card(`<p>כדי לראות את האתר צריך להתחבר.</p>
      <button type="button" class="gbtn" data-google>${G_ICON}<span>המשך עם Google</span></button>`);
    const btn = g.querySelector("[data-google]"), err = g.querySelector(".gate-err");
    btn.onclick = async () => {
      err.textContent = ""; btn.disabled = true; btn.querySelector("span").textContent = "מתחבר…";
      try {
        await Cloud.signIn();
        if (!Cloud.user) return;                 // redirect flow: continues after reload
        await afterSignIn(vault);
      } catch (e) {
        btn.disabled = false; btn.querySelector("span").textContent = "המשך עם Google";
        if (!e || e.code !== "auth/popup-closed-by-user") err.textContent = "ההתחברות לא הצליחה. נסו שוב.";
      }
    };
  }
  function passwordScreen(vault) {
    const u = Cloud.user;
    const g = card(`<p>שלום ${esc(u.displayName || u.email || "")}. בכניסה הראשונה צריך גם את הסיסמה, ואחר כך Google לבד מספיק בכל מכשיר.</p>
      <form novalidate class="gate-form">
        <label class="sr" for="gatepw">סיסמה</label>
        <input id="gatepw" name="password" type="password" autocomplete="current-password" placeholder="סיסמה…" required>
        <button class="btn primary" type="submit">כניסה</button>
      </form>
      <button type="button" class="gate-switch" data-switch>להתחבר עם חשבון אחר</button>`);
    const f = g.querySelector("form"), err = g.querySelector(".gate-err"), btn = f.querySelector("button");
    if (matchMedia("(pointer:fine)").matches) f.password.focus();
    g.querySelector("[data-switch]").onclick = async () => { await Cloud.signOut(); signInScreen(vault); };
    f.onsubmit = async e => {
      e.preventDefault();
      const pw = f.password.value;
      if (!pw) { err.textContent = "כתבו את הסיסמה."; f.password.focus(); return; }
      btn.disabled = true; btn.textContent = "פותח…"; err.textContent = "";
      try {
        const key = await deriveKey(pw, b64(vault.salt), vault.iter);
        await unlock(vault, key);
        const raw = toB64(await crypto.subtle.exportKey("raw", key));
        remember(vault, raw);
        try { await Cloud.write({ vault: { [vault.id]: raw } }); } catch (e2) { console.warn(e2); }
        done();
      } catch (_) {
        btn.disabled = false; btn.textContent = "כניסה";
        err.textContent = "הסיסמה לא נכונה. נסו שוב.";
        f.password.select();
      }
    };
  }
  async function afterSignIn(vault) {
    if (await keyFor(vault)) return done();
    passwordScreen(vault);
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function start() {
    document.documentElement.classList.add("locked");
    card(`<p class="gate-wait">טוען…</p>`);
    let vault;
    try { vault = await (await fetch("assets/vault.json", { cache: "no-cache" })).json(); }
    catch (_) { card(`<p>לא הצלחתי לטעון את האתר. בדקו את החיבור ורעננו.</p>`); return; }
    if (!window.Cloud || !Cloud.enabled) { card(`<p>ההתחברות לא זמינה כרגע.</p>`); return; }
    const u = await Cloud.whenReady();          // Firebase restores the saved Google session here
    if (u) return afterSignIn(vault);
    signInScreen(vault);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return { ready };
})();
