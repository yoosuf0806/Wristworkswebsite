import io, sys
from pptx import Presentation
from pptx.util import Emu
from pptx.enum.shapes import MSO_SHAPE_TYPE
from PIL import Image, ImageDraw, ImageFont

SCALE = 100  # px per inch
prs = Presentation("Psychology_of_Food.pptx")
Wpx = int(Emu(prs.slide_width).inches * SCALE)
Hpx = int(Emu(prs.slide_height).inches * SCALE)
BG = {0:(30,17,9), 1:(250,240,225), 2:(150,60,30), 3:(216,160,90), 4:(30,17,9)}

def font(sz, bold=False):
    for name in (["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"] if bold else ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]):
        try: return ImageFont.truetype(name, max(8,int(sz)))
        except: pass
    return ImageFont.load_default()

def rgb(c):
    if c is None: return None
    try: return tuple(int(str(c)[i:i+2],16) for i in (0,2,4))
    except: return None

def rounded(dr, box, fill, rad=16):
    dr.rounded_rectangle(box, radius=rad, fill=fill)

for idx, slide in enumerate(prs.slides):
    # gradient-ish background
    base = BG.get(idx,(240,240,240))
    img = Image.new("RGB",(Wpx,Hpx), base)
    dr = ImageDraw.Draw(img,"RGBA")
    for sh in slide.shapes:
        try:
            x=int(Emu(sh.left).inches*SCALE); y=int(Emu(sh.top).inches*SCALE)
            w=int(Emu(sh.width).inches*SCALE); h=int(Emu(sh.height).inches*SCALE)
        except: continue
        if sh.shape_type==MSO_SHAPE_TYPE.PICTURE:
            try:
                pic=Image.open(io.BytesIO(sh.image.blob)).convert("RGBA")
                pic.thumbnail((w,h))
                img.paste(pic,(x+(w-pic.width)//2,y+(h-pic.height)//2),pic)
            except Exception as e: pass
            continue
        # fill
        fill=None
        try:
            if sh.fill.type is not None and sh.fill.fore_color and sh.fill.fore_color.rgb:
                fill=rgb(sh.fill.fore_color.rgb)
        except: pass
        if fill: rounded(dr,(x,y,x+w,y+h),fill,rad=14)
        # text
        if sh.has_text_frame:
            tf=sh.text_frame
            # gather text + first run size/color/bold + alignment
            txt="".join(r.text for para in tf.paragraphs for r in para.runs)
            if not txt.strip(): continue
            sz=18; col=(40,30,25); bold=False; align="l"
            for para in tf.paragraphs:
                if para.alignment is not None and str(para.alignment).startswith("CENTER"): align="c"
                for r in para.runs:
                    if r.font.size: sz=r.font.size.pt
                    if r.font.bold: bold=True
                    try:
                        if r.font.color and r.font.color.rgb: col=rgb(r.font.color.rgb) or col
                    except: pass
                    break
                break
            f=font(sz*SCALE/72.0, bold)
            tb=dr.textbbox((0,0),txt,font=f)
            tw=tb[2]-tb[0]; tx=x+(w-tw)//2 if align=="c" else x+4
            ty=y+max(0,(h-(tb[3]-tb[1]))//2) if h< sz*SCALE/72.0*2 else y+4
            dr.text((tx,ty),txt,fill=col,font=f)
    img.save(f"/tmp/qa_{idx+1}.png")
    print("rendered", idx+1)
print("done")
