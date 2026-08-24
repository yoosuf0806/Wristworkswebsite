const sharp = require('sharp');
const W = 2560, H = 1440;

function svg(inner){ return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${inner}</svg>`); }

// 1. Dark espresso with warm glow (hook + conclusion)
const dark = svg(`
  <defs>
    <radialGradient id="g" cx="30%" cy="28%" r="95%">
      <stop offset="0%" stop-color="#4a2c1c"/>
      <stop offset="42%" stop-color="#33200f"/>
      <stop offset="100%" stop-color="#1c1109"/>
    </radialGradient>
    <radialGradient id="glow" cx="82%" cy="82%" r="55%">
      <stop offset="0%" stop-color="#e8722c" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#e8722c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
`);

// 2. Soft cream (content slides)
const cream = svg(`
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdf6ec"/>
      <stop offset="100%" stop-color="#f6e7d3"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="#f0a868" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#f0a868" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
`);

// 3. Warm sunset (memories slide)
const sunset = svg(`
  <defs>
    <radialGradient id="g" cx="28%" cy="24%" r="110%">
      <stop offset="0%" stop-color="#f2a65a"/>
      <stop offset="38%" stop-color="#d9622f"/>
      <stop offset="72%" stop-color="#7a2f1c"/>
      <stop offset="100%" stop-color="#3d1810"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
`);

Promise.all([
  sharp(dark).png().toFile('bg_dark.png'),
  sharp(cream).png().toFile('bg_cream.png'),
  sharp(sunset).png().toFile('bg_sunset.png'),
]).then(()=>console.log('backgrounds done')).catch(e=>{console.error(e);process.exit(1)});
