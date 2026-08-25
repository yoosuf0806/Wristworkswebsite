// Flat-vector food illustrations as SVG strings.
// A cohesive "plate" motif: most foods sit on a soft circular disc.

const C = {
  bunTop: "#E8A34D", bunTopHi: "#F3BE72", bunBot: "#D98C36",
  sesame: "#FBE9C6",
  patty: "#6E3D22", pattyHi: "#8A4E2C", pattyDk: "#502A16",
  cheese: "#F2B01E", cheeseEdge: "#E29A12",
  lettuce: "#7FB85A", lettuceDk: "#5E9A3E",
  tomato: "#D8452F", tomatoDk: "#B5321F",
  onion: "#C98BC0",
  crust: "#E0A559", crustDk: "#C98A3E",
  sauce: "#C6362F", sauceDk: "#A62A24",
  mozz: "#F6E7C6", mozzHi: "#FFF4DD",
  pep: "#B23A2E",
  olive: "#3B3B3B",
  greenBasil: "#4E8B3C",
  plate: "#FFFFFF", plateEdge: "#E7DFD4", plateShadow: "#00000022",
  bowl: "#E9E2D6", bowlDk: "#CFC5B4", bowlLip: "#F5F0E7",
  frostPink: "#F4C6D6", frostWhite: "#FBF3F0", spongeA: "#F0C27B", spongeB: "#E8B15E",
  cherry: "#C6362F",
  cupWhite: "#F7F2EA", cupShad: "#E3DACb", coffee: "#5A3620", coffeeHi: "#734A2E",
  pot: "#3A4A57", potHi: "#4E626F", potDk: "#2A3742", stew: "#C4502A", stewDk: "#A63E1F",
  candle1: "#E86A5C", candle2: "#6FB6D6", candle3: "#F2C14E", flame: "#F6A21E",
  steam: "#FFFFFFAA",
};

// soft circular plate with drop shadow, centered at cx,cy radius r
function plate(cx, cy, r) {
  return `
    <ellipse cx="${cx}" cy="${cy + r * 0.10}" rx="${r * 1.02}" ry="${r * 0.30}" fill="${C.plateShadow}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.plate}" stroke="${C.plateEdge}" stroke-width="${r*0.03}"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.74}" fill="none" stroke="${C.plateEdge}" stroke-width="${r*0.018}"/>
  `;
}

function wrap(inner, w = 600, h = 600) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`;
}

// ---- Deluxe stacked burger ----
function burgerDeluxe() {
  const cx = 300;
  return wrap(`
    ${plate(cx, 340, 235)}
    <!-- bottom bun -->
    <path d="M150 360 q150 60 300 0 l0 8 q-150 46 -300 0 Z" fill="${C.bunBot}"/>
    <path d="M150 358 q150 55 300 0 q-150 40 -300 0 Z" fill="${C.bunTop}"/>
    <!-- patty -->
    <path d="M148 330 q152 46 304 0 q6 26 -12 34 q-140 40 -280 0 q-18 -8 -12 -34 Z" fill="${C.patty}"/>
    <path d="M150 332 q150 40 300 0 q-150 30 -300 0 Z" fill="${C.pattyHi}" opacity="0.5"/>
    <!-- cheese, drippy -->
    <path d="M158 316 q142 40 284 0 l-6 20 q-18 -4 -24 14 l-10 -12 q-16 22 -30 2 q-14 20 -30 0 q-16 20 -32 2 q-14 18 -30 0 q-16 20 -30 -4 q-20 16 -28 -6 Z" fill="${C.cheese}"/>
    <!-- tomato -->
    <path d="M160 300 q140 36 280 0 q4 18 -14 24 q-126 30 -252 0 q-18 -6 -14 -24 Z" fill="${C.tomato}"/>
    <path d="M170 300 q130 30 260 0 q-130 22 -260 0 Z" fill="${C.tomatoDk}" opacity="0.4"/>
    <!-- lettuce ruffle -->
    <path d="M150 290 q12 -22 30 -6 q14 -22 34 -4 q14 -22 32 -4 q16 -22 34 -4 q14 -22 32 -4 q16 -22 34 -2 q16 -20 32 6 q-150 40 -294 26 Z" fill="${C.lettuce}"/>
    <path d="M150 292 q150 34 294 20 q-150 26 -294 -4 Z" fill="${C.lettuceDk}" opacity="0.5"/>
    <!-- top bun -->
    <path d="M150 262 q150 -150 300 0 q-150 66 -300 0 Z" fill="${C.bunTop}"/>
    <path d="M180 210 q120 -70 240 0 q-120 30 -240 0 Z" fill="${C.bunTopHi}" opacity="0.6"/>
    <!-- sesame -->
    ${sesameSeeds()}
  `);
}
function sesameSeeds() {
  const pts = [[240,205],[280,190],[320,192],[360,202],[260,225],[300,215],[340,222],[220,232],[380,232],[300,238]];
  return pts.map(([x,y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="${C.sesame}" transform="rotate(${(x*y)%50-25} ${x} ${y})"/>`).join("");
}

// ---- Plain / dull burger ----
function burgerPlain() {
  const cx = 300;
  return wrap(`
    ${plate(cx, 340, 235)}
    <path d="M175 350 q125 40 250 0 l0 8 q-125 34 -250 0 Z" fill="#C99A66"/>
    <path d="M175 348 q125 40 250 0 q-125 30 -250 0 Z" fill="#D6A972"/>
    <path d="M182 326 q118 34 236 0 q4 20 -10 28 q-108 30 -216 0 q-14 -8 -10 -28 Z" fill="#6E4A31"/>
    <path d="M188 316 q112 28 224 0 l-4 12 q-108 24 -216 0 Z" fill="#D9A93A"/>
    <path d="M178 300 q122 -110 244 0 q-122 52 -244 0 Z" fill="#D6A972"/>
    <path d="M178 300 q122 52 244 0 q4 6 0 10 q-122 50 -244 0 q-4 -4 0 -10 Z" fill="#C99A66" opacity="0.7"/>
  `);
}

// ---- Pizza (top view) ----
function pizza() {
  const cx = 300, cy = 300, r = 235;
  const tops = [];
  const items = [[210,230,'pep'],[360,220,'pep'],[300,300,'pep'],[240,360,'pep'],[380,340,'pep'],[180,320,'olive'],[330,380,'olive'],[410,270,'olive'],[250,190,'basil'],[350,150,'basil'],[420,330,'basil'],[170,250,'basil']];
  for (const [x,y,t] of items) {
    if (t==='pep') tops.push(`<circle cx="${x}" cy="${y}" r="22" fill="${C.pep}"/><circle cx="${x}" cy="${y}" r="22" fill="#00000018"/><circle cx="${x-4}" cy="${y-4}" r="7" fill="#C6503E"/>`);
    if (t==='olive') tops.push(`<circle cx="${x}" cy="${y}" r="12" fill="${C.olive}"/><circle cx="${x}" cy="${y}" r="5" fill="${C.sauce}"/>`);
    if (t==='basil') tops.push(`<path d="M${x} ${y} q14 -10 26 2 q-14 10 -26 -2 Z" fill="${C.greenBasil}"/>`);
  }
  return wrap(`
    <ellipse cx="${cx}" cy="${cy + r*0.12}" rx="${r*1.02}" ry="${r*0.3}" fill="${C.plateShadow}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.crustDk}"/>
    <circle cx="${cx}" cy="${cy}" r="${r-14}" fill="${C.crust}"/>
    <circle cx="${cx}" cy="${cy}" r="${r-40}" fill="${C.sauce}"/>
    <circle cx="${cx}" cy="${cy}" r="${r-44}" fill="${C.mozz}"/>
    <!-- cheese texture blobs -->
    <circle cx="230" cy="270" r="30" fill="${C.mozzHi}" opacity="0.7"/>
    <circle cx="350" cy="300" r="34" fill="${C.mozzHi}" opacity="0.7"/>
    <circle cx="300" cy="230" r="26" fill="${C.mozzHi}" opacity="0.6"/>
    <circle cx="290" cy="360" r="28" fill="${C.mozzHi}" opacity="0.6"/>
    <path d="M120 320 q60 20 90 -10" stroke="${C.sauce}" stroke-width="6" fill="none" opacity="0.35"/>
    ${tops.join("")}
  `);
}

// ---- Salad bowl ----
function salad() {
  const cx = 300;
  return wrap(`
    <ellipse cx="${cx}" cy="440" rx="220" ry="40" fill="${C.plateShadow}"/>
    <path d="M110 330 a190 90 0 0 0 380 0 l-14 78 a176 60 0 0 1 -352 0 Z" fill="${C.bowl}"/>
    <path d="M110 330 a190 74 0 0 0 380 0 a190 74 0 0 0 -380 0 Z" fill="${C.bowlLip}"/>
    <ellipse cx="${cx}" cy="330" rx="176" ry="66" fill="#EDE6D8"/>
    <!-- greens -->
    ${leaf(210,300,-20)}${leaf(300,285,10)}${leaf(390,305,25)}${leaf(250,320,-40)}${leaf(350,325,40)}${leaf(300,330,0)}${leaf(180,330,-10)}${leaf(420,330,15)}
    <!-- tomatoes -->
    <circle cx="240" cy="330" r="20" fill="${C.tomato}"/><circle cx="234" cy="324" r="6" fill="#F08A6E"/>
    <circle cx="360" cy="320" r="18" fill="${C.tomato}"/><circle cx="354" cy="314" r="5" fill="#F08A6E"/>
    <!-- croutons -->
    <rect x="290" y="330" width="26" height="22" rx="4" fill="#E0B570" transform="rotate(12 303 341)"/>
    <rect x="200" y="345" width="24" height="20" rx="4" fill="#E0B570" transform="rotate(-16 212 355)"/>
    <!-- cucumber -->
    <circle cx="330" cy="350" r="15" fill="#9FCF6B"/><circle cx="330" cy="350" r="8" fill="#C7E6A0"/>
    <circle cx="270" cy="355" r="14" fill="#9FCF6B"/><circle cx="270" cy="355" r="7" fill="#C7E6A0"/>
  `);
}
function leaf(x,y,rot){return `<path d="M${x} ${y} q-38 -30 -70 -6 q26 40 70 20 q44 20 70 -20 q-32 -24 -70 6 Z" fill="${C.lettuce}" transform="rotate(${rot} ${x} ${y})"/><path d="M${x} ${y} q-30 -18 -56 -4" stroke="${C.lettuceDk}" stroke-width="4" fill="none" transform="rotate(${rot} ${x} ${y})"/>`;}

// ---- Cake slice ----
function cakeSlice() {
  const cx = 300;
  return wrap(`
    ${plate(cx, 360, 230)}
    <!-- slice body triangle -->
    <path d="M300 170 L470 380 L200 400 Z" fill="${C.spongeA}"/>
    <!-- layers -->
    <path d="M300 170 L470 380 L455 392 L286 186 Z" fill="${C.frostWhite}"/>
    <path d="M286 210 L452 400 L438 410 L272 230 Z" fill="${C.frostPink}"/>
    <path d="M272 252 L438 418 L200 400 L204 372 Z" fill="${C.spongeB}"/>
    <!-- front face -->
    <path d="M300 170 L200 400 L470 380 Z" fill="none"/>
    <!-- frosting top -->
    <path d="M300 168 q-8 -26 20 -10 q14 -22 34 -2 q18 -14 26 8 q22 -6 12 20 Z" fill="${C.frostWhite}"/>
    <!-- cherry -->
    <circle cx="316" cy="150" r="20" fill="${C.cherry}"/>
    <circle cx="309" cy="143" r="6" fill="#F0897A"/>
    <path d="M316 130 q6 -22 24 -26" stroke="#6E9A3A" stroke-width="5" fill="none"/>
  `);
}

// ---- Whole birthday cake with candles ----
function birthdayCake() {
  const cx = 300;
  return wrap(`
    ${plate(cx, 400, 235)}
    <!-- cake body -->
    <rect x="150" y="270" width="300" height="120" rx="10" fill="${C.frostWhite}"/>
    <ellipse cx="${cx}" cy="270" rx="150" ry="34" fill="#FFFFFF"/>
    <ellipse cx="${cx}" cy="390" rx="150" ry="30" fill="#EFE6DF"/>
    <!-- drip icing -->
    <path d="M150 288 q20 26 40 0 q20 30 40 2 q22 30 40 0 q20 30 40 0 q22 30 40 2 q20 26 40 -2 l0 -18 q-150 30 -300 0 Z" fill="${C.frostPink}"/>
    <!-- sprinkles -->
    ${[[190,330,'#E86A5C'],[240,350,'#6FB6D6'],[290,335,'#F2C14E'],[340,352,'#7FB85A'],[390,332,'#C98BC0'],[210,368,'#F2C14E'],[300,368,'#E86A5C'],[360,368,'#6FB6D6']].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="16" height="6" rx="3" fill="${c}" transform="rotate(${(x+y)%80-40} ${x} ${y})"/>`).join("")}
    <!-- candles -->
    ${candle(230,215,C.candle1)}${candle(300,205,C.candle2)}${candle(370,215,C.candle3)}
  `);
}
function candle(x,y,c){return `<rect x="${x-8}" y="${y}" width="16" height="60" rx="3" fill="${c}"/><rect x="${x-8}" y="${y+18}" width="16" height="8" fill="#ffffff" opacity="0.5"/><path d="M${x} ${y-24} q10 12 0 22 q-10 -10 0 -22 Z" fill="${C.flame}"/><path d="M${x} ${y-16} q5 6 0 12 q-5 -6 0 -12 Z" fill="#FDE68A"/>`;}

// ---- Coffee cup ----
function coffeeCup() {
  const cx = 290;
  return wrap(`
    <ellipse cx="${cx}" cy="470" rx="180" ry="34" fill="${C.plateShadow}"/>
    <!-- saucer -->
    <ellipse cx="${cx}" cy="440" rx="200" ry="46" fill="${C.cupShad}"/>
    <ellipse cx="${cx}" cy="432" rx="200" ry="42" fill="${C.cupWhite}"/>
    <ellipse cx="${cx}" cy="430" rx="120" ry="24" fill="${C.cupShad}"/>
    <!-- cup body -->
    <path d="M180 300 a110 40 0 0 0 220 0 l-16 118 a94 34 0 0 1 -188 0 Z" fill="${C.cupWhite}"/>
    <path d="M180 300 a110 40 0 0 0 220 0 a110 40 0 0 0 -220 0 Z" fill="#FFFFFF"/>
    <ellipse cx="${cx}" cy="300" rx="96" ry="34" fill="${C.coffee}"/>
    <ellipse cx="${cx}" cy="298" rx="70" ry="22" fill="${C.coffeeHi}"/>
    <!-- handle -->
    <path d="M405 320 q70 -6 60 60 q-8 44 -56 44 l0 -26 q28 0 32 -22 q4 -30 -36 -28 Z" fill="#FFFFFF" stroke="${C.cupShad}" stroke-width="3"/>
    <!-- steam -->
    <path d="M260 260 q-20 -30 6 -56 q22 -22 4 -50" stroke="${C.steam}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M320 260 q-20 -30 6 -56 q22 -22 4 -50" stroke="${C.steam}" stroke-width="9" fill="none" stroke-linecap="round"/>
  `);
}

// ---- Cooking pot (home cooking) ----
function cookingPot() {
  const cx = 300;
  return wrap(`
    <ellipse cx="${cx}" cy="450" rx="210" ry="38" fill="${C.plateShadow}"/>
    <!-- steam -->
    <path d="M250 210 q-18 -30 4 -54 q20 -22 2 -48" stroke="${C.steam}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M300 200 q-18 -32 4 -58 q20 -24 2 -50" stroke="${C.steam}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M350 210 q-18 -30 4 -54 q20 -22 2 -48" stroke="${C.steam}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <!-- pot body -->
    <path d="M140 300 l20 130 a140 34 0 0 0 280 0 l20 -130 Z" fill="${C.pot}"/>
    <path d="M150 320 a150 40 0 0 0 300 0 l-6 30 a144 34 0 0 1 -288 0 Z" fill="${C.potHi}" opacity="0.5"/>
    <ellipse cx="${cx}" cy="300" rx="160" ry="40" fill="${C.potDk}"/>
    <ellipse cx="${cx}" cy="296" rx="150" ry="34" fill="${C.stew}"/>
    <ellipse cx="${cx}" cy="294" rx="120" ry="26" fill="${C.stewDk}" opacity="0.5"/>
    <circle cx="250" cy="290" r="12" fill="#E88A3A"/><circle cx="330" cy="300" r="10" fill="#7FB85A"/><circle cx="300" cy="286" r="9" fill="#E0B570"/>
    <!-- handles -->
    <path d="M138 330 q-40 4 -40 40 q0 26 34 28 l0 -20 q-16 0 -16 -14 q0 -14 24 -16 Z" fill="${C.potDk}"/>
    <path d="M462 330 q40 4 40 40 q0 26 -34 28 l0 -20 q16 0 16 -14 q0 -14 -24 -16 Z" fill="${C.potDk}"/>
  `);
}

// ---- Family meal: bowl of stew ----
function stewBowl() {
  const cx = 300;
  return wrap(`
    ${plate(cx, 360, 232)}
    <path d="M130 320 a170 70 0 0 0 340 0 l-16 60 a154 46 0 0 1 -308 0 Z" fill="${C.bowl}"/>
    <ellipse cx="${cx}" cy="320" rx="170" ry="64" fill="${C.bowlLip}"/>
    <ellipse cx="${cx}" cy="322" rx="150" ry="54" fill="${C.stew}"/>
    <ellipse cx="${cx}" cy="318" rx="150" ry="52" fill="${C.stewDk}" opacity="0.35"/>
    <circle cx="240" cy="310" r="18" fill="#E88A3A"/><circle cx="330" cy="322" r="16" fill="#7FB85A"/>
    <circle cx="300" cy="300" r="14" fill="#E0B570"/><circle cx="360" cy="300" r="13" fill="#C4502A"/>
    <circle cx="260" cy="342" r="14" fill="#E0B570"/><circle cx="300" cy="345" r="12" fill="#7FB85A"/>
    <path d="M270 270 q-14 -24 2 -44" stroke="${C.steam}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M330 270 q-14 -24 2 -44" stroke="${C.steam}" stroke-width="8" fill="none" stroke-linecap="round"/>
  `);
}

module.exports = { burgerDeluxe, burgerPlain, pizza, salad, cakeSlice, birthdayCake, coffeeCup, cookingPot, stewBowl, C };
