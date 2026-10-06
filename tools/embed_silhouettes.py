"""assets/silhouettes/ ve assets/nature/ içindeki görselleri küçültüp embedded.js içine gömer.

Neden: index.html çift tıklanarak (file://) açıldığında tarayıcı, diskten
yüklenen görsellerin piksellerini okumaya izin vermez (tainted canvas).
data: URI olarak gömülen kopyalar bu kısıta takılmaz. Görsel ekleyip
değiştirdikten sonra yeniden çalıştırın:

    python tools/embed_silhouettes.py
"""
import base64
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIRS = ["assets/silhouettes", "assets/nature"]
OUT = ROOT / "assets" / "silhouettes" / "embedded.js"
MAX_H = 900
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

data, files = {}, {}
for d in DIRS:
    if not (ROOT / d).is_dir():
        continue
    for f in sorted((ROOT / d).iterdir()):
        if f.suffix.lower() not in EXTS:
            continue
        im = Image.open(f).convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im).convert("L")
        if im.height > MAX_H:
            im = im.resize((round(im.width * MAX_H / im.height), MAX_H), Image.LANCZOS)
        # JPEG gürültüsünü temizle: zemin tam beyaz, figür tam siyah, yalnızca kenarlar gri
        im = im.point(lambda v: 0 if v <= 70 else 255 if v >= 215 else round((v - 70) * 255 / 145))
        im = im.quantize(16)
        buf = io.BytesIO()
        im.save(buf, "PNG", optimize=True)
        data[f.stem] = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()
        files[f.stem] = f"{d}/{f.name}"
        print(f"{d}/{f.name:28s} {im.width}x{im.height}  {len(buf.getvalue()) / 1024:.1f} KB")

OUT.write_text(
    "/* tools/embed_silhouettes.py tarafından üretildi — elle düzenlemeyin */\n"
    "window.SILHOUETTE_FILES = " + json.dumps(files, indent=0) + ";\n"
    "window.SILHOUETTE_DATA = " + json.dumps(data, indent=0) + ";\n",
    encoding="utf-8",
)
print("->", OUT)
