const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

// ---- palette ----
const BG = "201A17", PANEL = "2C2420", PANEL2 = "372D28";
const ORANGE = "F2820C", ORANGESOFT = "F6A945", GOLD = "E0A82E";
const CREAM = "F7F0E7", MUTED = "B7A797", DIM = "8B7C6E";
const GREEN = "8CC152", RED = "D8452F";
const F = "Calibri";
const IMG = (n) => `img/${n}.png`;

function bg(s, color = BG) { s.background = { color }; }
function kicker(s, txt, x, y, color = ORANGE) {
  s.addText(txt.toUpperCase(), { x, y, w: 8, h: 0.35, fontFace: F, fontSize: 13, bold: true, color, charSpacing: 3, align: "left" });
}
function disc(s, name, x, y, d, label) {
  s.addImage({ path: IMG(name), x, y, w: d, h: d, shadow: { type: "outer", color: "000000", opacity: 0.45, blur: 12, offset: 5, angle: 90 } });
  if (label) s.addText(label.toUpperCase(), { x: x - 0.3, y: y + d - 0.05, w: d + 0.6, h: 0.35, align: "center", fontFace: F, fontSize: 14, bold: true, color: CREAM, charSpacing: 2 });
}
function pill(s, txt, x, y, w, h, fill, tcolor, fs) {
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: h / 2, fill: { color: fill } });
  s.addText(txt, { x, y, w, h, align: "center", valign: "middle", fontFace: F, fontSize: fs, bold: true, color: tcolor });
}

// =================================================================== SLIDE 1
let s = p.addSlide(); bg(s);
// faint corner discs for atmosphere
s.addShape(p.ShapeType.ellipse, { x: -1.6, y: -1.6, w: 3.6, h: 3.6, fill: { color: PANEL } });
s.addShape(p.ShapeType.ellipse, { x: 11.4, y: 5.6, w: 3.6, h: 3.6, fill: { color: PANEL } });
kicker(s, "The Psychology of Food", 0.7, 0.55);
s.addText([
  { text: "What Would You ", options: { color: CREAM } },
  { text: "Choose?", options: { color: ORANGE } },
], { x: 0.6, y: 0.95, w: 12.1, h: 1.1, align: "center", fontFace: F, fontSize: 54, bold: true });

const d1 = 2.55, y1 = 2.55;
const xs = [0.85, 4.0, 7.15, 10.3];
disc(s, "burgerDeluxe", xs[0], y1, d1, "Burger");
disc(s, "pizza", xs[1], y1, d1, "Pizza");
disc(s, "salad", xs[2], y1, d1, "Salad");
disc(s, "cakeSlice", xs[3], y1, d1, "Cake");

pill(s, "You have 5 seconds.  Choose one.", 3.66, 5.9, 6.0, 0.7, ORANGE, "201A17", 20);
s.addText([
  { text: "Presented by  ", options: { color: DIM } },
  { text: "Nooha Iflal", options: { color: CREAM, bold: true } },
], { x: 0.7, y: 6.85, w: 12, h: 0.4, align: "center", fontFace: F, fontSize: 14 });
s.addNotes("Good morning everyone. I'm Nooha Iflal, and today I'm going to talk about something we all do every single day — choose food.\n\nLet's start with a quick question. You have five seconds. Which one would you choose? (Pause — let people raise hands.)\n\nInteresting. But here's the question: Did you choose it because you were hungry, because you actually like it, or because of something else?\n\nToday, we're going to look at the psychology behind our food choices — and why sometimes our brain makes the decision before we even realise it. 🧠🍔");

// =================================================================== SLIDE 2
s = p.addSlide(); bg(s, "F7F0E7"); // light content slide
kicker(s, "01 · Visual Psychology", 0.7, 0.55, ORANGE);
s.addText([
  { text: "Your Eyes ", options: { color: "2C2420" } },
  { text: "Choose First", options: { color: ORANGE } },
], { x: 0.65, y: 0.9, w: 12, h: 0.9, fontFace: F, fontSize: 40, bold: true, align: "left" });

// two comparison cards
function compCard(x, letter, name, cap, badge) {
  const w = 5.75, y = 2.15, h = 3.55;
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.18, fill: { color: "FFFFFF" }, line: { color: "E6DBCB", width: 1 }, shadow: { type: "outer", color: "9A8B79", opacity: 0.35, blur: 10, offset: 4, angle: 90 } });
  s.addShape(p.ShapeType.ellipse, { x: x + 0.25, y: y + 0.25, w: 0.7, h: 0.7, fill: { color: badge } });
  s.addText(letter, { x: x + 0.25, y: y + 0.25, w: 0.7, h: 0.7, align: "center", valign: "middle", fontFace: F, fontSize: 26, bold: true, color: "FFFFFF" });
  s.addImage({ path: IMG(name), x: x + w / 2 - 1.55, y: y + 0.35, w: 3.1, h: 3.1 });
  s.addText(cap, { x: x + 0.2, y: y + h - 0.72, w: w - 0.4, h: 0.55, align: "center", fontFace: F, fontSize: 15, italic: true, color: "6B5D4F" });
}
compCard(0.7, "A", "burgerPlain", "Same burger. A quick, plain snapshot.", DIM);
compCard(6.88, "B", "burgerDeluxe", "Same burger. Styled, stacked, lit.", ORANGE);

s.addText("Which one looks tastier?", { x: 0.7, y: 5.9, w: 12, h: 0.5, align: "center", fontFace: F, fontSize: 24, bold: true, color: "2C2420" });
// flow SEE -> EXPECT -> CHOOSE
const flow = [["See", GREEN], ["Expect", ORANGE], ["Choose", RED]];
let fx = 3.2;
flow.forEach(([t, c], i) => {
  s.addShape(p.ShapeType.roundRect, { x: fx, y: 6.55, w: 1.85, h: 0.6, rectRadius: 0.3, fill: { color: c } });
  s.addText(t.toUpperCase(), { x: fx, y: 6.55, w: 1.85, h: 0.6, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", charSpacing: 2 });
  if (i < 2) s.addText("→", { x: fx + 1.85, y: 6.55, w: 0.55, h: 0.6, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: "2C2420" });
  fx += 2.4;
});
s.addNotes("Most of us haven't tasted either one. But we're already making a decision.\n\nOur eyes are often the first thing involved in our food experience. Colour, shape, arrangement and presentation can create expectations about what something will taste like.\n\nThink about scrolling through Instagram or TikTok and suddenly seeing a really good-looking pizza. You might not have been hungry five seconds ago, but suddenly you're thinking about pizza. And somehow, the pizza always appears when you're trying to save money. 😂\n\nSee 👀 → Expect 🧠 → Choose 🍴");

// =================================================================== SLIDE 3
s = p.addSlide(); bg(s);
s.addShape(p.ShapeType.ellipse, { x: -1.8, y: 5.4, w: 3.8, h: 3.8, fill: { color: PANEL } });
kicker(s, "02 · The Words On The Page", 0.7, 0.55);
s.addText([
  { text: "The Menu Is ", options: { color: CREAM } },
  { text: "Playing Tricks", options: { color: ORANGE } },
  { text: " On You", options: { color: CREAM } },
], { x: 0.65, y: 0.9, w: 12.1, h: 0.9, fontFace: F, fontSize: 38, bold: true, align: "left" });

// left insight column
s.addText("Same food. Different words.", { x: 0.7, y: 2.35, w: 5.4, h: 0.5, fontFace: F, fontSize: 22, bold: true, color: GOLD });
s.addText("Restaurants carefully choose how food is described, where it sits on the page, and how the price is shown. Those choices quietly steer what catches your eye — and what you order.", { x: 0.7, y: 2.95, w: 5.4, h: 1.6, fontFace: F, fontSize: 16, color: MUTED, lineSpacingMultiple: 1.15 });
s.addShape(p.ShapeType.roundRect, { x: 0.7, y: 4.75, w: 5.4, h: 1.55, rectRadius: 0.14, fill: { color: PANEL } });
s.addText("We don't just read menus.", { x: 0.95, y: 4.95, w: 5.0, h: 0.5, fontFace: F, fontSize: 20, bold: true, color: CREAM });
s.addText([{ text: "We ", options: { color: CREAM } }, { text: "react", options: { color: ORANGE } }, { text: " to them.", options: { color: CREAM } }], { x: 0.95, y: 5.45, w: 5.0, h: 0.7, fontFace: F, fontSize: 30, bold: true });

// menu card (right)
const mx = 6.85, mw = 5.75;
s.addShape(p.ShapeType.roundRect, { x: mx, y: 1.95, w: mw, h: 4.9, rectRadius: 0.16, fill: { color: "17120F" }, line: { color: GOLD, width: 1.25 }, shadow: { type: "outer", color: "000000", opacity: 0.5, blur: 14, offset: 6, angle: 90 } });
s.addText("TODAY'S SPECIAL", { x: mx, y: 2.25, w: mw, h: 0.45, align: "center", fontFace: F, fontSize: 20, bold: true, color: GOLD, charSpacing: 4 });
s.addImage({ path: IMG("burgerDeluxe"), x: mx + mw / 2 - 0.75, y: 2.6, w: 1.5, h: 1.5 });
function menuItem(y, name, price, desc, hot) {
  s.addText([
    { text: name, options: { color: hot ? ORANGE : CREAM, bold: true, fontSize: hot ? 17 : 16 } },
  ], { x: mx + 0.35, y, w: mw - 1.4, h: 0.35, fontFace: F, align: "left" });
  s.addText(price, { x: mx + mw - 1.15, y, w: 0.85, h: 0.35, align: "right", fontFace: F, fontSize: 16, bold: true, color: hot ? ORANGE : CREAM });
  if (desc) s.addText(desc, { x: mx + 0.35, y: y + 0.32, w: mw - 0.7, h: 0.5, fontFace: F, fontSize: 11.5, italic: true, color: hot ? ORANGESOFT : DIM, lineSpacingMultiple: 1.0 });
}
menuItem(4.25, "The Classic Burger", "$12", "", false);
menuItem(4.72, "Chef's Signature Beef Burger", "$15", "fire-grilled · caramelised onions · house sauce", true);
menuItem(5.72, "Fries", "$5", "", false);
s.addShape(p.ShapeType.line, { x: mx + 0.35, y: 4.65, w: mw - 0.7, h: 0, line: { color: "3A302A", width: 1 } });
s.addShape(p.ShapeType.line, { x: mx + 0.35, y: 6.15, w: mw - 0.7, h: 0, line: { color: "3A302A", width: 1 } });
pill(s, "Which one would you order?", mx + 0.55, 6.32, mw - 1.1, 0.42, ORANGE, "17120F", 14);
s.addNotes("Now let's forget the food itself for a moment and look at the words.\n\nIf I simply say 'burger', that sounds normal. But if I say 'chef's signature fire-grilled beef burger with caramelised onions and house sauce'… suddenly it sounds much more special.\n\nRestaurants carefully think about how food is described, where items are placed on a menu, and how prices are presented. These things can influence what catches our attention and what we choose.\n\nDid anyone choose the second burger because it sounded better? 🍟");

// =================================================================== SLIDE 4
s = p.addSlide(); bg(s, "F7F0E7");
kicker(s, "03 · Memory & Emotion", 0.7, 0.55, ORANGE);
s.addText([
  { text: "Food Is Connected To ", options: { color: "2C2420" } },
  { text: "Memories", options: { color: ORANGE } },
], { x: 0.65, y: 0.9, w: 12, h: 0.9, fontFace: F, fontSize: 40, bold: true, align: "left" });
s.addText("Hunger isn't the whole story. Some foods carry a place, a person, a moment.", { x: 0.7, y: 1.85, w: 12, h: 0.5, fontFace: F, fontSize: 17, italic: true, color: "6B5D4F" });

const d4 = 2.4, y4 = 2.7;
const x4 = [0.9, 4.05, 7.2, 10.35];
// light discs on light bg: add soft panel behind for contrast
const mem = [["cookingPot", "Home Cooking"], ["birthdayCake", "Birthday Cake"], ["stewBowl", "Family Meal"], ["coffeeCup", "Tea & Coffee"]];
mem.forEach(([n, l], i) => {
  s.addShape(p.ShapeType.ellipse, { x: x4[i] - 0.05, y: y4 - 0.05, w: d4 + 0.1, h: d4 + 0.1, fill: { color: "FFFFFF" }, line: { color: "E6DBCB", width: 1 }, shadow: { type: "outer", color: "9A8B79", opacity: 0.35, blur: 9, offset: 4, angle: 90 } });
  s.addImage({ path: IMG(n), x: x4[i], y: y4, w: d4, h: d4 });
  s.addText(l.toUpperCase(), { x: x4[i] - 0.35, y: y4 + d4 + 0.02, w: d4 + 0.7, h: 0.35, align: "center", fontFace: F, fontSize: 13.5, bold: true, color: "2C2420", charSpacing: 1 });
});

s.addText("What food takes you back?", { x: 0.7, y: 6.05, w: 12, h: 0.6, align: "center", fontFace: F, fontSize: 30, bold: true, color: "2C2420" });
s.addText("That's one reason we don't all choose the same way — our memories choose with us.", { x: 0.7, y: 6.7, w: 12, h: 0.4, align: "center", fontFace: F, fontSize: 15, italic: true, color: "6B5D4F" });
s.addNotes("Food isn't only about hunger. Sometimes food is connected to memories.\n\nThink about one food that immediately reminds you of your childhood, your family, or a special occasion. (Give them a few seconds.)\n\nMaybe it's something your mother or grandmother used to make. Maybe it's a food you always had during celebrations.\n\nThat's one reason we don't all choose food in the same way. Our experiences and memories can influence what feels comforting or appealing to us.\n\nAsk one coworker: Would you like to share one food that reminds you of home? ❤️");

// =================================================================== SLIDE 5
s = p.addSlide(); bg(s);
s.addShape(p.ShapeType.ellipse, { x: 10.8, y: -1.7, w: 4, h: 4, fill: { color: PANEL } });
kicker(s, "04 · Bringing It Together", 0.7, 0.55);
s.addText([
  { text: "So… Who Is Actually ", options: { color: CREAM } },
  { text: "Choosing?", options: { color: ORANGE } },
], { x: 0.65, y: 0.9, w: 12.1, h: 0.9, fontFace: F, fontSize: 40, bold: true, align: "left" });

// four inputs -> one outcome
const steps = [["See", "colour & plating", GREEN], ["Expect", "before we taste", ORANGESOFT], ["Remember", "people & moments", RED], ["Read", "words & prices", GOLD]];
const sw = 2.75, sy = 2.35, sh = 1.7;
let sx = 0.7;
steps.forEach(([t, d, c], i) => {
  s.addShape(p.ShapeType.roundRect, { x: sx, y: sy, w: sw, h: sh, rectRadius: 0.14, fill: { color: PANEL } });
  s.addShape(p.ShapeType.ellipse, { x: sx + sw / 2 - 0.28, y: sy + 0.28, w: 0.56, h: 0.56, fill: { color: c } });
  s.addText(String(i + 1), { x: sx + sw / 2 - 0.28, y: sy + 0.28, w: 0.56, h: 0.56, align: "center", valign: "middle", fontFace: F, fontSize: 18, bold: true, color: "201A17" });
  s.addText(t, { x: sx, y: sy + 0.92, w: sw, h: 0.4, align: "center", fontFace: F, fontSize: 20, bold: true, color: CREAM });
  s.addText(d, { x: sx, y: sy + 1.3, w: sw, h: 0.35, align: "center", fontFace: F, fontSize: 12.5, italic: true, color: MUTED });
  if (i < 3) s.addText("+", { x: sx + sw, y: sy, w: 0.4, h: sh, align: "center", valign: "middle", fontFace: F, fontSize: 26, bold: true, color: ORANGE });
  sx += sw + 0.4;
});
s.addText("↓", { x: 0.7, y: 4.15, w: 11.95, h: 0.5, align: "center", fontFace: F, fontSize: 26, bold: true, color: ORANGE });
// outcome bar
s.addShape(p.ShapeType.roundRect, { x: 2.4, y: 4.65, w: 8.55, h: 1.05, rectRadius: 0.12, fill: { color: ORANGE } });
s.addText("WHAT WE CHOOSE", { x: 2.4, y: 4.65, w: 8.55, h: 1.05, align: "center", valign: "middle", fontFace: F, fontSize: 30, bold: true, color: "201A17", charSpacing: 2 });
s.addText([{ text: "Do we choose food… ", options: { color: CREAM } }, { text: "or does food influence our choices?", options: { color: ORANGESOFT, italic: true } }], { x: 0.7, y: 5.95, w: 11.95, h: 0.6, align: "center", fontFace: F, fontSize: 21, bold: true });
s.addText("Thank you.  —  So… what are you craving right now?", { x: 0.7, y: 6.7, w: 11.95, h: 0.4, align: "center", fontFace: F, fontSize: 15, italic: true, color: DIM });
s.addNotes("So, after looking at all of this, we can see that choosing food isn't always as simple as 'I'm hungry, so I'll eat.'\n\nOur choices can be influenced by what we see, how food is presented, the words we read on a menu, and even the memories we have connected to certain foods.\n\nSo the next time you choose something from a menu, maybe ask yourself… (pause) Did I choose this because I really wanted it — or did something influence me?\n\nThank you. Now, after this presentation… what are you craving? 😂");

p.writeFile({ fileName: "Psychology_of_Food_Choices.pptx" }).then(f => console.log("Wrote", f));
