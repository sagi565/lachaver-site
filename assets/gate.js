/* לאחבר: password gate for the public build.
   The place data, hours and photos ship only as an AES-GCM encrypted vault.
   The password derives the key (PBKDF2-SHA256); nothing readable is public. */
window.Gate = (() => {
  "use strict";
  let resolve;
  const ready = new Promise(r => (resolve = r));
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const toB64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));

  async function deriveKey(pw, salt, iter) {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, true, ["decrypt"]);
  }
  async function unlock(vault, key) {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(vault.iv) }, key, b64(vault.ct));
    const d = JSON.parse(new TextDecoder().decode(pt));
    window.PLACES = d.places;
    window.HOURS = d.hours;
  }
  function done() {
    document.documentElement.classList.remove("locked");
    const g = document.getElementById("gate");
    if (g) g.remove();
    resolve();
  }
  function form(vault) {
    const g = document.createElement("div");
    g.id = "gate";
    g.className = "gate";
    g.innerHTML = `<form class="gate-card" novalidate>
      <img src="assets/logo.svg" alt="" width="56" height="56">
      <h1 translate="no">לא<span>חבר</span></h1>
      <p>האתר פרטי. כדי להיכנס צריך סיסמה.</p>
      <label class="sr" for="gatepw">סיסמה</label>
      <input id="gatepw" name="password" type="password" autocomplete="current-password" placeholder="סיסמה…" required>
      <label class="gate-remember"><input type="checkbox" name="remember" checked> לזכור אותי בדפדפן הזה</label>
      <button class="btn primary" type="submit">כניסה</button>
      <p class="gate-err" role="alert" aria-live="polite"></p>
    </form>`;
    document.body.append(g);
    const f = g.querySelector("form"), err = g.querySelector(".gate-err"), btn = f.querySelector("button");
    if (matchMedia("(pointer:fine)").matches) f.password.focus();
    f.onsubmit = async e => {
      e.preventDefault();
      const pw = f.password.value;
      if (!pw) { err.textContent = "כתבו את הסיסמה."; f.password.focus(); return; }
      btn.disabled = true; btn.textContent = "פותח…"; err.textContent = "";
      try {
        const key = await deriveKey(pw, b64(vault.salt), vault.iter);
        await unlock(vault, key);
        if (f.remember.checked) {
          try { localStorage.setItem("lachaver.key." + vault.id, toB64(await crypto.subtle.exportKey("raw", key))); } catch (_) {}
        }
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
      if (raw) {
        const key = await crypto.subtle.importKey("raw", b64(raw), "AES-GCM", false, ["decrypt"]);
        await unlock(vault, key);
        return done();
      }
    } catch (_) { try { localStorage.removeItem("lachaver.key." + vault.id); } catch (e) {} }
    form(vault);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  return { ready };
})();
