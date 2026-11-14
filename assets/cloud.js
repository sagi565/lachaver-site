/* לאחבר: Google sign-in (Firebase Auth) and a per-user Firestore doc.
   users/{uid} = { favs: [ids], vault: { <vaultId>: <base64 key> }, name, email, updated }
   Firestore rules must allow each user to read/write only their own doc (see firestore.rules). */
window.Cloud = (() => {
  "use strict";
  const cfg = window.FIREBASE_CONFIG;
  const V = "10.12.2";
  const listeners = [];
  let user = null, auth = null, db = null, loaded = null, firstState = null, resolveFirst;
  firstState = new Promise(r => (resolveFirst = r));

  const load = src => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = () => rej(new Error("load " + src));
    document.head.append(s);
  });
  function init() {
    if (!cfg) { resolveFirst(null); return Promise.resolve(false); }
    return loaded ||= (async () => {
      const base = `https://www.gstatic.com/firebasejs/${V}/`;
      await load(base + "firebase-app-compat.js");
      await Promise.all([load(base + "firebase-auth-compat.js"), load(base + "firebase-firestore-compat.js")]);
      firebase.initializeApp(cfg);
      auth = firebase.auth(); db = firebase.firestore();
      auth.onAuthStateChanged(u => { user = u; resolveFirst(u); listeners.forEach(f => { try { f(u); } catch (e) { console.error(e); } }); });
      return true;
    })().catch(e => { console.warn("Firebase unavailable", e); resolveFirst(null); return false; });
  }
  const ref = () => db.collection("users").doc(user.uid);
  return {
    get enabled() { return !!cfg; },
    get user() { return user; },
    init,
    whenReady: () => (init(), firstState),
    onChange(f) { listeners.push(f); if (user) f(user); },
    async signIn() {
      if (!(await init())) throw new Error("not configured");
      const p = new firebase.auth.GoogleAuthProvider();
      p.setCustomParameters({ prompt: "select_account" });
      try { return (await auth.signInWithPopup(p)).user; }
      catch (e) {
        if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) { await auth.signInWithRedirect(p); return null; }
        throw e;
      }
    },
    signOut: () => auth && auth.signOut(),
    async read() { if (!user) return null; const s = await ref().get(); return s.exists ? s.data() : {}; },
    async write(data) {
      if (!user) return;
      await ref().set({ ...data, name: user.displayName || "", email: user.email || "", updated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    }
  };
})();
if (window.FIREBASE_CONFIG) Cloud.init();
