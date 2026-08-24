const sharp = require("sharp");
const fs = require("fs");
const art = require("./art");

const items = {
  burgerDeluxe: art.burgerDeluxe(),
  burgerPlain: art.burgerPlain(),
  pizza: art.pizza(),
  salad: art.salad(),
  cakeSlice: art.cakeSlice(),
  birthdayCake: art.birthdayCake(),
  coffeeCup: art.coffeeCup(),
  cookingPot: art.cookingPot(),
  stewBowl: art.stewBowl(),
};

fs.mkdirSync("img", { recursive: true });
(async () => {
  for (const [name, svg] of Object.entries(items)) {
    await sharp(Buffer.from(svg)).resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png().toFile(`img/${name}.png`);
    console.log("wrote img/" + name + ".png");
  }
})();
