"""Sunumun çevrimdışı çalışması için harici dosyaları indirir.

    python tools/build_vendor.py

Üretilenler
  assets/vendor/gsap.min.js      GSAP 3.12.5 (cdnjs)
  assets/vendor/qrcode.min.js    qrcode-generator 1.4.4 (cdnjs)
  assets/vendor/three-kit.js     Three.js r160 + kullanılan eklentiler, TEK klasik script olarak.
                                 (ES modülleri file:// ile açılan sayfada yüklenemez; bu yüzden modüller
                                 burada tek dosyada birleştirilir ve window.THREE_KIT olarak sunulur.)
  assets/fonts/*.woff2 + fonts.css   Google Fonts'taki yazı tipleri (latin + latin-ext)
"""
import hashlib
import posixpath
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VENDOR = ROOT / "assets" / "vendor"
FONTS = ROOT / "assets" / "fonts"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

THREE = "https://cdn.jsdelivr.net/npm/three@0.160.0/"
ADDONS = ["environments/RoomEnvironment.js", "postprocessing/EffectComposer.js", "postprocessing/RenderPass.js",
          "postprocessing/UnrealBloomPass.js", "postprocessing/OutputPass.js"]
KIT = ["RoomEnvironment", "EffectComposer", "RenderPass", "UnrealBloomPass", "OutputPass"]
FONT_CSS = ("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500"
            "&family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap")
SUBSETS = {"latin", "latin-ext"}          # Türkçe harfler latin-ext içinde


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data if isinstance(data, bytes) else data.encode("utf-8"))
    print(f"{path.relative_to(ROOT).as_posix():44s} {len(data) / 1024:8.1f} KB")


# ---------------------------------------------------------------- scriptler
save(VENDOR / "gsap.min.js", get("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"))
save(VENDOR / "qrcode.min.js", get("https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"))

# ---------------------------------------------------------------- three-kit
modules, order = {}, []
NAMES = r"\{([^}]*)\}"


def destructure(names):                    # "A as B, C"  ->  "A: B, C"
    return ", ".join(n.strip().replace(" as ", ": ") for n in names.split(",") if n.strip())


def load(path):
    """Eklentiyi ve göreli bağımlılıklarını indirir; her modülü dışa aktardıklarını döndüren bir işleve çevirir."""
    if path in modules:
        return
    modules[path] = None
    src = get(THREE + "examples/jsm/" + path).decode("utf-8")
    exports = []

    def rel(m):
        dep = posixpath.normpath(posixpath.join(posixpath.dirname(path), m.group(2)))
        load(dep)
        return f"const {{ {destructure(m.group(1))} }} = M['{dep}'];"

    src = re.sub(r"import\s*" + NAMES + r"\s*from\s*'three';", lambda m: f"const {{ {destructure(m.group(1))} }} = THREE;", src)
    src = re.sub(r"import\s*" + NAMES + r"\s*from\s*'(\.[^']+)';", rel, src)
    assert not re.search(r"^\s*import\s", src, re.M), f"çevrilemeyen import: {path}"

    def named(m):
        exports.extend(n.strip() for n in m.group(1).split(",") if n.strip())
        return ""

    def decl(m):
        exports.append(m.group(2))
        return f"{m.group(1)} {m.group(2)}"

    src = re.sub(r"export\s*" + NAMES + r"\s*;?", named, src)
    src = re.sub(r"export\s+(class|const|function)\s+(\w+)", decl, src)
    assert not re.search(r"^\s*export\s", src, re.M), f"çevrilemeyen export: {path}"
    modules[path] = f"M['{path}'] = (function () {{\n{src}\nreturn {{ {', '.join(exports)} }};\n}})();\n"
    order.append(path)


for a in ADDONS:
    load(a)
core = get(THREE + "build/three.cjs").decode("utf-8")
kit = ("/* Three.js r160 + eklentiler — tools/build_vendor.py tarafından birleştirildi; elle düzenlemeyin.\n"
       "   Three.js: MIT lisansı, https://threejs.org */\n"
       "(function () {\n"
       "const THREE = (function () { const exports = {}; const module = { exports };\n" + core + "\nreturn module.exports; })();\n"
       "const M = {};\n" + "".join(modules[p] for p in order) +
       "const all = Object.assign({}, ...Object.values(M));\n"
       "window.THREE_KIT = { THREE, " + ", ".join(f"{k}: all.{k}" for k in KIT) + " };\n"
       "})();\n")
save(VENDOR / "three-kit.js", kit)
print("   modüller:", ", ".join(order))

# ---------------------------------------------------------------- yazı tipleri
css, out, seen = get(FONT_CSS).decode("utf-8"), [], {}
for subset, block in re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})", css):
    if subset not in SUBSETS:
        continue
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    if url not in seen:
        style = re.search(r"font-style:\s*(\w+)", block).group(1)
        name = f"{family.lower().replace(' ', '-')}-{style}-{subset}-{hashlib.md5(url.encode()).hexdigest()[:6]}.woff2"
        save(FONTS / name, get(url))
        seen[url] = name
    out.append(f"/* {subset} */\n" + block.replace(url, seen[url]))
save(FONTS / "fonts.css", "/* tools/build_vendor.py tarafından üretildi */\n" + "\n".join(out) + "\n")
