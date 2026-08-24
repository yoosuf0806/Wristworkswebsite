// Crop real food photos to each slot's aspect ratio, round the corners, export PNG.
const sharp = require("sharp");
const path = require("path");
const OUT = __dirname;

const F = "/tmp/foodrepo/src/img/";
const B = "/tmp/f2/assets/images/products/";
const PZ = "/tmp/pz/src/static/img/HomeBg/1.jpg";

// [outName, src, wpx, hpx, radius, desaturate?, position?]
const slots = [
  // slide 1 hero tiles (portrait)
  ["p1_burger.png",  B+"burger-1.jpg", 560, 600, 26, false, "attention"],
  ["p1_pizza.png",   PZ,              560, 600, 26, false, "centre"],
  ["p1_salad.png",   F+"s2.png",      560, 600, 26, false, "centre"],
  ["p1_dessert.png", F+"i7.png",      560, 600, 26, false, "top"],
  // slide 2 comparison cards (portrait, keep the burger in frame)
  ["p2_plain.png",   B+"burger-3.jpg",640, 700, 30, true,  "top"],
  ["p2_plated.png",  B+"burger-2.jpg",640, 700, 30, false, "top"],
  // slide 3 hero burger (landscape band, top so burger shows)
  ["p3_burger.png",  B+"burger-5.jpg",820, 480, 26, false, "top"],
  // slide 4 memory tiles (portrait)
  ["p4_curry.png",   F+"cu6.png",     640, 720, 26, false, "centre"],
  ["p4_biryani.png", F+"r2.png",      640, 720, 26, false, "centre"],
  ["p4_platter.png", F+"c3.png",      640, 720, 26, false, "centre"],
  ["p4_pizza.png",   PZ,              640, 720, 26, false, "centre"],
  ["p4_butter.png",  F+"cu1.png",     640, 720, 26, false, "centre"],
];

function mask(w,h,r){
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
}

async function run(){
  for(const [name,src,w,h,r,desat,pos] of slots){
    let img = sharp(src).resize(w,h,{fit:"cover",position:pos||"attention"});
    if(desat) img = img.modulate({saturation:0.32, brightness:0.92});
    const buf = await img.png().toBuffer();
    await sharp(buf)
      .composite([{ input: mask(w,h,r), blend:"dest-in" }])
      .png()
      .toFile(path.join(OUT,name));
    console.log("wrote",name);
  }
}
run().catch(e=>{console.error(e);process.exit(1);});
