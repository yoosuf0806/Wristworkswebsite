const pptxgen = require("pptxgenjs");
const path = require("path");
const p = new pptxgen();
p.defineLayout({ name: "W", width: 13.333, height: 7.5 });
p.layout = "W";

const DIR = __dirname;
const A = (f) => path.join(DIR, f);   // asset path

// Palette
const ESPRESSO = "1C1109";
const BROWN    = "3A2318";
const ORANGE   = "E8722C";
const TOMATO   = "D9433C";
const GOLD     = "F0A868";
const CREAM    = "FDF6EC";
const INK      = "2B1B14";
const MUTED    = "8A6F5A";

const HEAD = "Montserrat";
const BODY = "Calibri";

// pill
function pill(slide, text, x, y, w, h, fill, color) {
  slide.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: h/2, fill:{color:fill}, line:{type:"none"} });
  slide.addText(text, { x, y, w, h, align:"center", valign:"middle", fontFace: HEAD, bold:true, fontSize: 13, color, charSpacing: 2, margin:0 });
}

// a real-photo tile: rounded photo (pre-rounded PNG) with shadow + overlay label pill
function photoTile(slide, img, x, y, w, h, o={}) {
  slide.addImage({ path: img, x, y, w, h,
    shadow: { type:"outer", color:"1C1109", opacity:o.shadow??0.5, blur:14, offset:6, angle:90 } });
  if (o.label) {
    const lw = o.labelW ?? Math.min(w-0.2, 0.14*String(o.label).length + 0.5);
    slide.addShape(p.ShapeType.roundRect, { x:x+(w-lw)/2, y:y+h-0.52, w:lw, h:0.4, rectRadius:0.2,
      fill:{ color:o.labelFill??"1C1109" }, line:{type:"none"} });
    slide.addText(o.label, { x:x+(w-lw)/2, y:y+h-0.52, w:lw, h:0.4, align:"center", valign:"middle",
      fontFace:HEAD, bold:true, fontSize:o.labelSize??12, color:o.labelColor??"FDF6EC", charSpacing:1, margin:0 });
  }
}

// a food "photo" tile: rounded frame + illustration + label
function foodTile(slide, img, x, y, w, h, o={}) {
  const frameFill = o.fill ?? "FBF3E9";
  slide.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.16, fill: { color: frameFill }, line: { type:"none" },
    shadow: { type:"outer", color:"1C1109", opacity:o.shadow??0.4, blur:14, offset:6, angle:90 },
  });
  const lab = o.label ? 0.46 : 0.12;
  const pad = 0.14;
  slide.addImage({ path: img, x: x+pad, y: y+pad, w: w-2*pad, h: h-pad-lab,
    sizing:{ type:"contain", w:w-2*pad, h:h-pad-lab } });
  if (o.label) {
    slide.addText(o.label, { x, y:y+h-0.42, w, h:0.36, align:"center", valign:"middle",
      fontFace:HEAD, bold:true, fontSize:13, color:o.labelColor??INK, charSpacing:2, margin:0 });
  }
}

/* ============ SLIDE 1 — HOOK ============ */
{
  const s = p.addSlide();
  s.background = { path: A("bg_dark.png") };
  s.addNotes(
`Hi everyone — I'm Nooha. Quick experiment before I say anything else.

[Point to the screen.] Here are four foods. Don't overthink it — in the next five seconds, pick the ONE you'd want right now, and raise your hand for it when I call it out.

[Pause 5 seconds. Then call each item and count hands.] Burger? Pizza? Salad? Dessert? … Interesting — no two rooms ever agree, and I promise none of you did any 'analysis.' You just knew.

So here's my question for the next few minutes: WHY did you choose that? That's what the psychology of food is all about — the hidden reasons behind 'I just felt like it.' Let's dig in.

[Delivery tip: keep energy high, smile, and don't rush the 5-second countdown — the silence builds the hook.]`);

  pill(s, "A MINI EXPERIMENT", 0.75, 0.62, 3.0, 0.5, ORANGE, ESPRESSO);
  s.addText("THE PSYCHOLOGY", { x:0.7, y:1.35, w:8.4, h:1.0, fontFace:HEAD, fontSize:56, bold:true, color:CREAM, charSpacing:1, margin:0 });
  s.addText("OF FOOD", { x:0.7, y:2.25, w:8.4, h:1.1, fontFace:HEAD, fontSize:72, bold:true, color:ORANGE, charSpacing:1, margin:0 });
  s.addText("Why do we choose what we choose?", { x:0.72, y:3.45, w:8.2, h:0.6, fontFace:BODY, italic:true, fontSize:24, color:GOLD, margin:0 });

  s.addText("WHAT WOULD YOU CHOOSE?", { x:0.72, y:4.45, w:8.2, h:0.8, fontFace:HEAD, fontSize:33, bold:true, color:CREAM, margin:0 });
  s.addText("You have 5 seconds. Pick one. 👆", { x:0.75, y:5.2, w:8.0, h:0.5, fontFace:BODY, fontSize:18, color:GOLD, margin:0 });
  s.addText("Presented by Nooha Iflal", { x:0.75, y:6.55, w:6, h:0.45, fontFace:BODY, fontSize:16, color:"C9AE97", margin:0 });

  // 2x2 real-photo tiles
  const tw=1.85, th=2.0, gx=0.22, gy=0.22, sx=9.3, sy=0.95;
  photoTile(s, A("p1_burger.png"),  sx,       sy,       tw, th, { label:"BURGER",  labelFill:ORANGE, labelColor:ESPRESSO });
  photoTile(s, A("p1_pizza.png"),   sx+tw+gx, sy,       tw, th, { label:"PIZZA",   labelFill:ORANGE, labelColor:ESPRESSO });
  photoTile(s, A("p1_salad.png"),   sx,       sy+th+gy, tw, th, { label:"SALAD",   labelFill:ORANGE, labelColor:ESPRESSO });
  photoTile(s, A("p1_dessert.png"), sx+tw+gx, sy+th+gy, tw, th, { label:"DESSERT", labelFill:ORANGE, labelColor:ESPRESSO });
  s.addText("Raise your hand ✋", { x:sx, y:sy+2*th+gy+0.12, w:2*tw+gx, h:0.5, align:"center", fontFace:BODY, italic:true, fontSize:16, color:CREAM, margin:0 });
}

/* ============ SLIDE 2 — EYES CHOOSE FIRST ============ */
{
  const s = p.addSlide();
  s.background = { path: A("bg_cream.png") };
  s.addNotes(
`Okay, first reason we choose what we choose: our eyes get there first.

[Point to the two burgers.] Same burger — literally the same recipe. Quick show of hands: which one looks tastier, left or right? [Pause for hands — it'll be lopsided, play it up.] Right, of course — the one that's plated beautifully.

Here's what's wild: before you've tasted anything, your brain has already decided. You SEE it, you EXPECT it to taste amazing, and that expectation actually shapes how good it tastes. Colour, lighting, plating — all quietly setting you up. So half the battle in food is won before the fork even moves.`);

  pill(s, "01 · PERCEPTION", 0.75, 0.6, 2.7, 0.5, INK, CREAM);
  s.addText([{ text:"YOUR EYES CHOOSE FIRST ", options:{color:INK} }, { text:"👀", options:{} }],
    { x:0.7, y:1.15, w:12, h:0.9, fontFace:HEAD, fontSize:40, bold:true, margin:0 });
  s.addText("Which one looks tastier?", { x:0.72, y:2.02, w:9, h:0.55, fontFace:BODY, italic:true, fontSize:22, color:TOMATO, margin:0 });

  // two portrait photo tiles: plain vs plated (same burger, different presentation)
  const cy=2.6, ch=3.1, cw=2.85;
  photoTile(s, A("p2_plain.png"),  0.75, cy, cw, ch, { label:"PLAIN",            labelFill:"6E5E50", labelColor:CREAM, labelW:1.3 });
  photoTile(s, A("p2_plated.png"), 3.8,  cy, cw, ch, { label:"PLATED WITH LOVE", labelFill:ORANGE,   labelColor:ESPRESSO, labelW:2.35 });
  s.addShape(p.ShapeType.roundRect, { x:3.8+cw-0.98, y:cy+0.16, w:0.9, h:0.46, rectRadius:0.23, fill:{color:TOMATO}, line:{type:"none"} });
  s.addText("WOW", { x:3.8+cw-0.98, y:cy+0.16, w:0.9, h:0.46, align:"center", valign:"middle", fontFace:HEAD, bold:true, fontSize:13, color:CREAM, margin:0 });

  // middle callout between photos and flow
  s.addText([
    { text:"Same burger.\n", options:{ color:INK, bold:true } },
    { text:"Same recipe.\n", options:{ color:INK, bold:true } },
    { text:"One just got ", options:{ color:MUTED } },
    { text:"dressed up.", options:{ color:TOMATO, bold:true, italic:true } },
  ], { x:6.95, y:3.0, w:2.7, h:2.0, fontFace:BODY, fontSize:17, align:"left", margin:0, lineSpacingMultiple:1.05 });

  // flow icons SEE -> EXPECT -> CHOOSE
  const fx=9.85, fw=2.95, fh=1.12;
  const flow=[["icon_eye.png","SEE",ORANGE],["icon_brain.png","EXPECT",TOMATO],["icon_fork.png","CHOOSE",BROWN]];
  flow.forEach((f,i)=>{
    const y=1.55+i*1.42;
    s.addShape(p.ShapeType.roundRect, { x:fx, y, w:fw, h:fh, rectRadius:0.16, fill:{color:"FFFFFF"}, line:{type:"none"}, shadow:{type:"outer",color:"D8C3AB",opacity:0.5,blur:8,offset:3,angle:90} });
    s.addImage({ path:A(f[0]), x:fx+0.18, y:y+0.2, w:0.72, h:fh-0.4, sizing:{type:"contain",w:0.72,h:fh-0.4} });
    s.addText(f[1], { x:fx+1.0, y, w:fw-1.1, h:fh, align:"left", valign:"middle", fontFace:HEAD, bold:true, fontSize:17, color:f[2], margin:0 });
    if(i<2) s.addText("↓", { x:fx, y:y+fh-0.04, w:fw, h:0.4, align:"center", fontFace:HEAD, bold:true, fontSize:20, color:ORANGE, margin:0 });
  });

  s.addText("We taste with our eyes long before the first bite.", { x:0.75, y:5.95, w:9.4, h:0.55, fontFace:BODY, fontSize:19, color:INK, margin:0 });
}

/* ============ SLIDE 3 — THE MENU ============ */
{
  const s = p.addSlide();
  s.background = { path: A("bg_cream.png") };
  s.addNotes(
`Now let's talk about the menu — because the menu is quietly manipulating you, and honestly, it's brilliant.

[Point to the menu.] Look at these two. A 'Classic Burger' for twelve dollars. Or the 'Chef's Signature Fire-Grilled Beef Burger with caramelised onions and house sauce' for fifteen. Quick — which one are you ordering? [Pause for a show of hands — most pick the signature.]

Here's the punchline: it might be the exact same burger. Same beef. All that changed was the words, the layout, and how it's presented. Descriptive language makes us expect more, so we happily pay more. So next time a menu makes your mouth water… know that the menu did that on purpose.`);

  pill(s, "02 · LANGUAGE", 0.75, 0.6, 2.5, 0.5, INK, CREAM);
  s.addText([{ text:"IS THE MENU MANIPULATING YOU? ", options:{color:INK} }, { text:"📋", options:{} }],
    { x:0.7, y:1.15, w:11.4, h:0.9, fontFace:HEAD, fontSize:37, bold:true, margin:0 });

  // Menu card
  const mx=0.75, my=2.2, mw=7.6, mh=4.55;
  s.addShape(p.ShapeType.roundRect, { x:mx, y:my, w:mw, h:mh, rectRadius:0.18, fill:{color:"FFFDF9"}, line:{color:"E3CFB4", width:1.5}, shadow:{type:"outer",color:"C9AC8B",opacity:0.5,blur:16,offset:6,angle:90} });
  s.addText("— THE KITCHEN —", { x:mx, y:my+0.3, w:mw, h:0.4, align:"center", fontFace:HEAD, bold:true, fontSize:15, color:ORANGE, charSpacing:4, margin:0 });
  s.addText("menu", { x:mx, y:my+0.62, w:mw, h:0.55, align:"center", fontFace:BODY, italic:true, fontSize:26, color:INK, margin:0 });

  function row(y, name, desc, price, hot, fs){
    fs = fs || 18;
    s.addText(name, { x:mx+0.55, y, w:5.55, h:0.4, fontFace:HEAD, bold:true, fontSize:fs, color: hot?TOMATO:INK, margin:0 });
    if (desc) s.addText(desc, { x:mx+0.55, y:y+0.36, w:4.85, h:0.62, fontFace:BODY, italic:true, fontSize:13.5, color:MUTED, margin:0 });
    s.addText("$"+price, { x:mx+mw-1.55, y, w:1.05, h:0.4, align:"right", fontFace:HEAD, bold:true, fontSize:18, color: hot?TOMATO:INK, margin:0 });
  }
  row(my+1.45, "Classic Burger", "", "12", false);
  s.addShape(p.ShapeType.line, { x:mx+0.55, y:my+2.02, w:mw-1.1, h:0, line:{color:"EADBC4", width:1, dashType:"dash"} });
  row(my+2.2, "Chef's Signature Fire-Grilled Beef Burger", "caramelised onions, smoked house sauce & brioche", "15", true, 15);
  s.addText("🔥 most ordered", { x:mx+mw-2.05, y:my+2.66, w:1.75, h:0.35, align:"right", fontFace:BODY, italic:true, fontSize:11.5, color:ORANGE, margin:0 });
  s.addShape(p.ShapeType.line, { x:mx+0.55, y:my+3.28, w:mw-1.1, h:0, line:{color:"EADBC4", width:1, dashType:"dash"} });
  row(my+3.5, "Fries", "", "5", false);

  // right column
  s.addText("Which one would you order?", { x:8.7, y:2.25, w:4.4, h:0.95, fontFace:HEAD, bold:true, fontSize:24, color:INK, margin:0 });
  // hero burger photo
  photoTile(s, A("p3_burger.png"), 9.35, 3.12, 2.85, 1.67, { shadow:0.45 });
  s.addText("Same beef. Different words.", { x:8.7, y:5.0, w:4.4, h:0.45, align:"center", fontFace:BODY, italic:true, fontSize:16, color:TOMATO, margin:0 });

  s.addShape(p.ShapeType.roundRect, { x:8.7, y:5.55, w:4.4, h:1.2, rectRadius:0.16, fill:{color:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"7a3b1d",opacity:0.5,blur:12,offset:4,angle:90} });
  s.addText([
    { text:"Words ", options:{color:CREAM, bold:true} }, { text:"+ ", options:{color:ORANGE, bold:true} },
    { text:"Layout ", options:{color:CREAM, bold:true} }, { text:"+ ", options:{color:ORANGE, bold:true} },
    { text:"Presentation", options:{color:CREAM, bold:true} },
  ], { x:8.9, y:5.7, w:4.0, h:0.5, align:"center", fontFace:HEAD, fontSize:15, margin:0 });
  s.addText("= influence 🍴", { x:8.9, y:6.15, w:4.0, h:0.5, align:"center", fontFace:HEAD, bold:true, fontSize:21, color:ORANGE, margin:0 });
}

/* ============ SLIDE 4 — FOOD & MEMORIES ============ */
{
  const s = p.addSlide();
  s.background = { path: A("bg_sunset.png") };
  s.addNotes(
`This next one is my favourite, because it's the most human. Food isn't just taste — it's memory.

A certain smell, and suddenly you're eight years old in your grandmother's kitchen. That's not an accident; food is wired straight to emotion and memory.

[Turn to the audience — pick one friendly face.] Can I get one person — what's a food that instantly reminds you of home or childhood? [Let them answer. React warmly — 'oh, that's a good one.' Maybe share a quick one-line example of your own.]

Notice nobody ever says 'the one with the best nutrition label.' We remember who we ate it with. That feeling is doing a lot of the choosing for us.`);

  pill(s, "03 · EMOTION", 0.75, 0.6, 2.4, 0.5, CREAM, BROWN);
  s.addText([{ text:"WHY DOES FOOD BRING BACK MEMORIES? ", options:{color:CREAM} }, { text:"❤️", options:{} }],
    { x:0.7, y:1.18, w:12.4, h:0.9, fontFace:HEAD, fontSize:35, bold:true, margin:0 });

  const cards=[
    ["p4_curry.png","RICE & CURRY"],
    ["p4_biryani.png","BIRYANI"],
    ["p4_platter.png","FAMILY PLATTER"],
    ["p4_pizza.png","PIZZA NIGHT"],
    ["p4_butter.png","BUTTER CHICKEN"],
  ];
  const n=cards.length, gap=0.32, cw=2.12, startX=0.75, cy=2.35, ch=2.4;
  cards.forEach((c,i)=>{
    const x=startX+i*(cw+gap);
    photoTile(s, A(c[0]), x, cy, cw, ch, { label:c[1], labelFill:"1C1109", labelColor:CREAM, labelW:cw-0.28, labelSize:11.5, shadow:0.55 });
  });

  s.addText("WHAT FOOD REMINDS YOU OF HOME?", { x:0.72, y:5.2, w:12, h:0.8, fontFace:HEAD, fontSize:34, bold:true, color:CREAM, margin:0 });
  s.addText("Food is never just food — it's memories, people & moments on a plate.", { x:0.75, y:6.08, w:11.5, h:0.6, fontFace:BODY, italic:true, fontSize:19, color:"FBE7D2", margin:0 });
}

/* ============ SLIDE 5 — CONCLUSION ============ */
{
  const s = p.addSlide();
  s.background = { path: A("bg_dark.png") };
  s.addNotes(
`So let's zoom out. In just a few minutes we saw four forces quietly steering us:
We choose with our EYES — presentation sells before taste does.
We choose with our EXPECTATIONS — we taste what we assume we'll taste.
We choose with WORDS — 'fire-grilled' beats 'burger' every time.
And we choose with our HEARTS — memory and emotion pull the strongest of all.

[Pause. Slow down for the closer.] So here's my parting question: do WE choose food… or does food choose US? Honestly — it's a bit of both. The trick is just noticing the pull.

Thank you so much. And now the only question that really matters… what are you craving? [Smile — let them laugh — done.]`);

  pill(s, "THE VERDICT", 0.75, 0.55, 2.3, 0.5, ORANGE, ESPRESSO);
  s.addText([{ text:"ARE WE REALLY IN CONTROL? ", options:{color:CREAM} }, { text:"🧠", options:{} }],
    { x:0.7, y:1.1, w:12.4, h:0.9, fontFace:HEAD, fontSize:38, bold:true, margin:0 });

  const steps=[
    ["icon_eye_l.png","WHAT WE SEE"],
    ["icon_brain_l.png","WHAT WE EXPECT"],
    ["icon_menu_l.png","WHAT WE READ"],
    ["icon_heart_l.png","WHAT WE REMEMBER"],
    ["icon_fork.png","WHAT WE CHOOSE"],
  ];
  const bx=0.85, bw=5.2, bh=0.72, top=2.2, step=0.9;
  steps.forEach((st,i)=>{
    const y=top+i*step; const last=i===4;
    s.addShape(p.ShapeType.roundRect, { x:bx, y, w:bw, h:bh, rectRadius:0.14, fill:{color: last?ORANGE:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"120a05",opacity:0.5,blur:8,offset:3,angle:90} });
    s.addImage({ path:A(st[0]), x:bx+0.16, y:y+0.13, w:0.5, h:bh-0.26, sizing:{type:"contain",w:0.5,h:bh-0.26} });
    s.addText(st[1], { x:bx+0.82, y, w:bw-1.0, h:bh, align:"left", valign:"middle", fontFace:HEAD, bold:true, fontSize:18, color: last?ESPRESSO:CREAM, margin:0 });
    if(i<4) s.addText("↓", { x:bx, y:y+bh-0.08, w:bw, h:0.35, align:"center", fontFace:HEAD, bold:true, fontSize:18, color:ORANGE, margin:0 });
  });

  s.addText("DO WE CHOOSE FOOD…", { x:6.4, y:2.45, w:6.4, h:0.9, fontFace:HEAD, fontSize:34, bold:true, color:CREAM, margin:0 });
  s.addText("…or does food choose us?", { x:6.4, y:3.35, w:6.4, h:0.9, fontFace:HEAD, fontSize:34, bold:true, color:ORANGE, italic:true, margin:0 });

  s.addShape(p.ShapeType.roundRect, { x:6.4, y:4.7, w:6.3, h:1.55, rectRadius:0.18, fill:{color:BROWN}, line:{type:"none"}, shadow:{type:"outer",color:"120a05",opacity:0.5,blur:14,offset:5,angle:90} });
  s.addText("Thank you 🙌", { x:6.7, y:4.9, w:5.8, h:0.55, fontFace:HEAD, bold:true, fontSize:24, color:GOLD, margin:0 });
  s.addText("…and now — what are you craving? 😄", { x:6.7, y:5.5, w:5.8, h:0.6, fontFace:BODY, italic:true, fontSize:19, color:CREAM, margin:0 });
  s.addText("Nooha Iflal  ·  The Psychology of Food", { x:6.4, y:6.55, w:6.4, h:0.4, fontFace:BODY, fontSize:14, color:"C9AE97", margin:0 });
}

const out = path.join(DIR, "Psychology_of_Food.pptx");
p.writeFile({ fileName: out }).then(()=>console.log("WROTE", out)).catch(e=>{console.error(e);process.exit(1)});
