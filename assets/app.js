/* Lohaver — shared code for all pages */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- icons ---------- */
const P={
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  heart:'<path d="M12 20.5s-7.6-4.6-9.3-9.4C1.4 7.4 3.7 4 7.2 4c2.1 0 3.7 1.1 4.8 2.7C13.1 5.1 14.7 4 16.8 4c3.5 0 5.8 3.4 4.5 7.1-1.7 4.8-9.3 9.4-9.3 9.4z"/>',
  star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z"/>',
  pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  nav:'<path d="M3 11l18-8-8 18-2-8z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  map:'<path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  locate:'<circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/><circle cx="12" cy="12" r="7"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  arrow:'<path d="M15 5l-7 7 7 7"/>',
  home:'<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/>',
  bag:'<path d="M5 8h14l-1 12.5H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  trash:'<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/>',
  share:'<circle cx="17.5" cy="5.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M8.7 10.8l6.6-4M8.7 13.2l6.6 4"/>',
  /* food */
  burger:'<path d="M4 10.5C4 6.9 7.6 4.5 12 4.5s8 2.4 8 6z"/><path d="M3.5 14h17"/><path d="M4.5 17.5h15a0 0 0 0 1 0 0 2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z"/>',
  bowl:'<path d="M3 11.5h18a9 8 0 0 1-18 0z"/><path d="M13 3l-3 8.5M20 4.5l-6.5 7"/>',
  pizza:'<path d="M4 7.5C9 4.5 15 4.5 20 7.5L12 21z"/><path d="M5.8 10.3c4-2 8.4-2 12.4 0"/><circle cx="10" cy="13" r=".6"/><circle cx="13.5" cy="15.5" r=".6"/>',
  fork:'<path d="M6.5 3v5.5a2.5 2.5 0 0 0 5 0V3M9 3v18"/><path d="M17.5 21V3c-2 1-3.5 4-3.5 8h3.5"/>',
  plate:'<path d="M3 18.5h18"/><path d="M4.5 18.5a7.5 7.5 0 0 1 15 0"/><path d="M12 11V8.5M10 8.5h4"/>',
  leaf:'<path d="M5 19C5 10 10.5 5 19.5 4.5 19.5 13 14 19 5 19z"/><path d="M5 19l8.5-8.5"/>',
  cup:'<path d="M4 9h13v5.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5v2.5M12.5 3.5v2.5"/>',
  icecream:'<path d="M7 10.5a5 5 0 0 1 10 0z"/><path d="M7 10.5l5 10.5 5-10.5"/>',
  /* shops */
  shirt:'<path d="M8.5 3.5L3.5 6.5l2 4.5 2.5-1v10.5h8V10l2.5 1 2-4.5-5-3a3.5 3.5 0 0 1-7 0z"/>',
  glasses:'<circle cx="6.5" cy="14.5" r="3.5"/><circle cx="17.5" cy="14.5" r="3.5"/><path d="M10 14.5h4M3 14l2.5-7M21 14l-2.5-7"/>',
  bottle:'<path d="M9.5 3h5v3.5h-5z"/><path d="M8 6.5h8v13a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 19.5z"/><path d="M8 11h8"/>',
  phone:'<rect x="6.5" y="3" width="11" height="18" rx="2"/><path d="M11 18h2"/>',
  house:'<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  baby:'<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  ball:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6c3.5 3.5 3.5 9.3 0 12.8M18.4 5.6c-3.5 3.5-3.5 9.3 0 12.8"/>',
  basket:'<path d="M3 9.5h18l-2 10.5H5z"/><path d="M8 9.5l3-6M16 9.5l-3-6M9 13.5v3M15 13.5v3"/>',
  paw:'<circle cx="6" cy="11" r="1.7"/><circle cx="9.5" cy="6.5" r="1.7"/><circle cx="14.5" cy="6.5" r="1.7"/><circle cx="18" cy="11" r="1.7"/><path d="M12 12.5c-2.8 0-5 3.2-5 5.2 0 1.7 1.7 2.3 5 2.3s5-.6 5-2.3c0-2-2.2-5.2-5-5.2z"/>',
  gift:'<path d="M3.5 9h17v4h-17zM5 13v7.5h14V13M12 9v11.5"/><path d="M12 9C10.5 5 6.5 4.6 6.5 7.2S12 9 12 9s5.5 1.8 5.5-1.8S13.5 5 12 9z"/>',
  gem:'<path d="M6.5 4h11l3.5 5-9 11.5L3 9z"/><path d="M3 9h18"/>',
  health:'<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/>',
  book:'<path d="M4 4.5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 4.5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>',
  tag:'<path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8.5 8.5-9 9z"/><circle cx="8" cy="8" r="1.3"/>'
};
const icon=(n,cls="")=>`<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||P.tag}</svg>`;

/* ---------- categories ---------- */
const CATS={
  food:{
    burger:{label:"המבורגר ובשרים",icon:"burger",color:"#c2412d"},
    asian:{label:"אסייתי וסושי",icon:"bowl",color:"#d97a22"},
    italian:{label:"איטלקי",icon:"fork",color:"#2b8a6b"},
    pizza:{label:"פיצה",icon:"pizza",color:"#e09a1a"},
    bistro:{label:"ביסטרו ובינלאומי",icon:"plate",color:"#6d4aa8"},
    mizrahi:{label:"מזרחי וצמחוני",icon:"leaf",color:"#4f8a2c"},
    cafe:{label:"בתי קפה ומאפים",icon:"cup",color:"#7a5234"},
    dessert:{label:"גלידה וקינוחים",icon:"icecream",color:"#d2457e"}
  },
  shop:{
    clothing:{label:"ביגוד והנעלה",icon:"shirt",color:"#3c5aa8"},
    optics:{label:"אופטיקה",icon:"glasses",color:"#2b8a8a"},
    beauty:{label:"טיפוח וקוסמטיקה",icon:"bottle",color:"#c44d86"},
    electronics:{label:"חשמל ואלקטרוניקה",icon:"phone",color:"#4a4f5c"},
    home:{label:"לבית ולמשרד",icon:"house",color:"#b26b2a"},
    kids:{label:"ילדים ותינוקות",icon:"baby",color:"#e08a2b"},
    sport:{label:"ספורט ופנאי",icon:"ball",color:"#2f8a4a"},
    grocery:{label:"מזון, מעדניות ומאפיות",icon:"basket",color:"#8a6a2a"},
    pets:{label:"חיות מחמד",icon:"paw",color:"#9a5a3a"},
    books:{label:"ספרים ולימודים",icon:"book",color:"#5a4aa0"},
    gifts:{label:"מתנות ותכשיטים",icon:"gift",color:"#b8404a"},
    health:{label:"בריאות ופארם",icon:"health",color:"#2a7fb8"},
    other:{label:"אחר",icon:"tag",color:"#6f6a63"}
  }
};
const AREA_LABEL={};
const areaLabel=a=>AREA_LABEL[a]||a;
const HOME=[32.0775,34.851];

/* ---------- storage ---------- */
const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
          set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
/* favorites: kept in this browser; when signed in with Google they sync to the account */
(function migrate(){ if(ls.get("lachaver.favs",null)) return;
  const all=new Set(ls.get("hvr-favs",[])); try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.startsWith("lachaver.favs:")) ls.get(k,[]).forEach(x=>all.add(x)); } }catch(e){}
  if(all.size) ls.set("lachaver.favs",[...all]); })();
const favs=new Set(ls.get("lachaver.favs",[]));
let cloudOn=false, cloudT;
const saveFavs=()=>{ ls.set("lachaver.favs",[...favs]); $$(".favcount").forEach(e=>e.textContent=favs.size||"");
  if(cloudOn&&window.Cloud&&Cloud.user){ clearTimeout(cloudT); cloudT=setTimeout(()=>Cloud.write({favs:[...favs]}).catch(e=>console.warn(e)),400); } };
async function syncFavs(){
  if(!window.Cloud||!Cloud.user) { cloudOn=false; return; }
  try{ const d=await Cloud.read(); const before=favs.size; (d&&d.favs||[]).forEach(x=>favs.add(x)); cloudOn=true; saveFavs();
    if(favs.size!==before) document.dispatchEvent(new CustomEvent("favs")); }catch(e){ console.warn(e); }
}
let custom=ls.get("lachaver.custom",[]);
const saveCustom=()=>ls.set("lachaver.custom",custom);
function places(kind){ return (window.PLACES||[]).filter(p=>!kind||p.kind===kind); }
const catOf=p=>(CATS[p.kind]||{})[p.cat]||CATS.shop.other;

/* ---------- location ---------- */
let ME=null;
try{ const c=JSON.parse(sessionStorage.getItem("lachaver.me")||"null"); if(c&&Date.now()-c.t<15*60e3) ME=c.ll; }catch(e){}
function km(a,b){const R=6371,t=Math.PI/180,dl=(b[0]-a[0])*t,dg=(b[1]-a[1])*t;
  const x=Math.sin(dl/2)**2+Math.cos(a[0]*t)*Math.cos(b[0]*t)*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(x));}
const origin=()=>ME||HOME;
const distOf=p=>km(origin(),[p.lat,p.lng]);
const nf0=new Intl.NumberFormat("he-IL",{maximumFractionDigits:0}), nf1=new Intl.NumberFormat("he-IL",{minimumFractionDigits:1,maximumFractionDigits:1});
const fmtKm=d=>d<1?nf0.format(Math.round(d*100)*10)+" מ׳":nf1.format(d)+" ק״מ";
function locate(){
  return new Promise((res,rej)=>{
    if(!navigator.geolocation) return rej(new Error("nogeo"));
    navigator.geolocation.getCurrentPosition(p=>{
      ME=[p.coords.latitude,p.coords.longitude];
      try{sessionStorage.setItem("lachaver.me",JSON.stringify({ll:ME,t:Date.now(),acc:p.coords.accuracy}));}catch(e){}
      res({ll:ME,acc:p.coords.accuracy});
    },rej,{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
  });
}
async function locationGranted(){ try{ return (await navigator.permissions.query({name:"geolocation"})).state==="granted"; }catch(e){ return false; } }


/* ---------- opening hours (OpenStreetMap opening_hours subset) ---------- */
const DOW={Su:0,Mo:1,Tu:2,We:3,Th:4,Fr:5,Sa:6};
function parseOH(str){
  if(!str) return null;
  const txt=str.replace(/"[^"]*"/g,"").trim();
  if(txt==="24/7") return [{days:[0,1,2,3,4,5,6],ranges:[[0,1440]]}];
  const rules=[];
  for(let part of txt.split(";")){
    part=part.trim(); if(!part||/^PH\b/.test(part)) continue;
    const m=part.match(/^((?:Mo|Tu|We|Th|Fr|Sa|Su)(?:\s*-\s*(?:Mo|Tu|We|Th|Fr|Sa|Su))?(?:\s*,\s*(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:\s*-\s*(?:Mo|Tu|We|Th|Fr|Sa|Su))?)*)?\s*(.*)$/);
    if(!m) return null;
    let days=[];
    if(m[1]) m[1].split(",").forEach(seg=>{ const [a,b]=seg.split("-").map(x=>DOW[x.trim()]);
      if(b===undefined) days.push(a); else { for(let d=a;;d=(d+1)%7){ days.push(d); if(d===b) break; } } });
    else days=[0,1,2,3,4,5,6];
    const rest=m[2].replace(/\bopen\b/,"").trim();
    let ranges=[];
    if(rest&&!/^(off|closed)$/.test(rest)){
      for(const r of rest.split(",")){
        const t=r.trim().match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\+?$/); if(!t) return null;
        ranges.push([+t[1]*60+ +t[2], +t[3]*60+ +t[4]]);
      }
    }
    rules.push({days,ranges});
  }
  return rules.length?rules:null;
}
function rangesOn(rules,d){ let r=[]; rules.forEach(x=>{ if(x.days.includes(d)) r=x.ranges; }); return r; }
const ilFmt=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
function ilNow(date=new Date()){
  const o={}; ilFmt.formatToParts(date).forEach(x=>o[x.type]=x.value);
  return {dow:DOW[o.weekday.slice(0,2)],min:(+o.hour%24)*60+ +o.minute};
}
const hm=m=>{ m=((m%1440)+1440)%1440; return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0"); };
const dayName=d=>new Intl.DateTimeFormat("he-IL",{weekday:"long"}).format(new Date(Date.UTC(2024,0,7+d,12)));
function hoursOf(p){
  if(p._oh!==undefined) return p._oh;
  const H=window.HOURS||{}; const src=(H.places||{})[p.id]||p.oh||((H.malls||{})[(H.mallOf||{})[p.id]]||{}).oh||null;
  p._ohSrc=(H.places||{})[p.id]?"place":src?"mall":null;
  return p._oh=parseOH(src);
}
function openState(p,now){
  const rules=hoursOf(p); if(!rules) return {known:false};
  const {dow,min}=ilNow(now);
  // ranges from yesterday that run past midnight
  for(const [a,b] of rangesOn(rules,(dow+6)%7)) if(b<=a&&min<b) return {known:true,open:true,until:b};
  for(const [a,b] of rangesOn(rules,dow)){
    const end=b<=a?b+1440:b;
    if(min>=a&&min<end) return {known:true,open:true,until:end};
  }
  for(let k=0;k<7;k++){
    const d=(dow+k)%7, rs=rangesOn(rules,d).map(r=>r[0]).filter(a=>k>0||a>min).sort((x,y)=>x-y);
    if(rs.length) return {known:true,open:false,next:rs[0],inDays:k,day:d};
  }
  return {known:true,open:false};
}
function statusHTML(p,short){
  const o=openState(p); if(!o.known) return "";
  if(o.open){ const left=o.until-ilNow().min;
    return `<span class="st ${left<=60?"soon":"open"}">${left<=60?"נסגר בקרוב":"פתוח"}<span>${short?"":" · "}${short?"":"עד "+hm(o.until)}</span></span>`; }
  if(o.next==null) return `<span class="st closed">סגור</span>`;
  const when=o.inDays===0?"היום":o.inDays===1?"מחר":"ב"+dayName(o.day);
  return `<span class="st closed">סגור<span>${short?"":" · נפתח "+when+" ב-"+hm(o.next)}</span></span>`;
}

/* ---------- links ---------- */
const gmaps=p=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.name+" "+(p.addr||""));
const waze=p=>`https://waze.com/ul?ll=${p.lat},${p.lng}&navigate=yes`;
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,"");}catch(e){return "אתר";}};
const pageOf=kind=>kind==="shop"?"shops.html":"food.html";

/* ---------- chrome: header, bottom nav, toast ---------- */
function chrome(active){
  const nav=[["index.html","בית","home","home"],["food.html","אוכל","fork","food"],["shops.html","חנויות","bag","shop"]];
  const skip=document.createElement("a"); skip.className="skip"; skip.href="#main"; skip.textContent="דלג לתוכן"; document.body.prepend(skip);
  const top=document.createElement("header"); top.className="top";
  top.innerHTML=`<div class="wrap">
    <a class="logo" href="index.html" aria-label="Lohaver, דף הבית"><img src="assets/logo.svg" alt="" width="30" height="30"><b translate="no" dir="ltr">Lo<span>haver</span></b></a>
    <nav class="nav">${nav.map(([h,t,,k])=>`<a href="${h}" class="${k===active?"on":""}">${t}</a>`).join("")}</nav>
    <div class="spacer"></div>
    <a class="favlink" href="food.html?fav=1" title="המועדפים שלי">${icon("heart")}<span class="t">מועדפים</span><em class="favcount">${favs.size||""}</em></a>
    <div class="acct" hidden></div>
  </div>`;
  skip.after(top);
  account($(".acct",top));
  const b=document.createElement("nav"); b.className="bnav";
  b.innerHTML=nav.map(([h,t,ic,k])=>`<a href="${h}" class="${k===active?"on":""}">${icon(ic)}${t}</a>`).join("");
  document.body.append(b);
  const t=document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.append(t);
}
const G_ICON='<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
function account(box){
  if(!window.Cloud||!Cloud.enabled) return;            // no Firebase config: no sign-in button at all
  box.hidden=false;
  const draw=u=>{
    if(!u){ box.innerHTML=`<button type="button" class="gbtn sm" data-signin>${G_ICON}<span>התחברות</span></button>`;
      $("[data-signin]",box).onclick=()=>Cloud.signIn().then(()=>toast("התחברת. המועדפים שלך נשמרים בחשבון.")).catch(e=>{ if(!e||e.code!=="auth/popup-closed-by-user") toast("ההתחברות לא הצליחה. נסו שוב."); });
      return; }
    const name=u.displayName||u.email||"";
    box.innerHTML=`<button type="button" class="acctbtn" aria-haspopup="true" aria-expanded="false" aria-label="החשבון שלי: ${esc(name)}">${u.photoURL?`<img src="${esc(u.photoURL)}" alt="" width="30" height="30" referrerpolicy="no-referrer">`:`<span class="av">${esc([...name][0]||"?")}</span>`}</button>
      <div class="acctmenu" hidden><b>${esc(u.displayName||"")}</b><small>${esc(u.email||"")}</small><button type="button" class="btn sm" data-signout>התנתקות</button></div>`;
    const btn=$(".acctbtn",box), menu=$(".acctmenu",box);
    const open=o=>{ menu.hidden=!o; btn.setAttribute("aria-expanded",o); };
    btn.onclick=e=>{ e.stopPropagation(); open(menu.hidden); };
    document.addEventListener("click",e=>{ if(!menu.hidden&&!e.target.closest(".acct")) open(false); });
    document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!menu.hidden){ open(false); btn.focus(); } });
    $("[data-signout]",box).onclick=()=>{ Cloud.signOut(); cloudOn=false; toast("התנתקת"); };
  };
  draw(Cloud.user);
  Cloud.onChange(u=>{ draw(u); if(u) syncFavs(); });
}
let toastT;
function toast(msg){ const t=$(".toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("show"),2400); }

/* ---------- rendering ---------- */
function initials(name){ const w=String(name).replace(/["'״׳()]/g,"").trim().split(/\s+/).filter(Boolean); return ((w[0]||"")[0]||"")+((w[1]||"")[0]||""); }
function photo(p){
  const c=catOf(p);
  if(p.img) return `<img src="${esc(p.img)}" alt="" loading="lazy" decoding="async" width="240" height="240">`;
  const tile=`<div class="ph-tile" style="--c:${c.color}">${icon(c.icon,"ph-tile-ic")}<span class="ph-tile-tx">${esc(initials(p.name))}</span></div>`;
  if(!p.dom) return tile;
  return `${tile}<div class="ph-logo"><img class="logo-img" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(p.dom)}&sz=128" alt="" loading="lazy" decoding="async" width="64" height="64" referrerpolicy="no-referrer"></div>`;
}
/* brand logos: hide the generic 16px "no icon" result so the designed tile shows instead */
document.addEventListener("load",e=>{ const im=e.target; if(im.classList&&im.classList.contains("logo-img")){ const w=im.naturalWidth;
  if(w<=16) im.parentNode.remove(); else im.parentNode.classList.add(w>=96?"big":"ok"); } },true);
document.addEventListener("error",e=>{ const im=e.target; if(im.classList&&im.classList.contains("logo-img")) im.parentNode.remove(); },true);
function rating(p){
  return p.rating==null?"":`<span class="rate">${icon("star")}<b>${p.rating.toFixed(1)}</b>${p.reviews?`<span>(${nf0.format(p.reviews)})</span>`:""}</span>`;
}
function metaLine(p,withDist=true){
  const c=catOf(p), bits=[];
  bits.push(`<span>${esc(p.type||c.label)}</span>`);
  if(withDist) bits.push(`<span>${fmtKm(distOf(p))}</span>`);
  return bits.join(`<span class="sep"></span>`);
}
function tags(p){
  return (p.deal?`<span class="tag deal">${esc(p.deal)}</span>`:"")+(p.kosher?`<span class="tag k">כשר</span>`:"")+(p.mine?`<span class="tag mine">הוספת</span>`:"");
}
function actions(p,small){
  const s=small?" sm":"";
  return `<a class="btn${s}" href="${waze(p)}" target="_blank" rel="noopener" translate="no">${icon("nav")}Waze</a>
    <a class="btn${s}" href="${gmaps(p)}" target="_blank" rel="noopener">${icon("map")}גוגל מפות</a>
    ${p.site?`<a class="btn${s}" href="${esc(p.site)}" target="_blank" rel="noopener">${icon("globe")}${esc(host(p.site))}</a>`:""}`;
}
function heartBtn(p){ return `<button class="heart ${favs.has(p.id)?"on":""}" data-fav="${esc(p.id)}" aria-label="שמירה במועדפים" aria-pressed="${favs.has(p.id)}">${icon("heart")}</button>`; }
function cardHTML(p,sel){
  return `<article class="card ${sel?"sel":""}" data-id="${esc(p.id)}">
    <div class="ph">${photo(p)}</div>
    <div class="cb">
      <div class="row1"><h2><button type="button" class="cardbtn" data-open="${esc(p.id)}">${esc(p.name)}</button></h2>${heartBtn(p)}</div>
      <div class="meta">${rating(p)}${tags(p)}</div>
      <div class="meta">${statusHTML(p)}${metaLine(p)}</div>
      <div class="addr">${esc(p.addr||"")}</div>
      <div class="acts">${actions(p,true)}${p.mine?`<button class="btn sm ghost" data-del="${esc(p.id)}" aria-label="מחיקה">${icon("trash")}</button>`:""}</div>
    </div></article>`;
}
function tileHTML(p){
  return `<a class="tile" href="${pageOf(p.kind)}?id=${encodeURIComponent(p.id)}">
    <div class="ph">${photo(p)}<span class="dist">${fmtKm(distOf(p))}</span></div>
    <div class="cb"><div class="row1"><h3>${esc(p.name)}</h3></div>
      <div class="meta">${rating(p)}${tags(p)}</div>
      <div class="meta">${statusHTML(p,true)}<span>${esc(p.type||catOf(p).label)}</span><span class="sep"></span><span>${esc(areaLabel(p.area||""))}</span></div></div></a>`;
}
function toggleFav(id){ favs.has(id)?favs.delete(id):favs.add(id); saveFavs(); $$(`[data-fav="${CSS.escape(id)}"]`).forEach(b=>{b.classList.toggle("on",favs.has(id));b.setAttribute("aria-pressed",favs.has(id));}); return favs.has(id); }
document.addEventListener("click",e=>{
  const h=e.target.closest("[data-fav]"); if(h){ e.preventDefault(); e.stopPropagation(); const on=toggleFav(h.dataset.fav); toast(on?"נשמר במועדפים":"הוסר מהמועדפים"); document.dispatchEvent(new CustomEvent("favs")); }
},true);

/* ---------- base map ---------- */
const OFM_ATTR='<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';
let rtlSet=false, styleP=null;
function hebrewStyle(){
  return styleP ||= fetch("https://tiles.openfreemap.org/styles/liberty").then(r=>r.json()).then(st=>{
    st.layers.forEach(l=>{ const tf=l.layout&&l.layout["text-field"];
      if(tf&&JSON.stringify(tf).includes("name")) l.layout["text-field"]=["coalesce",["get","name:he"],["get","name"]]; });
    return googleize(st); });
}
/* recolor OpenFreeMap "liberty" into a Google-Maps-like palette */
function googleize(st){
  const G={land:"#f5f5f3",urban:"#efefed",park:"#c5e8c5",wood:"#b5dfb2",water:"#9fd3f2",sand:"#f5ecd2",
    hospital:"#fbe3e1",school:"#eeeaf6",building:"#e9e8e5",buildingLine:"#dcdbd7",
    road:"#ffffff",roadLine:"#dadce0",major:"#ffffff",majorLine:"#c9ccd1",hwy:"#fdd96b",hwyLine:"#e8b84a",
    rail:"#c4c7cc",text:"#5f6368",place:"#3c4043",poi:"#70757a",parkText:"#2d7a3e",waterText:"#3f7fb5"};
  const paint=(l,k,v)=>{ l.paint=l.paint||{}; l.paint[k]=v; };
  const hide=l=>{ l.layout=l.layout||{}; l.layout.visibility="none"; };
  st.layers.forEach(l=>{
    const id=l.id, t=l.type;
    if(id==="background") paint(l,"background-color",G.land);
    else if(id==="natural_earth"||id==="building-3d"||id==="poi_r20"||id==="poi_r7"||/hatching$/.test(id)||id==="road_area_pattern") hide(l);
    else if(id==="park") { paint(l,"fill-color",G.park); paint(l,"fill-opacity",1); }
    else if(id==="park_outline") hide(l);
    else if(id==="landuse_residential") { paint(l,"fill-color",G.urban); paint(l,"fill-opacity",.6); }
    else if(id==="landcover_wood") { paint(l,"fill-color",G.wood); paint(l,"fill-opacity",1); }
    else if(/landcover_grass|landuse_pitch|landuse_track|landuse_cemetery/.test(id)) { paint(l,"fill-color",G.park); paint(l,"fill-opacity",.9); }
    else if(id==="landcover_sand") paint(l,"fill-color",G.sand);
    else if(id==="landuse_hospital") paint(l,"fill-color",G.hospital);
    else if(id==="landuse_school") paint(l,"fill-color",G.school);
    else if(id==="water") paint(l,"fill-color",G.water);
    else if(/^waterway/.test(id)&&t==="line") paint(l,"line-color",G.water);
    else if(id==="building") { paint(l,"fill-color",G.building); paint(l,"fill-outline-color",G.buildingLine); paint(l,"fill-opacity",1); }
    else if(/aeroway_fill/.test(id)) paint(l,"fill-color","#e8eaed");
    else if(/aeroway_(runway|taxiway)/.test(id)) paint(l,"line-color","#d5d7db");
    else if(t==="line"&&/(rail)/.test(id)) paint(l,"line-color",G.rail);
    else if(t==="line"&&/motorway/.test(id)) paint(l,"line-color",/casing/.test(id)?G.hwyLine:G.hwy);
    else if(t==="line"&&/trunk_primary/.test(id)) paint(l,"line-color",/casing/.test(id)?G.majorLine:G.major);
    else if(t==="line"&&/path_pedestrian/.test(id)) { paint(l,"line-color","#e3e5e8"); if(l.paint["line-dasharray"]) delete l.paint["line-dasharray"]; }
    else if(t==="line"&&/^(road|tunnel|bridge)_/.test(id)) paint(l,"line-color",/casing/.test(id)?G.roadLine:G.road);
    else if(/^boundary/.test(id)) paint(l,"line-color","#b9bcc1");
    if(t==="symbol"&&l.layout&&l.layout["text-field"]){
      let c=G.text;
      if(/^label_/.test(id)) c=G.place; else if(/^water/.test(id)) c=G.waterText; else if(/^poi/.test(id)) c=G.poi;
      paint(l,"text-color",c); paint(l,"text-halo-color","#ffffff"); paint(l,"text-halo-width",1.6); paint(l,"text-halo-blur",.2);
    }
    if(/^poi_/.test(id)&&l.paint) paint(l,"icon-opacity",.85);
  });
  return st;
}
function baseLayer(map){
  const gl=window.maplibregl&&L.maplibreGL&&(maplibregl.supported?maplibregl.supported():true);
  if(gl){
    if(!rtlSet){ rtlSet=true; try{ maplibregl.setRTLTextPlugin("https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",true); }catch(e){} }
    const layer=L.maplibreGL({style:{version:8,sources:{},layers:[]},attribution:OFM_ATTR}).addTo(map);
    hebrewStyle().then(st=>layer.getMaplibreMap().setStyle(st)).catch(()=>{ map.removeLayer(layer); osm(map); });
    return layer;
  }
  return osm(map);
}
const osm=map=>L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(map);
function pinIcon(p,sel){
  const c=catOf(p);
  const sz=sel?[30,40]:[26,34];
  return L.divIcon({className:"gpin-wrap",iconSize:sz,iconAnchor:[sz[0]/2,sz[1]],popupAnchor:[0,-sz[1]+2],
    html:`<div class="gpin ${favs.has(p.id)?"fav":""} ${sel?"sel":""}" data-r="${p.rating||0}" style="--c:${sel?"#ea4335":c.color}">
      <svg class="gpin-shape" viewBox="0 0 26 34" aria-hidden="true"><path d="M13 33s-11-10.2-11-19.2A11 11 0 0 1 24 13.8C24 22.8 13 33 13 33z"/></svg>
      ${icon(sel?"pin":c.icon,"gpin-ic")}
      <span class="gpin-label">${esc(p.name)}</span></div>`});
}
const meIcon=()=>L.divIcon({className:"",html:`<div class="me-dot"></div>`,iconSize:[18,18],iconAnchor:[9,9]});

/* ---------- add-a-place sheet ---------- */
function addSheet(kind,onSaved){
  let m=$("#addsheet");
  if(!m){
    m=document.createElement("div"); m.id="addsheet"; m.className="modal"; m.setAttribute("role","dialog"); m.setAttribute("aria-modal","true");
    document.body.append(m);
  }
  const cats=CATS[kind];
  m.innerHTML=`<form class="sheet" novalidate>
    <div class="sheet-h"><h2>${kind==="shop"?"הוספת חנות":"הוספת מקום אוכל"}</h2><button type="button" class="btn ghost sm" data-close aria-label="סגירה">${icon("x")}</button></div>
    <div class="sheet-b">
      <label>שם<input name="name" required maxlength="80" autocomplete="off"></label>
      <div class="two">
        <label>קטגוריה<select name="cat">${Object.entries(cats).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join("")}</select></label>
        <label>עיר<select name="area">${[...new Set(places().map(p=>p.area))].sort((a,b)=>a.localeCompare(b,"he")).map(a=>`<option ${a==="גבעת שמואל"?"selected":""}>${esc(a)}</option>`).join("")}</select></label>
      </div>
      <label>כתובת<div class="addr-row"><input name="addr" placeholder="למשל: ויצמן 12, גבעת שמואל…" autocomplete="off" spellcheck="false"><button type="button" class="btn" data-geo>${icon("search")}איתור</button></div></label>
      <p class="hint" id="geohint" aria-live="polite">אפשר גם ללחוץ על המפה כדי לסמן את המיקום.</p>
      <div id="pickmap"></div>
      <div class="two">
        <label>ההטבה (לא חובה)<input name="deal" placeholder="למשל: 10% הנחה…" maxlength="80" autocomplete="off"></label>
        <label>אתר (לא חובה)<input name="site" type="url" inputmode="url" placeholder="https://…" maxlength="200" autocomplete="off" spellcheck="false"></label>
      </div>
    </div>
    <div class="sheet-f"><button class="btn primary" type="submit">${icon("plus")}שמירה</button><button class="btn ghost" type="button" data-close>ביטול</button></div>
  </form>`;
  const opener=document.activeElement;
  m.classList.add("open");
  const f=$("form",m), hint=$("#geohint",m);
  let ll=null, mk=null;
  const pm=L.map($("#pickmap",m),{zoomControl:false,attributionControl:false}).setView(ME||HOME,14);
  baseLayer(pm);
  const setLL=x=>{ ll=x; if(mk) mk.setLatLng(x); else mk=L.marker(x,{draggable:true,icon:pinIcon({kind,cat:f.cat.value,id:""})}).addTo(pm).on("dragend",e=>{const p=e.target.getLatLng();ll=[p.lat,p.lng];}); };
  pm.on("click",e=>setLL([e.latlng.lat,e.latlng.lng]));
  f.cat.onchange=()=>mk&&mk.setIcon(pinIcon({kind,cat:f.cat.value,id:""}));
  setTimeout(()=>{pm.invalidateSize();f.name.focus();},60);
  const close=()=>{ m.classList.remove("open"); pm.remove(); opener&&opener.focus&&opener.focus(); };
  $$("[data-close]",m).forEach(b=>b.onclick=close);
  m.onclick=e=>{ if(e.target===m) close(); };
  document.addEventListener("keydown",function k(e){ if(e.key==="Escape"&&m.classList.contains("open")){close();document.removeEventListener("keydown",k);} });
  async function geocode(){
    const q=f.addr.value.trim(); if(!q){ hint.textContent="כתבו כתובת קודם."; hint.className="hint err"; return; }
    hint.textContent="מחפש…"; hint.className="hint";
    try{
      const r=await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=il&accept-language=he&q="+encodeURIComponent(q));
      const j=await r.json();
      if(!j.length) throw 0;
      setLL([+j[0].lat,+j[0].lon]); pm.setView(ll,17);
      hint.textContent="נמצא. אם הסיכה לא במקום, גררו אותה."; hint.className="hint";
    }catch(e){ hint.textContent="לא מצאתי את הכתובת. סמנו את המקום על המפה."; hint.className="hint err"; }
  }
  $("[data-geo]",m).onclick=geocode;
  f.addr.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); geocode(); } };
  f.onsubmit=e=>{
    e.preventDefault();
    const name=f.name.value.trim();
    if(!name){ f.name.focus(); return; }
    if(!ll){ hint.textContent="צריך מיקום: איתור לפי כתובת או לחיצה על המפה."; hint.className="hint err"; f.addr.focus(); return; }
    let site=f.site.value.trim(); if(site&&!/^https?:\/\//.test(site)) site="https://"+site;
    const p={id:"u"+Date.now().toString(36),kind,mine:true,name,cat:f.cat.value,area:f.area.value,addr:f.addr.value.trim(),
      lat:+ll[0].toFixed(6),lng:+ll[1].toFixed(6),rating:null,reviews:null,type:"",deal:f.deal.value.trim(),site:site||null,kosher:false};
    custom.push(p); saveCustom(); close(); toast("נוסף לרשימה"); onSaved&&onSaved(p);
  };
}
function removeCustom(id){ custom=custom.filter(p=>p.id!==id); saveCustom(); favs.delete(id); saveFavs(); }
function exportCustom(){
  const blob=new Blob([JSON.stringify(custom,null,1)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="lohaver-places.json"; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
function importCustom(file,done){
  const r=new FileReader();
  r.onload=()=>{ try{ const arr=JSON.parse(r.result); if(!Array.isArray(arr)) throw 0;
    const ids=new Set(custom.map(p=>p.id)); let n=0;
    arr.forEach(p=>{ if(p&&p.id&&p.name&&isFinite(p.lat)&&isFinite(p.lng)&&CATS[p.kind]&&!ids.has(p.id)){ custom.push({...p,mine:true}); n++; } });
    saveCustom(); toast(n?`נוספו ${n} מקומות`:"לא נמצאו מקומות חדשים בקובץ"); done&&done(); }catch(e){ toast("הקובץ לא תקין"); } };
  r.readAsText(file);
}

/* ---------- explorer page (food / shops) ---------- */
function explorer(kind){
  const qs=new URLSearchParams(location.search);
  const st={q:qs.get("q")||"",area:qs.get("area")||null,cat:qs.get("cat")||null,kosher:qs.get("kosher")==="1",fav:qs.get("fav")==="1",open:qs.get("open")==="1",sort:qs.get("sort")||"dist",sel:qs.get("id")};
  const cats=CATS[kind];
  const el={list:$("#list"),count:$("#count"),areas:$("#areas"),cats:$("#cats"),q:$("#q"),sort:$("#sort"),kosher:$("#kosher"),fav:$("#favchip"),open:$("#openchip")};
  el.q.value=st.q; el.sort.value=st.sort;

  // map
  const map=L.map("map",{zoomControl:false,minZoom:9,maxZoom:20}).setView(HOME,14);
  L.control.zoom({position:"bottomright",zoomInTitle:"התקרבות",zoomOutTitle:"התרחקות"}).addTo(map);
  /* place names on the map: shown on every single pin, hidden only where they would overlap (like Google Maps) */
  let lblRaf=0;
  function placeLabels(){
    cancelAnimationFrame(lblRaf);
    lblRaf=requestAnimationFrame(()=>{
      const box=map.getContainer().getBoundingClientRect();
      const pins=[...map.getContainer().querySelectorAll(".gpin")];
      pins.forEach(el=>el.classList.remove("nolabel","lbl-left"));
      const taken=[]; const hit=r=>taken.some(t=>!(r.right<t.left||r.left>t.right||r.bottom<t.top||r.top>t.bottom));
      pins.forEach(el=>{ const r=el.getBoundingClientRect(); taken.push({left:r.left+3,right:r.right-3,top:r.top+3,bottom:r.bottom-2}); });
      // selected first, then favorites, then by rating
      pins.sort((a,b)=>(b.classList.contains("sel")-a.classList.contains("sel"))||(b.classList.contains("fav")-a.classList.contains("fav"))||((+b.dataset.r||0)-(+a.dataset.r||0)));
      for(const el of pins){
        const lb=el.querySelector(".gpin-label"); if(!lb) continue;
        let r=lb.getBoundingClientRect();
        const out=r=>r.left<box.left||r.right>box.right||r.top<box.top||r.bottom>box.bottom;
        if(hit(r)||out(r)){ el.classList.add("lbl-left"); r=lb.getBoundingClientRect();
          if(hit(r)||out(r)){ el.classList.remove("lbl-left"); el.classList.add("nolabel"); continue; } }
        taken.push({left:r.left-2,right:r.right+2,top:r.top-1,bottom:r.bottom+1});
      }
    });
  }
  map.on("zoomend moveend",placeLabels);
  baseLayer(map);
  let meMk=null, meCirc=null, pending=null, moved=false;
  const sized=fn=>{ map.invalidateSize(); if(map.getSize().x>0) fn(); else pending=fn; };
  const flush=()=>{ if(pending&&map.getSize().x>0){ const f=pending; pending=null; f(); } };
  function drawMe(acc){
    if(!ME) return;
    if(!meMk){ meCirc=L.circle(ME,{radius:acc||30,color:"#1a73e8",weight:1,fillOpacity:.07,interactive:false}).addTo(map);
      meMk=L.marker(ME,{icon:meIcon(),interactive:false,zIndexOffset:1000}).addTo(map); }
    else { meMk.setLatLng(ME); meCirc.setLatLng(ME).setRadius(acc||30); }
  }
  function centerMe(){
    if(!ME) return;
    sized(()=>{
      const near=items().slice().sort((a,b)=>distOf(a)-distOf(b)).slice(0,6).filter(p=>distOf(p)<25);
      if(!near.length){ map.setView(ME,14); return; }
      const pts=[ME]; near.forEach(p=>pts.push([p.lat,p.lng],[2*ME[0]-p.lat,2*ME[1]-p.lng]));
      map.setView(ME,Math.max(12,Math.min(16,map.getBoundsZoom(L.latLngBounds(pts).pad(.08)))));
    });
  }
  const Locate=L.Control.extend({options:{position:"bottomright"},onAdd(){
    const c=L.DomUtil.create("div","leaflet-bar leaflet-control");
    c.innerHTML=`<button class="mapbtn" title="המיקום שלי" aria-label="המיקום שלי">${icon("locate")}</button>`;
    L.DomEvent.disableClickPropagation(c);
    c.firstChild.onclick=()=>{ const b=c.firstChild; b.classList.add("busy");
      locate().then(r=>{ b.classList.remove("busy"); drawMe(r.acc); st.sort="dist"; el.sort.value="dist"; render(); centerMe(); })
        .catch(e=>{ b.classList.remove("busy"); toast(e&&e.code===1?"אין הרשאת מיקום. אפשר לאשר אותה בהגדרות האתר.":"לא הצלחתי לאתר את המיקום"); }); };
    return c; }});
  new Locate().addTo(map);
  map.on("dragstart",()=>moved=true);

  const markers=new Map();
  // clusters: only when pins really crowd, never spread out ("spiderfy"); a click just zooms in
  const SMALL=5;
  const layer=L.markerClusterGroup?L.markerClusterGroup({chunkedLoading:true,showCoverageOnHover:false,spiderfyOnMaxZoom:false,zoomToBoundsOnClick:true,
    disableClusteringAtZoom:18,maxClusterRadius:z=>z<13?50:z<16?36:56,
    iconCreateFunction:c=>{const n=c.getChildCount(); if(n<=SMALL) return smallGroupIcon(c);const sz=n<10?26:n<50?30:34;return L.divIcon({className:"",html:`<div class="cluster" style="width:${sz}px;height:${sz}px">${n}</div>`,iconSize:[sz,sz]});}}).addTo(map):L.layerGroup().addTo(map);
  if(layer.on) layer.on("animationend",placeLabels);
  /* a group of a few places looks like a pin with a small stack behind it (no number); click zooms in */
  function smallGroupIcon(c){
    const ms=c.getAllChildMarkers(); const ps=ms.map(m=>m.place).filter(Boolean);
    const best=ps.sort((a,b)=>(favs.has(b.id)-favs.has(a.id))||((b.rating||0)-(a.rating||0))||((b.reviews||0)-(a.reviews||0)))[0];
    if(!best) return L.divIcon({className:"",html:`<div class="cluster">${c.getChildCount()}</div>`,iconSize:[26,26]});
    const k=catOf(best);
    return L.divIcon({className:"gpin-wrap",iconSize:[26,34],iconAnchor:[13,34],
      html:`<div class="gpin stack" data-r="${best.rating||0}" style="--c:${k.color}">
        <svg class="gpin-shape gpin-back" viewBox="0 0 26 34" aria-hidden="true"><path d="M13 33s-11-10.2-11-19.2A11 11 0 0 1 24 13.8C24 22.8 13 33 13 33z"/></svg>
        <svg class="gpin-shape" viewBox="0 0 26 34" aria-hidden="true"><path d="M13 33s-11-10.2-11-19.2A11 11 0 0 1 24 13.8C24 22.8 13 33 13 33z"/></svg>
        ${icon(k.icon,"gpin-ic")}<span class="gpin-label">${esc(best.name)} <i>ועוד</i></span></div>`});
  }
  const openPin=(m)=>{ if(layer.zoomToShowLayer) layer.zoomToShowLayer(m,()=>m.openPopup()); else m.openPopup(); };
  // places at the same coordinates (e.g. one mall) get a small, stable offset around the point
  const spots=new Map();
  function spot(p){
    if(p._spot) return p._spot;
    const k=p.lat.toFixed(4)+","+p.lng.toFixed(4); const i=spots.get(k)||0; spots.set(k,i+1);
    if(!i) return p._spot=[p.lat,p.lng];
    const ang=i*2.399963, r=0.00004*Math.sqrt(i);   // golden-angle spiral, ~4 m steps
    return p._spot=[p.lat+r*Math.sin(ang),p.lng+r*Math.cos(ang)/Math.cos(p.lat*Math.PI/180)];
  }
  function popup(p){
    return `<div class="pop">${p.img?`<img src="${esc(p.img)}" alt="" width="250" height="120">`:""}<div class="in"><h3>${esc(p.name)}</h3>
      <div class="meta">${rating(p)}${tags(p)}<span>${esc(p.type||catOf(p).label)}</span></div>
      <div class="meta">${statusHTML(p)}</div>
      <div class="addr" style="white-space:normal">${p.addr?esc(p.addr)+" · ":""}${fmtKm(distOf(p))}</div>
      <div class="acts">${actions(p,true)}</div></div></div>`;
  }
  function items(){ return places(kind); }
  function filtered(){
    const q=st.q.trim().toLowerCase();
    const arr=items().filter(p=>{
      if(st.fav&&!favs.has(p.id)) return false;
      if(st.area&&p.area!==st.area) return false;
      if(st.cat&&p.cat!==st.cat) return false;
      if(st.kosher&&!p.kosher) return false;
      if(st.open&&!openState(p).open) return false;
      if(q&&!(p.name+" "+(p.addr||"")+" "+(p.type||"")+" "+catOf(p).label+" "+areaLabel(p.area||"")).toLowerCase().includes(q)) return false;
      return true;
    });
    const by={dist:(a,b)=>distOf(a)-distOf(b),rating:(a,b)=>(b.rating??0)-(a.rating??0)||(b.reviews??0)-(a.reviews??0),
      reviews:(a,b)=>(b.reviews??0)-(a.reviews??0),name:(a,b)=>a.name.localeCompare(b.name,"he")};
    return arr.sort(by[st.sort]);
  }
  function chips(){
    const base=items().filter(p=>!st.fav||favs.has(p.id));
    const cnt={}; base.forEach(p=>{ if(p.area) cnt[p.area]=(cnt[p.area]||0)+1; });
    const areas=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]||a.localeCompare(b,"he"));
    if(st.area&&!cnt[st.area]) areas.unshift(st.area);
    el.areas.innerHTML=`<label class="sr" for="citysel">עיר</label><select class="sel" id="citysel"><option value="">כל הערים (${nf0.format(base.length)})</option>${areas.map(a=>`<option value="${esc(a)}" ${st.area===a?"selected":""}>${esc(areaLabel(a))} (${nf0.format(cnt[a]||0)})</option>`).join("")}</select>`;
    const inA=base.filter(p=>!st.area||p.area===st.area);
    el.cats.innerHTML=`<button class="chip ${!st.cat?"on":""}" aria-pressed="${!st.cat}" data-c="">הכל</button>`+
      Object.entries(cats).map(([k,v])=>{ const n=inA.filter(p=>p.cat===k).length; if(!n&&st.cat!==k) return "";
        return `<button class="chip ${st.cat===k?"on":""}" aria-pressed="${st.cat===k}" data-c="${k}"><span class="dot" aria-hidden="true" style="background:${v.color}"></span>${v.label} <span class="n">${n}</span></button>`; }).join("");
    $("#citysel",el.areas).onchange=e=>{ st.area=e.target.value||null; render(true); };
    $$("[data-c]",el.cats).forEach(b=>b.onclick=()=>{ st.cat=b.dataset.c||null; render(true); });
    el.areas.style.display=el.cats.style.display=items().length?"":"none";
    [[el.fav,st.fav],[el.kosher,st.kosher],[el.open,st.open]].forEach(([b,v])=>{ if(b){ b.classList.toggle("on",v); b.setAttribute("aria-pressed",v); } });
  }
  function emptyHTML(){
    if(st.fav&&!favs.size) return `<div class="empty"><h3>אין עדיין מועדפים</h3><p>לחצו על הלב בכרטיס של מקום כדי לשמור אותו כאן.</p></div>`;
    if(!items().length) return `<div class="empty"><h3>עוד אין כאן מקומות</h3></div>`;
    if(st.open) return `<div class="empty"><h3>אין כרגע מקום פתוח שמתאים לסינון</h3><p>אפשר לבטל את "פתוח עכשיו" כדי לראות את כולם, כולל מקומות שאין לנו את השעות שלהם.</p><button class="btn" data-reset>ניקוי סינון</button></div>`;
    return `<div class="empty"><h3>לא נמצאו תוצאות</h3><p>נסו לשנות את הסינון.</p><button class="btn" data-reset>ניקוי סינון</button></div>`;
  }
  const PAGE=60; let shown=PAGE;
  function render(fit){
    const arr=filtered();
    chips();
    el.count.textContent=arr.length;
    const unk=st.open?items().filter(p=>!openState(p).known).length:0;
    const note=$("#opennote"); if(note){ note.hidden=!unk; note.textContent=unk?`${nf0.format(unk)} מקומות לא מוצגים כי השעות שלהם לא ידועות.`:""; }
    if(!render.keepPage) shown=PAGE;
    if(st.sel){ const i=arr.findIndex(p=>p.id===st.sel); if(i>=shown) shown=Math.ceil((i+1)/PAGE)*PAGE; }
    el.list.innerHTML=arr.length?arr.slice(0,shown).map(p=>cardHTML(p,st.sel===p.id)).join("")+
      (arr.length>shown?`<button type="button" class="btn more" data-more>עוד ${nf0.format(Math.min(PAGE,arr.length-shown))} מתוך ${nf0.format(arr.length-shown)} שנותרו</button>`:""):emptyHTML();
    const ids=new Set(arr.map(p=>p.id));
    // sync markers
    for(const [id,m] of markers){ if(!ids.has(id)){ layer.removeLayer(m); markers.delete(id);} }
    arr.forEach(p=>{ let m=markers.get(p.id);
      if(!m){ m=L.marker(spot(p),{icon:pinIcon(p,st.sel===p.id),riseOnHover:true}); m.place=p; m.bindPopup(()=>popup(p),{maxWidth:260,autoPanPaddingTopLeft:[20,80]}); layer.addLayer(m);
        m.on("click",()=>select(p.id,false)); markers.set(p.id,m); }
      else m.setIcon(pinIcon(p,st.sel===p.id)); });
    placeLabels();
    if(fit&&arr.length){ const pts=arr.map(p=>[p.lat,p.lng]); sized(()=>map.fitBounds(L.latLngBounds(pts).pad(.12),{maxZoom:16})); }
    // url state
    const u=new URLSearchParams(); if(st.q) u.set("q",st.q); if(st.area) u.set("area",st.area); if(st.cat) u.set("cat",st.cat); if(st.fav) u.set("fav","1"); if(st.kosher) u.set("kosher","1"); if(st.open) u.set("open","1"); if(st.sort!=="dist") u.set("sort",st.sort); if(st.sel) u.set("id",st.sel);
    history.replaceState(null,"",location.pathname+(u.toString()?"?"+u:""));
  }
  function select(id,fromList){
    st.sel=id; const p=items().find(x=>x.id===id); if(!p) return;
    $$(".card",el.list).forEach(c=>c.classList.toggle("sel",c.dataset.id===id));
    markers.forEach((m,k)=>{ const q=items().find(x=>x.id===k); q&&m.setIcon(pinIcon(q,k===id)); });
    const u=new URLSearchParams(location.search); u.set("id",id); history.replaceState(null,"",location.pathname+"?"+u);
    if(fromList){
      const go=()=>{ const m=markers.get(id); if(m) openPin(m); else map.setView([p.lat,p.lng],17); };
      if(mobile()){ setView("map"); setTimeout(()=>sized(go),80); } else sized(go);
    } else { const c=$(`.card[data-id="${CSS.escape(id)}"]`,el.list); c&&!mobile()&&c.scrollIntoView({behavior:"smooth",block:"nearest"}); }
  }
  el.list.addEventListener("click",e=>{
    if(e.target.closest("a,.heart")) return;
    const d=e.target.closest("[data-del]"); if(d){ e.stopPropagation(); if(confirm("למחוק את המקום שהוספת?")){ removeCustom(d.dataset.del); render(); toast("נמחק"); } return; }
    if(e.target.closest("[data-more]")){ shown+=PAGE; render.keepPage=true; render(); render.keepPage=false; return; }
    if(e.target.closest("[data-reset]")){ Object.assign(st,{q:"",area:null,cat:null,kosher:false,fav:false,open:false}); el.q.value=""; return render(true); }
    const c=e.target.closest(".card"); if(c) select(c.dataset.id,true);
  });
  document.addEventListener("favs",()=>{ if(st.fav) render(); else markers.forEach((m,k)=>{ const q=items().find(x=>x.id===k); q&&m.setIcon(pinIcon(q,k===st.sel)); }); });
  el.q.oninput=()=>{ st.q=el.q.value; render(); };
  el.sort.onchange=()=>{ st.sort=el.sort.value; render(); };
  el.kosher&&(el.kosher.onclick=()=>{ st.kosher=!st.kosher; render(true); });
  el.fav&&(el.fav.onclick=()=>{ st.fav=!st.fav; render(true); });
  el.open&&(el.open.onclick=()=>{ st.open=!st.open; render(true); });
  setInterval(()=>{ if(!document.hidden) render(); },60000);
  const ex=$("#export"), im=$("#import");
  ex&&(ex.onclick=()=>{ if(!custom.length) return toast("עוד לא הוספת מקומות"); exportCustom(); });
  im&&(im.onchange=()=>{ if(im.files[0]) importCustom(im.files[0],()=>render(true)); im.value=""; });

  // mobile list/map toggle
  const mobile=()=>matchMedia("(max-width:900px)").matches;
  function setView(v){
    document.body.classList.toggle("mapmode",v==="map");
    $("#vList").classList.toggle("on",v!=="map"); $("#vMap").classList.toggle("on",v==="map"); $("#vList").setAttribute("aria-pressed",v!=="map"); $("#vMap").setAttribute("aria-pressed",v==="map");
    if(v==="map"){ window.scrollTo(0,0); const f=$(".filters").getBoundingClientRect(); document.documentElement.style.setProperty("--mtop",Math.round(f.bottom)+"px");
      setTimeout(()=>{ map.invalidateSize(); flush(); },40); }
  }
  $("#vList").onclick=()=>setView("list"); $("#vMap").onclick=()=>setView("map");
  addEventListener("resize",()=>{ if(!mobile()) document.body.classList.remove("mapmode"); map.invalidateSize(); flush(); });

  // start
  render(!st.sel);
  if(st.sel){ const p=items().find(x=>x.id===st.sel); if(p) setTimeout(()=>select(p.id,true),150); }
  addEventListener("load",()=>{ if(!moved&&!st.sel&&!ME){ const arr=filtered(); arr.length&&sized(()=>map.fitBounds(L.latLngBounds(arr.map(p=>[p.lat,p.lng])).pad(.12),{maxZoom:16})); } });
  const afterLoc=r=>{ drawMe(r&&r.acc); if(!moved&&!st.sel){ st.sort="dist"; el.sort.value="dist"; render(); centerMe(); } };
  if(ME){ drawMe(); if(!st.sel) centerMe(); }
  else locate().then(afterLoc).catch(()=>{});
}

/* ---------- home page ---------- */
function home(){
  const food=places("food"), shops=places("shop");
  $("#nfood").textContent=food.length+" מקומות";
  $("#nshop").textContent=shops.length?shops.length+" חנויות":"הוסיפו את החנויות שאתם מכירים";
  const f=$("#hsearch"), inp=$("input",f), res=$("#hresults");
  const matchAll=q=>{ q=q.trim().toLowerCase(); if(!q) return {food:[],shop:[]};
    const hit=p=>(p.name+" "+(p.addr||"")+" "+(p.type||"")+" "+catOf(p).label+" "+(p.area||"")).toLowerCase().includes(q);
    const by=(a,b)=>distOf(a)-distOf(b);
    return {food:food.filter(hit).sort(by),shop:shops.filter(hit).sort(by)}; };
  const row=p=>`<a class="hr-row" href="${pageOf(p.kind)}?id=${encodeURIComponent(p.id)}"><span class="hr-ph">${photo(p)}</span><span class="hr-tx"><b>${esc(p.name)}</b><small>${esc(p.type||catOf(p).label)} · ${esc(p.area||"")} · ${fmtKm(distOf(p))}</small></span>${p.deal?`<span class="tag deal">${esc(p.deal)}</span>`:""}</a>`;
  function showResults(){
    const q=inp.value.trim(); if(!q){ res.hidden=true; res.innerHTML=""; inp.setAttribute("aria-expanded","false"); return; }
    const m=matchAll(q), enc=encodeURIComponent(q);
    const group=(title,list,page)=>list.length?`<div class="hr-group"><div class="hr-h"><span>${title}</span><a href="${page}?q=${enc}">כל ${nf0.format(list.length)} התוצאות ←</a></div>${list.slice(0,5).map(row).join("")}</div>`:"";
    res.innerHTML=(m.food.length||m.shop.length)?group("אוכל",m.food,"food.html")+group("חנויות",m.shop,"shops.html")
      :`<p class="hr-empty">לא נמצא שום דבר בשם הזה. נסו מילה אחרת, למשל סוג אוכל או שם של רשת.</p>`;
    res.hidden=false; inp.setAttribute("aria-expanded","true");
  }
  let hT; inp.addEventListener("input",()=>{ clearTimeout(hT); hT=setTimeout(showResults,120); });
  inp.addEventListener("focus",()=>{ if(inp.value.trim()) showResults(); });
  document.addEventListener("click",e=>{ if(!e.target.closest("#hsearch,#hresults")){ res.hidden=true; inp.setAttribute("aria-expanded","false"); } });
  inp.addEventListener("keydown",e=>{ if(e.key==="Escape"){ res.hidden=true; inp.setAttribute("aria-expanded","false"); } });
  f.onsubmit=e=>{ e.preventDefault(); const q=inp.value.trim(); const m=matchAll(q);
    location.href=(m.shop.length>m.food.length?"shops.html":"food.html")+(q?"?q="+encodeURIComponent(q):""); };
  function rows(){
    const all=places();
    const near=food.slice().sort((a,b)=>distOf(a)-distOf(b)).slice(0,14);
    $("#near").innerHTML=near.map(tileHTML).join("");
    $("#nearTitle").textContent=ME?"הכי קרוב אליך":"קרוב לגבעת שמואל";
    $("#locbar").style.display=ME?"none":"";
    const top=food.filter(p=>p.rating!=null&&p.reviews>=150).sort((a,b)=>b.rating-a.rating||b.reviews-a.reviews).slice(0,10);
    $("#top").innerHTML=top.map(tileHTML).join("");
    const fv=all.filter(p=>favs.has(p.id));
    $("#favsec").style.display=fv.length?"":"none";
    $("#favs").innerHTML=fv.map(tileHTML).join("");
  }
  $("#cats").innerHTML=Object.entries(CATS.food).map(([k,v])=>{ const n=food.filter(p=>p.cat===k).length; if(!n) return "";
    return `<a class="cat" href="food.html?cat=${k}"><span class="ic" style="background:${v.color}1f;color:${v.color}">${icon(v.icon)}</span><span>${v.label}<small>${n} מקומות</small></span></a>`; }).join("");
  const sc=$("#shopcats"); if(sc) sc.innerHTML=Object.entries(CATS.shop).map(([k,v])=>{ const n=shops.filter(p=>p.cat===k).length; if(!n||k==="other") return "";
    return `<a class="cat" href="shops.html?cat=${k}"><span class="ic" style="background:${v.color}1f;color:${v.color}">${icon(v.icon)}</span><span>${v.label}<small>${n} חנויות</small></span></a>`; }).join("");
  $("#uselocation").onclick=()=>{ const b=$("#uselocation"); b.disabled=true;
    locate().then(()=>rows2()).catch(e=>toast(e&&e.code===1?"אין הרשאת מיקום. אפשר לאשר אותה בהגדרות האתר.":"לא הצלחתי לאתר את המיקום")).finally(()=>b.disabled=false); };
  // desktop arrows for the horizontal rows
  const navs=[];
  $$(".tiles").forEach(t=>{ const w=document.createElement("div"); w.className="rowwrap"; t.before(w); w.append(t);
    const mk=(cls,lbl,dir)=>{ const b=document.createElement("button"); b.type="button"; b.className="rownav "+cls; b.setAttribute("aria-label",lbl); b.innerHTML=icon("arrow");
      b.onclick=()=>t.scrollBy({left:dir*t.clientWidth*.9,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); w.append(b); return b; };
    const prev=mk("prev","הקודמים",1), next=mk("next","הבאים",-1);
    const upd=()=>{ const max=t.scrollWidth-t.clientWidth, x=Math.abs(t.scrollLeft); prev.hidden=x<4; next.hidden=x>=max-4; };
    t.addEventListener("scroll",upd,{passive:true}); addEventListener("resize",upd); navs.push(upd); });
  const rows2=()=>{ rows(); requestAnimationFrame(()=>navs.forEach(f=>f())); };
  document.addEventListener("favs",rows2);
  rows2();
  if(!ME) locationGranted().then(g=>{ if(g) locate().then(rows2).catch(()=>{}); });
}

window.Lachaver={chrome,explorer,home,icon};
})();
