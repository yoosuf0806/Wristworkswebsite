const pptxgen = require("pptxgenjs");
const path = require("path");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

const DIR = __dirname;
const bg = (f) => path.join(DIR, f);

// Palette
const ESPRESSO = "1C1109";
const BROWN    = "3A2318";
const ORANGE   = "E8722C";
const TOMATO   = "D9433C";
const GOLD     = "F0A868";
const CREAM    = "FDF6EC";
const CREAMSOFT= "F6E7D3";
const INK      = "2B1B14";
const MUTED    = "8A6f5a";

const HEAD = "Montserrat";      // display
const BODY = "Calibri";         // reliable body/captions

// helper: emoji "photo" card — rounded frame with emoji centered
function foodCard(slide, emoji, x, y, w, h, fill, opts={}) {
  slide.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: opts.radius ?? 0.22,
    fill: { color: fill }, line: { type: "none" },
    shadow: { type: "outer", color: "1C1109", opacity: 0.45, blur: 14, offset: 6, angle: 90 },
  });
  slide.addText(emoji, {
    x, y, w, h, align: "center", valign: "middle",
    fontSize: opts.emojiSize ?? 96, margin: 0,
  });
  if (opts.label) {
    slide.addText(opts.label, {
      x, y: y + h - 0.62, w, h: 0.5, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 13, bold: true, color: opts.labelColor ?? CREAM,
      charSpacing: 2, margin: 0,
    });
  }
}

// small pill
function pill(slide, text, x, y, w, h, fill, color) {
  slide.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: h/2, fill:{color:fill}, line:{type:"none"} });
  slide.addText(text, { x, y, w, h, align:"center", valign:"middle", fontFace: HEAD, bold:true, fontSize: 13, color, charSpacing: 2, margin:0 });
}

/* ============ SLIDE 1 — HOOK ============ */
{
  const s = p.addSlide();
  s.background = { path: bg("bg_dark.png") };
  s.addNotes(
`Hi everyone — I'm Nooha. Quick experiment before I say anything else.

[Point to the screen.] Here are four foods. Don't overthink it — in the next five seconds, pick the ONE you'd want right now, and raise your hand for it when I call it out.

[Pause 5 seconds. Then call each item and count hands.] Burger? Pizza? Salad? Dessert? … Interesting. Nobody agreed on nothing — and I promise none of you did any 'analysis.' You just knew.

So here's my question for the next few minutes: WHY did you choose that? That's what the psychology of food is all about — the hidden reasons behind 'I just felt like it.' Let's dig in.`);

  pill(s, "A MINI EXPERIMENT", 0.75, 0.62, 3.0, 0.5, ORANGE, ESPRESSO);

  s.addText("THE PSYCHOLOGY", { x:0.7, y:1.35, w:8.4, h:1.0, fontFace:HEAD, fontSize:58, bold:true, color:CREAM, charSpacing:1, margin:0 });
  s.addText("OF FOOD", { x:0.7, y:2.25, w:8.4, h:1.1, fontFace:HEAD, fontSize:72, bold:true, color:ORANGE, charSpacing:1, margin:0 });
  s.addText("Why do we choose what we choose?", { x:0.72, y:3.42, w:8.0, h:0.6, fontFace:BODY, italic:true, fontSize:24, color:GOLD, margin:0 });

  // interactive question block
  s.addText("WHAT WOULD YOU CHOOSE?", { x:0.72, y:4.35, w:8.2, h:0.8, fontFace:HEAD, fontSize:34, bold:true, color:CREAM, margin:0 });
  s.addText("You have 5 seconds. Pick one. 👆", { x:0.75, y:5.12, w:8.0, h:0.5, fontFace:BODY, fontSize:18, color:GOLD, margin:0 });
  s.addText("Presented by Nooha Iflal", { x:0.75, y:6.55, w:6, h:0.45, fontFace:BODY, fontSize:16, color:"C9AE97", margin:0 });

  // 4 food cards on the right, staggered
  foodCard(s, "🍔", 9.55, 0.9,  1.65, 1.65, BROWN, { label:"BURGER", labelColor:GOLD });
  foodCard(s, "🍕", 11.35,0.9,  1.65, 1.65, BROWN, { label:"PIZZA",  labelColor:GOLD });
  foodCard(s, "🥗", 9.55, 2.75, 1.65, 1.65, BROWN, { label:"SALAD",  labelColor:GOLD });
  foodCard(s, "🍰", 11.35,2.75, 1.65, 1.65, BROWN, { label:"DESSERT",labelColor:GOLD });
  s.addText("Raise your hand ✋", { x:9.4, y:4.75, w:3.5, h:0.5, align:"center", fontFace:BODY, italic:true, fontSize:16, color:CREAM, margin:0 });
}

/* ============ SLIDE 2 — EYES CHOOSE FIRST ============ */
{
  const s = p.addSlide();
  s.background = { path: bg("bg_cream.png") };

  pill(s, "01 · PERCEPTION", 0.75, 0.6, 2.7, 0.5, INK, CREAM);
  s.addText([
    { text:"YOUR EYES CHOOSE FIRST ", options:{ color:INK } },
    { text:"👀", options:{} },
  ], { x:0.7, y:1.15, w:12, h:0.9, fontFace:HEAD, fontSize:40, bold:true, margin:0 });

  s.addText("Which one looks tastier?", { x:0.72, y:2.05, w:12, h:0.6, fontFace:BODY, italic:true, fontSize:22, color:TOMATO, margin:0 });

  // two comparison cards
  const cy = 2.85, ch = 2.55, cw = 4.6;
  // plain
  s.addShape(p.ShapeType.roundRect, { x:0.75, y:cy, w:cw, h:ch, rectRadius:0.2, fill:{color:"EAD9C4"}, line:{type:"none"}, shadow:{type:"outer",color:"B79A7E",opacity:0.4,blur:12,offset:5,angle:90} });
  s.addText("🍔", { x:0.75, y:cy-0.05, w:cw, h:ch-0.5, align:"center", valign:"middle", fontSize:120, margin:0, transparency:22 });
  pill(s, "PLAIN", 2.55, cy+ch-0.62, 1.05, 0.42, "9C8570", CREAM);

  // gorgeous
  s.addShape(p.ShapeType.roundRect, { x:5.6, y:cy, w:cw, h:ch, rectRadius:0.2, fill:{color:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"7a3b1d",opacity:0.55,blur:16,offset:6,angle:90} });
  s.addText("🍔", { x:5.6, y:cy-0.05, w:cw, h:ch-0.5, align:"center", valign:"middle", fontSize:132, margin:0 });
  pill(s, "PLATED WITH LOVE", 6.7, cy+ch-0.62, 2.4, 0.42, ORANGE, ESPRESSO);
  s.addShape(p.ShapeType.roundRect, { x:9.15, y:cy+0.18, w:0.95, h:0.5, rectRadius:0.25, fill:{color:TOMATO}, line:{type:"none"} });
  s.addText("WOW", { x:9.15, y:cy+0.18, w:0.95, h:0.5, align:"center", valign:"middle", fontFace:HEAD, bold:true, fontSize:13, color:CREAM, margin:0 });

  // flow: SEE -> EXPECT -> CHOOSE on the right
  const fx = 10.55, fw = 2.0, fh = 1.15;
  const flow = [["👀","SEE",ORANGE],["🧠","EXPECT",TOMATO],["🍴","CHOOSE",BROWN]];
  flow.forEach((f,i)=>{
    const y = 1.05 + i*1.55;
    s.addShape(p.ShapeType.roundRect, { x:fx, y, w:fw, h:fh, rectRadius:0.16, fill:{color:"FFFFFF"}, line:{type:"none"}, shadow:{type:"outer",color:"D8C3AB",opacity:0.5,blur:8,offset:3,angle:90} });
    s.addText(f[0], { x:fx, y:y+0.06, w:0.9, h:fh-0.12, align:"center", valign:"middle", fontSize:36, margin:0 });
    s.addText(f[1], { x:fx+0.85, y, w:fw-0.9, h:fh, align:"left", valign:"middle", fontFace:HEAD, bold:true, fontSize:16, color:f[2], margin:0 });
    if (i<2) s.addText("↓", { x:fx, y:y+fh-0.05, w:fw, h:0.5, align:"center", fontFace:HEAD, bold:true, fontSize:22, color:ORANGE, margin:0 });
  });

  s.addText("We taste with our eyes long before the first bite.", { x:0.75, y:5.75, w:9.4, h:0.6, fontFace:BODY, fontSize:19, color:INK, margin:0 });

  s.addNotes(
`Okay, first reason we choose what we choose: our eyes get there first.

[Point to the two burgers.] Same burger — literally the same recipe. Quick show of hands: which one looks tastier, left or right? [Pause for hands — it'll be lopsided, play it up.] Right, of course. The one that's plated beautifully.

Here's what's wild: before you've tasted anything, your brain has already decided. You SEE it, you EXPECT it to taste amazing, and that expectation actually shapes how good it tastes. Colour, lighting, plating — it's all quietly setting you up. So half the battle in food is won before the fork even moves.`);
}

/* ============ SLIDE 3 — THE MENU ============ */
{
  const s = p.addSlide();
  s.background = { path: bg("bg_cream.png") };

  pill(s, "02 · LANGUAGE", 0.75, 0.6, 2.5, 0.5, INK, CREAM);
  s.addText([
    { text:"THE MENU IS PLAYING TRICKS ON YOU ", options:{color:INK} },
    { text:"📋", options:{} },
  ], { x:0.7, y:1.15, w:12.4, h:0.9, fontFace:HEAD, fontSize:34, bold:true, margin:0 });

  // Menu card
  const mx=0.75, my=2.2, mw=7.6, mh=4.55;
  s.addShape(p.ShapeType.roundRect, { x:mx, y:my, w:mw, h:mh, rectRadius:0.18, fill:{color:"FFFDF9"}, line:{color:"E3CFB4", width:1.5}, shadow:{type:"outer",color:"C9AC8B",opacity:0.5,blur:16,offset:6,angle:90} });
  s.addText("— THE KITCHEN —", { x:mx, y:my+0.3, w:mw, h:0.4, align:"center", fontFace:HEAD, bold:true, fontSize:15, color:ORANGE, charSpacing:4, margin:0 });
  s.addText("menu", { x:mx, y:my+0.62, w:mw, h:0.55, align:"center", fontFace:BODY, italic:true, fontSize:26, color:INK, margin:0 });

  function row(y, name, desc, price, hot, fs){
    fs = fs || 18;
    s.addText(name, { x:mx+0.55, y, w:5.55, h:0.4, fontFace:HEAD, bold:true, fontSize:fs, color: hot?TOMATO:INK, margin:0 });
    if (desc) s.addText(desc, { x:mx+0.55, y:y+0.36, w:5.4, h:0.62, fontFace:BODY, italic:true, fontSize:13.5, color:MUTED, margin:0 });
    s.addText("$"+price, { x:mx+mw-1.55, y, w:1.05, h:0.4, align:"right", fontFace:HEAD, bold:true, fontSize:18, color: hot?TOMATO:INK, margin:0 });
  }
  row(my+1.45, "Classic Burger", "", "12", false);
  s.addShape(p.ShapeType.line, { x:mx+0.55, y:my+2.02, w:mw-1.1, h:0, line:{color:"EADBC4", width:1, dashType:"dash"} });
  row(my+2.2, "Chef's Signature Fire-Grilled Beef Burger", "caramelised onions, smoked house sauce & brioche", "15", true, 15);
  s.addShape(p.ShapeType.line, { x:mx+0.55, y:my+3.28, w:mw-1.1, h:0, line:{color:"EADBC4", width:1, dashType:"dash"} });
  row(my+3.5, "Fries", "", "5", false);
  // little flame tag
  s.addText("🔥 most ordered", { x:mx+mw-2.4, y:my+2.62, w:1.9, h:0.35, align:"right", fontFace:BODY, italic:true, fontSize:11.5, color:ORANGE, margin:0 });

  // right column callouts
  s.addText("Which one would you order?", { x:8.75, y:2.35, w:4.3, h:1.0, fontFace:HEAD, bold:true, fontSize:26, color:INK, margin:0 });
  s.addText("Same beef. Different words.", { x:8.78, y:3.35, w:4.2, h:0.5, fontFace:BODY, italic:true, fontSize:17, color:TOMATO, margin:0 });

  s.addShape(p.ShapeType.roundRect, { x:8.75, y:4.2, w:4.3, h:2.05, rectRadius:0.18, fill:{color:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"7a3b1d",opacity:0.5,blur:14,offset:5,angle:90} });
  s.addText("THE RECIPE FOR 'YES'", { x:9.0, y:4.42, w:3.8, h:0.4, fontFace:HEAD, bold:true, fontSize:14, color:GOLD, charSpacing:2, margin:0 });
  s.addText([
    { text:"Words", options:{color:CREAM, bold:true} },
    { text:"  +  ", options:{color:ORANGE, bold:true} },
    { text:"Layout", options:{color:CREAM, bold:true} },
    { text:"  +  ", options:{color:ORANGE, bold:true} },
    { text:"Presentation", options:{color:CREAM, bold:true} },
  ], { x:9.0, y:4.92, w:3.85, h:0.6, fontFace:HEAD, fontSize:17, margin:0 });
  s.addText("= influence 🍴", { x:9.0, y:5.55, w:3.8, h:0.55, fontFace:HEAD, bold:true, fontSize:22, color:ORANGE, margin:0 });

  s.addNotes(
`Now let's talk about the menu — because the menu is quietly manipulating you, and honestly, it's brilliant.

[Point to the menu.] Look at these two. A 'Classic Burger' for twelve dollars. Or the 'Chef's Signature Fire-Grilled Beef Burger with caramelised onions and house sauce' for fifteen. Quick — which one are you ordering? [Pause for a show of hands — most will pick the signature.]

Here's the punchline: it might be the exact same burger. Same beef. All that changed was the words, the layout, and how it's presented. Descriptive language makes us expect more, so we happily pay more. So next time a menu makes your mouth water… just know the menu did that on purpose.`);
}

/* ============ SLIDE 4 — FOOD & MEMORIES ============ */
{
  const s = p.addSlide();
  s.background = { path: bg("bg_sunset.png") };

  pill(s, "03 · EMOTION", 0.75, 0.6, 2.4, 0.5, CREAM, BROWN);
  s.addText([
    { text:"WHAT FOOD TAKES YOU BACK? ", options:{color:CREAM} },
    { text:"❤️", options:{} },
  ], { x:0.7, y:1.18, w:12.4, h:0.9, fontFace:HEAD, fontSize:40, bold:true, margin:0 });

  // warm memory cards row
  const cards = [
    ["👨‍👩‍👧‍👦","Family meals"],
    ["🍪","Childhood treats"],
    ["🎂","Celebrations"],
    ["🍲","Home cooking"],
    ["☕","Comfort in a cup"],
  ];
  const n=cards.length, gap=0.32, cw=2.12, startX=0.75, cy=2.35, ch=2.35;
  cards.forEach((c,i)=>{
    const x = startX + i*(cw+gap);
    s.addShape(p.ShapeType.roundRect, { x, y:cy, w:cw, h:ch, rectRadius:0.2, fill:{color:"FFFFFF"}, line:{type:"none"}, shadow:{type:"outer",color:"3d1810",opacity:0.5,blur:14,offset:6,angle:90} });
    s.addText(c[0], { x, y:cy+0.15, w:cw, h:1.35, align:"center", valign:"middle", fontSize:60, margin:0 });
    s.addText(c[1], { x, y:cy+ch-0.72, w:cw, h:0.6, align:"center", valign:"middle", fontFace:HEAD, bold:true, fontSize:14, color:INK, margin:0 });
  });

  s.addText("WHAT FOOD REMINDS YOU OF HOME?", { x:0.72, y:5.15, w:12, h:0.8, fontFace:HEAD, fontSize:34, bold:true, color:CREAM, margin:0 });
  s.addText("Food is never just food — it's memories, people & moments on a plate.", { x:0.75, y:6.05, w:11.5, h:0.6, fontFace:BODY, italic:true, fontSize:19, color:"FBE7D2", margin:0 });

  s.addNotes(
`This next one is my favourite, because it's the most human. Food isn't just taste — it's memory.

A certain smell and suddenly you're eight years old in your grandmother's kitchen. That's not an accident; food is wired straight to emotion and memory.

[Turn to the audience — pick one friendly face.] Can I get one person — what's a food that instantly reminds you of home or childhood? [Let them answer. React warmly — 'oh, that's a good one.' Maybe share a one-line example of your own.]

See — nobody says 'the one with the best nutrition label.' We remember who we ate it with. That feeling is doing a lot of the choosing for us.`);
}

/* ============ SLIDE 5 — CONCLUSION ============ */
{
  const s = p.addSlide();
  s.background = { path: bg("bg_dark.png") };

  pill(s, "THE VERDICT", 0.75, 0.55, 2.3, 0.5, ORANGE, ESPRESSO);
  s.addText("SO… WHO IS ACTUALLY CHOOSING?", { x:0.7, y:1.1, w:12.4, h:0.9, fontFace:HEAD, fontSize:38, bold:true, color:CREAM, margin:0 });

  // vertical flow on left
  const steps = [
    ["👀","WHAT WE SEE", ORANGE],
    ["🧠","WHAT WE EXPECT", GOLD],
    ["📋","WHAT WE READ", TOMATO],
    ["❤️","WHAT WE REMEMBER", "E88A6A"],
    ["🍴","WHAT WE CHOOSE", ORANGE],
  ];
  const bx=0.85, bw=5.0, bh=0.72, top=2.2, step=0.9;
  steps.forEach((st,i)=>{
    const y = top + i*step;
    s.addShape(p.ShapeType.roundRect, { x:bx, y, w:bw, h:bh, rectRadius:0.14, fill:{color: i===4?ORANGE:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"120a05",opacity:0.5,blur:8,offset:3,angle:90} });
    s.addText(st[0], { x:bx+0.14, y, w:0.75, h:bh, align:"center", valign:"middle", fontSize:26, margin:0 });
    s.addText(st[1], { x:bx+0.95, y, w:bw-1.1, h:bh, align:"left", valign:"middle", fontFace:HEAD, bold:true, fontSize:18, color: i===4?ESPRESSO:CREAM, margin:0 });
    if (i<4) s.addText("↓", { x:bx, y:y+bh-0.08, w:bw, h:0.35, align:"center", fontFace:HEAD, bold:true, fontSize:18, color: i===4?ORANGE:st[2], margin:0 });
  });

  // right side: big question + closer
  s.addText("DO WE CHOOSE FOOD…", { x:6.4, y:2.45, w:6.4, h:0.9, fontFace:HEAD, fontSize:34, bold:true, color:CREAM, margin:0 });
  s.addText("…or does food choose us?", { x:6.4, y:3.35, w:6.4, h:0.9, fontFace:HEAD, fontSize:34, bold:true, color:ORANGE, italic:true, margin:0 });

  s.addShape(p.ShapeType.roundRect, { x:6.4, y:4.7, w:6.3, h:1.55, rectRadius:0.18, fill:{color:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"120a05",opacity:0.5,blur:14,offset:5,angle:90} });
  s.addText("Thank you 🙌", { x:6.7, y:4.9, w:5.8, h:0.55, fontFace:HEAD, bold:true, fontSize:24, color:GOLD, margin:0 });
  s.addText("…and now — what are you craving? 😄", { x:6.7, y:5.5, w:5.8, h:0.6, fontFace:BODY, italic:true, fontSize:19, color:CREAM, margin:0 });

  s.addText("Nooha Iflal  ·  The Psychology of Food", { x:6.4, y:6.55, w:6.4, h:0.4, fontFace:BODY, fontSize:14, color:"C9AE97", margin:0 });

  s.addNotes(
`So let's zoom out. In just a few minutes we saw four forces quietly steering us:
We choose with our EYES — presentation sells before taste does.
We choose with our EXPECTATIONS — we taste what we assume we'll taste.
We choose with WORDS — 'fire-grilled' beats 'burger' every time.
And we choose with our HEARTS — memory and emotion pull the strongest of all.

[Pause. Slow down for the closer.] So here's my parting question: do WE choose food… or does food choose US? Honestly — it's a bit of both. The trick is just noticing the pull.

Thank you so much. And now the only question that really matters… what are you craving? [Smile — let them laugh — done.]`);
}

const out = path.join(DIR, "Psychology_of_Food.pptx");
p.writeFile({ fileName: out }).then(()=>console.log("WROTE", out)).catch(e=>{console.error(e);process.exit(1)});
