// Approximate visual QA: redraw each slide's geometry to SVG at 96px/inch.
// Mirrors coordinates in build.js. Text is approximate (no wrapping) — used to
// check placement, overlap, margins, and gross overflow.
const sharp = require("sharp");
const fs = require("fs");
const PX = 96, W = Math.round(13.333 * PX), H = Math.round(7.5 * PX);
const BG="#201A17",PANEL="#2C2420",PANEL2="#372D28",ORANGE="#F2820C",ORANGESOFT="#F6A945",GOLD="#E0A82E",CREAM="#F7F0E7",MUTED="#B7A797",DIM="#8B7C6E",GREEN="#8CC152",RED="#D8452F",LIGHT="#F7F0E7";
const P = (v)=>v*PX;
function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function T(x,y,w,h,txt,{fs=16,bold=0,color="#fff",align="left",italic=0,valign="top"}={}){
  const px=P(x),py=P(y),pw=P(w),ph=P(h),fpx=fs*96/72;
  let tx=px+4,anchor="start"; if(align==="center"){tx=px+pw/2;anchor="middle";} if(align==="right"){tx=px+pw-4;anchor="end";}
  let ty = valign==="middle" ? py+ph/2+fpx*0.35 : py+fpx*0.9;
  return `<text x="${tx}" y="${ty}" font-family="Calibri,Arial" font-size="${fpx}" ${bold?'font-weight="700"':''} ${italic?'font-style="italic"':''} fill="${color}" text-anchor="${anchor}">${esc(txt)}</text>`;
}
function rect(x,y,w,h,fill,r=0,stroke,sw){return `<rect x="${P(x)}" y="${P(y)}" width="${P(w)}" height="${P(h)}" rx="${P(r)}" fill="${fill||'none'}" ${stroke?`stroke="${stroke}" stroke-width="${sw||1}"`:''}/>`;}
function ell(x,y,w,h,fill,stroke,sw){return `<ellipse cx="${P(x+w/2)}" cy="${P(y+h/2)}" rx="${P(w/2)}" ry="${P(h/2)}" fill="${fill||'none'}" ${stroke?`stroke="${stroke}" stroke-width="${sw||1}"`:''}/>`;}
function img(name,x,y,w,h){const d=fs.readFileSync(`img/${name}.png`).toString("base64");return `<image x="${P(x)}" y="${P(y)}" width="${P(w)}" height="${P(h)}" href="data:image/png;base64,${d}"/>`;}

const slides=[];

// S1
let g=`${rect(0,0,13.333,7.5,BG)}`;
g+=ell(-1.6,-1.6,3.6,3.6,PANEL)+ell(11.4,5.6,3.6,3.6,PANEL);
g+=T(0.7,0.55,8,0.35,"THE PSYCHOLOGY OF FOOD",{fs:13,bold:1,color:ORANGE});
g+=T(0.6,0.95,12.1,1.1,"What Would You Choose?",{fs:54,bold:1,color:CREAM,align:"center"});
const xs=[0.85,4.0,7.15,10.3],d1=2.55,y1=2.55,labels=["BURGER","PIZZA","SALAD","CAKE"],names=["burgerDeluxe","pizza","salad","cakeSlice"];
xs.forEach((x,i)=>{g+=img(names[i],x,y1,d1,d1)+T(x-0.3,y1+d1-0.05,d1+0.6,0.35,labels[i],{fs:14,bold:1,color:CREAM,align:"center"});});
g+=rect(3.66,5.9,6.0,0.7,ORANGE,0.35)+T(3.66,5.9,6.0,0.7,"You have 5 seconds.  Choose one.",{fs:20,bold:1,color:"#201A17",align:"center",valign:"middle"});
g+=T(0.7,6.85,12,0.4,"Presented by  Nooha Iflal",{fs:14,color:CREAM,align:"center"});
slides.push(g);

// S2
g=rect(0,0,13.333,7.5,LIGHT);
g+=T(0.7,0.55,8,0.35,"01 · VISUAL PSYCHOLOGY",{fs:13,bold:1,color:ORANGE});
g+=T(0.65,0.9,12,0.9,"Your Eyes Choose First",{fs:40,bold:1,color:"#2C2420"});
function comp(x,letter,name,cap,badge){const w=5.75,y=2.15,h=3.55;
  g+=rect(x,y,w,h,"#FFFFFF",0.18,"#E6DBCB",1);
  g+=ell(x+0.25,y+0.25,0.7,0.7,badge)+T(x+0.25,y+0.25,0.7,0.7,letter,{fs:26,bold:1,color:"#fff",align:"center",valign:"middle"});
  g+=img(name,x+w/2-1.55,y+0.35,3.1,3.1);
  g+=T(x+0.2,y+h-0.72,w-0.4,0.55,cap,{fs:15,italic:1,color:"#6B5D4F",align:"center"});}
comp(0.7,"A","burgerPlain","Same burger. A quick, plain snapshot.",DIM);
comp(6.88,"B","burgerDeluxe","Same burger. Styled, stacked, lit.",ORANGE);
g+=T(0.7,5.9,12,0.5,"Which one looks tastier?",{fs:24,bold:1,color:"#2C2420",align:"center"});
const flow=[["SEE",GREEN],["EXPECT",ORANGE],["CHOOSE",RED]];let fx=3.2;
flow.forEach(([t,c],i)=>{g+=rect(fx,6.55,1.85,0.6,c,0.3)+T(fx,6.55,1.85,0.6,t,{fs:15,bold:1,color:"#fff",align:"center",valign:"middle"});if(i<2)g+=T(fx+1.85,6.55,0.55,0.6,"→",{fs:22,bold:1,color:"#2C2420",align:"center",valign:"middle"});fx+=2.4;});
slides.push(g);

// S3
g=rect(0,0,13.333,7.5,BG)+ell(-1.8,5.4,3.8,3.8,PANEL);
g+=T(0.7,0.55,8,0.35,"02 · THE WORDS ON THE PAGE",{fs:13,bold:1,color:ORANGE});
g+=T(0.65,0.9,12.1,0.9,"The Menu Is Playing Tricks On You",{fs:38,bold:1,color:CREAM});
g+=T(0.7,2.35,5.4,0.5,"Same food. Different words.",{fs:22,bold:1,color:GOLD});
g+=T(0.7,2.95,5.4,0.4,"Restaurants choose how food is described,",{fs:16,color:MUTED});
g+=T(0.7,3.25,5.4,0.4,"where it sits, and how the price is shown.",{fs:16,color:MUTED});
g+=T(0.7,3.55,5.4,0.4,"Those choices quietly steer what you order.",{fs:16,color:MUTED});
g+=rect(0.7,4.75,5.4,1.55,PANEL,0.14);
g+=T(0.95,4.95,5.0,0.5,"We don't just read menus.",{fs:20,bold:1,color:CREAM});
g+=T(0.95,5.45,5.0,0.7,"We react to them.",{fs:30,bold:1,color:ORANGE});
const mx=6.85,mw=5.75;
g+=rect(mx,1.95,mw,4.9,"#17120F",0.16,GOLD,1.25);
g+=T(mx,2.25,mw,0.45,"TODAY'S SPECIAL",{fs:20,bold:1,color:GOLD,align:"center"});
g+=img("burgerDeluxe",mx+mw/2-0.75,2.6,1.5,1.5);
g+=T(mx+0.35,4.25,mw-1.4,0.35,"The Classic Burger",{fs:16,bold:1,color:CREAM})+T(mx+mw-1.15,4.25,0.85,0.35,"$12",{fs:16,bold:1,color:CREAM,align:"right"});
g+=T(mx+0.35,4.72,mw-1.4,0.35,"Chef's Signature Beef Burger",{fs:17,bold:1,color:ORANGE})+T(mx+mw-1.15,4.72,0.85,0.35,"$15",{fs:16,bold:1,color:ORANGE,align:"right"});
g+=T(mx+0.35,5.04,mw-0.7,0.5,"fire-grilled · caramelised onions · house sauce",{fs:11.5,italic:1,color:ORANGESOFT});
g+=T(mx+0.35,5.72,mw-1.4,0.35,"Fries",{fs:16,bold:1,color:CREAM})+T(mx+mw-1.15,5.72,0.85,0.35,"$5",{fs:16,bold:1,color:CREAM,align:"right"});
g+=rect(mx+0.55,6.32,mw-1.1,0.42,ORANGE,0.21)+T(mx+0.55,6.32,mw-1.1,0.42,"Which one would you order?",{fs:14,bold:1,color:"#17120F",align:"center",valign:"middle"});
slides.push(g);

// S4
g=rect(0,0,13.333,7.5,LIGHT);
g+=T(0.7,0.55,8,0.35,"03 · MEMORY & EMOTION",{fs:13,bold:1,color:ORANGE});
g+=T(0.65,0.9,12,0.9,"Food Is Connected To Memories",{fs:40,bold:1,color:"#2C2420"});
g+=T(0.7,1.85,12,0.5,"Hunger isn't the whole story. Some foods carry a place, a person, a moment.",{fs:17,italic:1,color:"#6B5D4F"});
const d4=2.4,y4=2.7,x4=[0.9,4.05,7.2,10.35],mem=[["cookingPot","HOME COOKING"],["birthdayCake","BIRTHDAY CAKE"],["stewBowl","FAMILY MEAL"],["coffeeCup","TEA & COFFEE"]];
mem.forEach(([n,l],i)=>{g+=ell(x4[i]-0.05,y4-0.05,d4+0.1,d4+0.1,"#FFFFFF","#E6DBCB",1)+img(n,x4[i],y4,d4,d4)+T(x4[i]-0.35,y4+d4+0.02,d4+0.7,0.35,l,{fs:13.5,bold:1,color:"#2C2420",align:"center"});});
g+=T(0.7,6.05,12,0.6,"What food takes you back?",{fs:30,bold:1,color:"#2C2420",align:"center"});
g+=T(0.7,6.7,12,0.4,"That's one reason we don't all choose the same way — our memories choose with us.",{fs:15,italic:1,color:"#6B5D4F",align:"center"});
slides.push(g);

// S5
g=rect(0,0,13.333,7.5,BG)+ell(10.8,-1.7,4,4,PANEL);
g+=T(0.7,0.55,8,0.35,"04 · BRINGING IT TOGETHER",{fs:13,bold:1,color:ORANGE});
g+=T(0.65,0.9,12.1,0.9,"So… Who Is Actually Choosing?",{fs:40,bold:1,color:CREAM});
const steps=[["See","colour & plating",GREEN],["Expect","before we taste",ORANGESOFT],["Remember","people & moments",RED],["Read","words & prices",GOLD]];
const swd=2.75,sy=2.35,sh=1.7;let sx=0.7;
steps.forEach(([t,d,c],i)=>{g+=rect(sx,sy,swd,sh,PANEL,0.14)+ell(sx+swd/2-0.28,sy+0.28,0.56,0.56,c)+T(sx+swd/2-0.28,sy+0.28,0.56,0.56,String(i+1),{fs:18,bold:1,color:"#201A17",align:"center",valign:"middle"})+T(sx,sy+0.92,swd,0.4,t,{fs:20,bold:1,color:CREAM,align:"center"})+T(sx,sy+1.3,swd,0.35,d,{fs:12.5,italic:1,color:MUTED,align:"center"});if(i<3)g+=T(sx+swd,sy,0.4,sh,"+",{fs:26,bold:1,color:ORANGE,align:"center",valign:"middle"});sx+=swd+0.4;});
g+=T(0.7,4.15,11.95,0.5,"↓",{fs:26,bold:1,color:ORANGE,align:"center"});
g+=rect(2.4,4.65,8.55,1.05,ORANGE,0.12)+T(2.4,4.65,8.55,1.05,"WHAT WE CHOOSE",{fs:30,bold:1,color:"#201A17",align:"center",valign:"middle"});
g+=T(0.7,5.95,11.95,0.6,"Do we choose food… or does food influence our choices?",{fs:21,bold:1,color:CREAM,align:"center"});
g+=T(0.7,6.7,11.95,0.4,"Thank you.  —  So… what are you craving right now?",{fs:15,italic:1,color:DIM,align:"center"});
slides.push(g);

(async()=>{
  const comps=[];
  for(let i=0;i<slides.length;i++){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${slides[i]}</svg>`;
    const buf=await sharp(Buffer.from(svg)).png().toBuffer();
    comps.push({input:buf,left:0,top:i*(H+16)});
  }
  await sharp({create:{width:W,height:slides.length*(H+16),channels:3,background:"#555"}}).composite(comps).jpeg({quality:86}).toFile("preview_all.jpg");
  for(let i=0;i<slides.length;i++){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${slides[i]}</svg>`;
    await sharp(Buffer.from(svg)).jpeg({quality:88}).toFile(`preview_s${i+1}.jpg`);
  }
  console.log("preview written");
})();
