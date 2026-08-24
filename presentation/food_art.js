// Hand-built, appetizing food illustrations -> high-res PNG (transparent bg)
const sharp = require("sharp");

const S = 480; // canvas
const wrap = (inner, w=S, h=S) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

const softShadow = (cx=240, cy=430, rx=150, ry=26, op=0.28) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#3a1c0e" opacity="${op}"/>`;

const defs = `
<defs>
  <radialGradient id="bunTop" cx="42%" cy="30%" r="75%">
    <stop offset="0%" stop-color="#f6c877"/><stop offset="55%" stop-color="#e39a45"/><stop offset="100%" stop-color="#c1742b"/>
  </radialGradient>
  <linearGradient id="bunBot" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#e3a24f"/><stop offset="100%" stop-color="#b56a24"/>
  </linearGradient>
  <linearGradient id="patty" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#6b3a1e"/><stop offset="100%" stop-color="#3f2110"/>
  </linearGradient>
  <linearGradient id="cheese" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffd24a"/><stop offset="100%" stop-color="#f2a02a"/>
  </linearGradient>
  <radialGradient id="tomato" cx="40%" cy="35%" r="70%">
    <stop offset="0%" stop-color="#ff6b57"/><stop offset="100%" stop-color="#d3372b"/>
  </radialGradient>
  <linearGradient id="lettuce" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#9ccc5a"/><stop offset="100%" stop-color="#6ea23a"/>
  </linearGradient>
  <radialGradient id="pizzaDough" cx="50%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#f2c879"/><stop offset="100%" stop-color="#d99a3e"/>
  </radialGradient>
  <radialGradient id="cheeseMelt" cx="50%" cy="45%" r="60%">
    <stop offset="0%" stop-color="#ffe08a"/><stop offset="100%" stop-color="#f4b23c"/>
  </radialGradient>
  <linearGradient id="bowl" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e7ebe9"/>
  </linearGradient>
  <linearGradient id="frosting" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffe2ec"/><stop offset="100%" stop-color="#f4a9c4"/>
  </linearGradient>
  <linearGradient id="sponge" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f6d9a8"/><stop offset="100%" stop-color="#dcae6b"/>
  </linearGradient>
  <linearGradient id="cocoa" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#6a3d22"/><stop offset="100%" stop-color="#43230f"/>
  </linearGradient>
  <radialGradient id="cup" cx="40%" cy="35%" r="75%">
    <stop offset="0%" stop-color="#fff6ee"/><stop offset="100%" stop-color="#e8d6c4"/>
  </radialGradient>
  <linearGradient id="coffee" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#8a5127"/><stop offset="100%" stop-color="#5c3216"/>
  </linearGradient>
  <linearGradient id="pot" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#c9453d"/><stop offset="100%" stop-color="#96271f"/>
  </linearGradient>
</defs>`;

const seeds = (pts) => pts.map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*0.6}" fill="#fff2d0"/>`).join("");

// ---------- BURGER ----------
function burger(vibrant=true){
  const sat = vibrant ? 1 : 0.0;
  const grey = vibrant ? "" : `<rect x="0" y="0" width="${S}" height="${S}" fill="#000000" opacity="0"/>`;
  const inner = `
  ${defs}
  ${softShadow()}
  <!-- bottom bun -->
  <path d="M120 300 h240 a30 30 0 0 1 -8 34 q-112 34 -224 0 a30 30 0 0 1 -8 -34 z" fill="url(#bunBot)"/>
  <!-- lettuce -->
  <path d="M108 300 q20 -26 44 -6 q22 -24 46 -4 q22 -24 46 -4 q22 -24 46 -4 q22 -22 44 2 q10 14 -6 22 q-130 30 -258 0 q-16 -8 -8 -22z" fill="url(#lettuce)"/>
  <!-- tomato -->
  <ellipse cx="240" cy="286" rx="140" ry="20" fill="url(#tomato)"/>
  <ellipse cx="240" cy="282" rx="132" ry="15" fill="#ff8a72" opacity="0.5"/>
  <!-- cheese drips -->
  <path d="M118 250 h244 v18 l-24 26 -22 -22 -26 26 -24 -26 -24 24 -24 -24 -26 24 -22 -24 -8 8 z" fill="url(#cheese)"/>
  <!-- patty -->
  <rect x="112" y="216" width="256" height="42" rx="21" fill="url(#patty)"/>
  <ellipse cx="112" cy="237" rx="10" ry="21" fill="#2f180b"/>
  <!-- top bun -->
  <path d="M110 216 q10 -120 130 -120 q120 0 130 120 z" fill="url(#bunTop)"/>
  <ellipse cx="196" cy="150" rx="46" ry="26" fill="#ffe0a0" opacity="0.45"/>
  ${seeds([[210,150,7],[248,132,7],[286,152,6],[176,176,6],[250,176,6],[300,178,6],[224,196,6],[276,150,5]])}
  ${grey}
  `;
  return wrap(inner);
}

// ---------- PIZZA ----------
function pizza(){
  const pep = [[168,196],[250,168],[300,232],[214,258],[286,300],[176,286],[236,224]];
  const inner = `
  ${defs}
  ${softShadow(240,438,140,24,0.26)}
  <circle cx="240" cy="240" r="176" fill="url(#pizzaDough)"/>
  <circle cx="240" cy="240" r="150" fill="url(#cheeseMelt)"/>
  <circle cx="240" cy="240" r="150" fill="#fff3c4" opacity="0.25"/>
  ${pep.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="20" fill="#c33a2f"/><circle cx="${x}" cy="${y}" r="20" fill="#8f1f18" opacity="0.25"/><circle cx="${x-5}" cy="${y-5}" r="6" fill="#e46a5c" opacity="0.6"/>`).join("")}
  <!-- basil -->
  ${[[200,300],[300,190],[248,290]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="12" ry="7" fill="#4f8f36" transform="rotate(30 ${x} ${y})"/>`).join("")}
  <!-- crust highlight -->
  <circle cx="240" cy="240" r="176" fill="none" stroke="#f4d79a" stroke-width="6" opacity="0.5"/>
  `;
  return wrap(inner);
}

// ---------- SALAD ----------
function salad(){
  const greens = [];
  for(let i=0;i<26;i++){const a=Math.random()*6.28;const rr=40+Math.random()*80;const x=240+Math.cos(a)*rr;const y=250+Math.sin(a)*rr*0.62;greens.push(`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(20+Math.random()*14).toFixed(0)}" ry="${(12+Math.random()*8).toFixed(0)}" fill="${['#7fb84a','#6aa83c','#8ecb57','#5c9a34'][i%4]}" transform="rotate(${(Math.random()*90-45).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`);}
  const toms = [[190,238],[300,250],[248,220],[210,286],[298,300]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="16" fill="url(#tomato)"/><ellipse cx="${x-4}" cy="${y-5}" rx="5" ry="3" fill="#ffb0a0" opacity="0.7"/>`).join("");
  const inner = `
  ${defs}
  ${softShadow(240,436,150,24,0.24)}
  <ellipse cx="240" cy="300" rx="180" ry="86" fill="url(#bowl)"/>
  <ellipse cx="240" cy="288" rx="176" ry="80" fill="#f2f5f2"/>
  <ellipse cx="240" cy="284" rx="160" ry="70" fill="#eef2ee"/>
  ${greens.join("")}
  ${toms}
  <!-- cucumber -->
  ${[[230,300],[276,232],[196,262]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" fill="#bfe08a"/><circle cx="${x}" cy="${y}" r="7" fill="#dff0b8"/>`).join("")}
  `;
  return wrap(inner);
}

// ---------- CAKE SLICE (dessert) ----------
function cake(){
  // side-view wedge: tall left face, tip to the right
  const inner = `
  ${defs}
  ${softShadow(250,428,140,22,0.26)}
  <clipPath id="slice"><path d="M148 176 L148 350 L360 274 Z"/></clipPath>
  <!-- body -->
  <path d="M148 176 L148 350 L360 274 Z" fill="url(#sponge)"/>
  <g clip-path="url(#slice)">
    <!-- cream layers -->
    <rect x="130" y="228" width="260" height="20" fill="#fff4e6"/>
    <rect x="130" y="286" width="260" height="20" fill="#fff4e6"/>
    <!-- jam layer -->
    <rect x="130" y="206" width="260" height="10" fill="#d3556a" opacity="0.85"/>
  </g>
  <!-- frosting cap along the top edge -->
  <path d="M148 176 L360 274 L354 292 q-108 -60 -212 -92 z" fill="url(#frosting)"/>
  <path d="M150 178 q60 -26 120 6 q-56 8 -120 -6z" fill="#fff0f5" opacity="0.6"/>
  <!-- outline -->
  <path d="M148 176 L148 350 L360 274 Z" fill="none" stroke="#c79a5a" stroke-width="4" opacity="0.5"/>
  <!-- cherry on the thick end -->
  <circle cx="176" cy="158" r="18" fill="#d3273b"/><circle cx="169" cy="151" r="5" fill="#ff8a97" opacity="0.85"/>
  <path d="M176 140 q14 -16 30 -14" fill="none" stroke="#6a8f3a" stroke-width="5" stroke-linecap="round"/>
  `;
  return wrap(inner);
}

// ---------- COOKIE ----------
function cookie(){
  const chips=[[210,210],[280,220],[240,260],[300,270],[196,262],[258,300],[300,320]];
  const inner=`${defs}${softShadow(240,430,120,20,0.24)}
  <circle cx="245" cy="255" r="150" fill="#d79a54"/>
  <circle cx="245" cy="250" r="150" fill="#e0a862"/>
  <circle cx="245" cy="250" r="150" fill="#f0c07a" opacity="0.35"/>
  ${chips.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="16" fill="url(#cocoa)"/><circle cx="${x-4}" cy="${y-4}" r="4" fill="#8a5a34" opacity="0.7"/>`).join("")}`;
  return wrap(inner);
}

// ---------- BIRTHDAY CAKE ----------
function bday(){
  const inner=`${defs}${softShadow(240,440,150,24,0.26)}
  <rect x="120" y="250" width="240" height="150" rx="16" fill="url(#frosting)"/>
  <rect x="120" y="250" width="240" height="34" fill="#fff4e6"/>
  <path d="M120 284 q30 20 60 0 q30 20 60 0 q30 20 60 0 q30 20 60 0 v10 h-240z" fill="#ffd0e0"/>
  <!-- candles -->
  ${[170,240,310].map(x=>`<rect x="${x-6}" y="196" width="12" height="58" rx="4" fill="#ff9db1"/><rect x="${x-6}" y="196" width="6" height="58" fill="#ffc2d0"/><ellipse cx="${x}" cy="186" rx="8" ry="14" fill="#ffb03a"/><ellipse cx="${x}" cy="190" rx="4" ry="8" fill="#ffe08a"/>`).join("")}
  <!-- sprinkles -->
  ${[[160,320],[210,350],[300,330],[260,300],[330,360],[180,370]].map(([x,y],i)=>`<rect x="${x}" y="${y}" width="16" height="6" rx="3" fill="${['#7cc6e8','#ffd24a','#7fd08a','#ff8aa0'][i%4]}" transform="rotate(${i*35} ${x} ${y})"/>`).join("")}`;
  return wrap(inner);
}

// ---------- POT (home cooking) ----------
function pot(){
  const inner=`${defs}${softShadow(240,440,150,24,0.26)}
  <!-- steam -->
  ${[190,240,290].map(x=>`<path d="M${x} 150 q16 -18 0 -36 q-16 -18 0 -36" fill="none" stroke="#e9d9c8" stroke-width="9" stroke-linecap="round" opacity="0.7"/>`).join("")}
  <rect x="118" y="238" width="244" height="120" rx="26" fill="url(#pot)"/>
  <rect x="104" y="224" width="272" height="34" rx="17" fill="#7f1f18"/>
  <rect x="200" y="196" width="80" height="26" rx="13" fill="#5c1712"/>
  <ellipse cx="240" cy="240" rx="126" ry="18" fill="#3f6b3a"/>
  <ellipse cx="240" cy="236" rx="120" ry="14" fill="#4f8340"/>
  <!-- handles -->
  <rect x="86" y="270" width="26" height="20" rx="10" fill="#7f1f18"/>
  <rect x="368" y="270" width="26" height="20" rx="10" fill="#7f1f18"/>
  <rect x="140" y="300" width="200" height="14" rx="7" fill="#ffffff" opacity="0.12"/>`;
  return wrap(inner);
}

// ---------- COFFEE CUP ----------
function coffee(){
  const inner=`${defs}${softShadow(240,438,120,20,0.24)}
  ${[210,258].map(x=>`<path d="M${x} 150 q16 -18 0 -36 q-16 -18 0 -36" fill="none" stroke="#e9d9c8" stroke-width="9" stroke-linecap="round" opacity="0.7"/>`).join("")}
  <path d="M150 200 h180 v70 a90 90 0 0 1 -180 0 z" fill="url(#cup)"/>
  <ellipse cx="240" cy="200" rx="90" ry="24" fill="#efe0d0"/>
  <ellipse cx="240" cy="200" rx="74" ry="17" fill="url(#coffee)"/>
  <ellipse cx="240" cy="198" rx="60" ry="12" fill="#a9713f" opacity="0.5"/>
  <path d="M330 214 a44 44 0 0 1 0 74" fill="none" stroke="#e2d1bf" stroke-width="20" stroke-linecap="round"/>
  <ellipse cx="240" cy="352" rx="112" ry="20" fill="#e7d6c4"/>`;
  return wrap(inner);
}

// ---------- FAMILY PLATE (shared meal) ----------
function family(){
  const inner=`${defs}${softShadow(240,436,150,24,0.24)}
  <circle cx="240" cy="256" r="150" fill="url(#bowl)"/>
  <circle cx="240" cy="256" r="150" fill="#f2f5f4"/>
  <circle cx="240" cy="256" r="120" fill="#ffffff"/>
  <circle cx="240" cy="256" r="118" fill="#f6f2ec"/>
  <!-- rice mound -->
  <ellipse cx="240" cy="262" rx="86" ry="60" fill="#fbf6ec"/>
  <ellipse cx="240" cy="250" rx="70" ry="44" fill="#fffdf6"/>
  <!-- garnish -->
  ${[[210,240],[276,248],[240,290],[262,222],[214,286]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="16" ry="10" fill="${['#c9453d','#e0902f','#6ea23a','#c9453d','#e0b02f'][i]}" transform="rotate(${i*40} ${x} ${y})"/>`).join("")}
  <!-- fork & knife -->
  <rect x="70" y="180" width="9" height="150" rx="4" fill="#c9a24a"/>
  <rect x="401" y="180" width="9" height="150" rx="4" fill="#c9a24a"/>`;
  return wrap(inner);
}

// ---------- LINE ICONS (for flow) ----------
function icon(kind, stroke="2B1B14"){
  stroke = "#" + String(stroke).replace(/^#/, "");
  const S2=240; const c=`stroke="${stroke}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  let body="";
  if(kind==="eye") body=`<path d="M30 120 q90 -80 180 0 q-90 80 -180 0z" ${c}/><circle cx="120" cy="120" r="34" ${c}/><circle cx="120" cy="120" r="10" fill="${stroke}"/>`;
  if(kind==="brain") body=`<path d="M120 44 q-60 -18 -70 44 q-40 14 -20 60 q-14 44 40 46 q10 30 50 24 v-218z" ${c}/><path d="M120 44 q60 -18 70 44 q40 14 20 60 q14 44 -40 46 q-10 30 -50 24" ${c}/>`;
  if(kind==="menu") body=`<rect x="58" y="40" width="124" height="160" rx="12" ${c}/><path d="M84 82 h72 M84 112 h72 M84 142 h48" ${c}/>`;
  if(kind==="heart") body=`<path d="M120 196 C40 140 40 70 92 62 q28 -4 28 30 q0 -34 28 -30 c52 8 52 78 -28 134z" ${c}/>`;
  if(kind==="fork") body=`<path d="M84 40 v70 q0 20 -20 20 q-20 0 -20 -20 v-70 M64 40 v90 M64 130 v70 M156 40 q30 0 30 50 q0 40 -22 44 v66" ${c}/>`;
  return wrap(`${body}`, S2, S2);
}

const jobs = [
  ["art_burger.png", burger(true)],
  ["art_burger_plain.png", burger(false)],
  ["art_pizza.png", pizza()],
  ["art_salad.png", salad()],
  ["art_cake.png", cake()],
  ["art_cookie.png", cookie()],
  ["art_bday.png", bday()],
  ["art_pot.png", pot()],
  ["art_coffee.png", coffee()],
  ["art_family.png", family()],
  ["icon_eye.png", icon("eye","2B1B14")],
  ["icon_brain.png", icon("brain","2B1B14")],
  ["icon_menu.png", icon("menu","2B1B14")],
  ["icon_heart.png", icon("heart","2B1B14")],
  ["icon_fork.png", icon("fork","2B1B14")],
  // light versions for dark backgrounds
  ["icon_eye_l.png", icon("eye","FDF6EC")],
  ["icon_brain_l.png", icon("brain","FDF6EC")],
  ["icon_menu_l.png", icon("menu","FDF6EC")],
  ["icon_heart_l.png", icon("heart","FDF6EC")],
  ["icon_fork_l.png", icon("fork","FDF6EC")],
];

Promise.all(jobs.map(([f,svg])=>{
  let img = sharp(Buffer.from(svg)).resize(720,720,{fit:"inside"});
  if (f === "art_burger_plain.png") img = img.modulate({ saturation: 0.28, brightness: 0.9 });
  return img.png().toFile(__dirname+"/"+f);
})).then(()=>console.log("art done:",jobs.length)).catch(e=>{console.error(e);process.exit(1);});
