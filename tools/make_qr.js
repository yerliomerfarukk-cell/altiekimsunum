/* Instagram sayfasındaki QR kodu üretir ve assets/instagram/qr.svg olarak kaydeder.
   Adres değişirse yeniden çalıştırın:

       node tools/make_qr.js                                   (varsayılan adres)
       node tools/make_qr.js https://www.instagram.com/baska/  (başka adres)

   QR her zaman beyaz üstüne siyahtır: ters renkli QR'ı çoğu kamera okumaz. */
const fs = require('fs');
const path = require('path');
const qrcode = require('../assets/vendor/qrcode.min.js');

const url = process.argv[2] || 'https://www.instagram.com/dinamikdigital/';
const q = qrcode(0, 'M'), m = 3;            // m: çevredeki boşluk (modül)
q.addData(url);
q.make();
const n = q.getModuleCount();
let d = '';
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + 2 * m} ${n + 2 * m}" shape-rendering="crispEdges">` +
  `<title>${url}</title><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>\n`;
const out = path.join(__dirname, '..', 'assets', 'instagram', 'qr.svg');
fs.writeFileSync(out, svg);
console.log(`${out}  ←  ${url}`);
