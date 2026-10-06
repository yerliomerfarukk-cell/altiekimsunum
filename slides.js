/* =====================================================================
   SUNUM İÇERİĞİ — sunumu değiştirmek için yalnızca bu dosyaya dokunun.
   Sayfa eklemek = SLIDES dizisine yeni bir nesne eklemek. Sıra = sunum sırası.

   ORTAK ALANLAR (her sayfada)
     type        : "cover" | "section" | "statement" | "media" | "list" | "reversed"
                   | "recipe" | "tip" | "instagram" | "closing"
     world       : "dark" (siyah zemin) | "light" (beyaz zemin). "reversed" ikisini de taşır.
     section     : üst satırdaki bölüm etiketi. Yazılmazsa bir önceki sayfanınki sürer;
                   "section" tipindeki sayfa etiketi kendisi üretir ("01 — Medya").
     title       : üst satırın sağındaki sayfa başlığı
     notes       : konuşmacı notları (sunucu görünümünde, N tuşu)
     nature      : "bonsai" → çam dalı yerine sağ altta bonsai (reversed sayfada yalnızca B tarafında)
     silhouettes : hazır yerleşim (preset) ya da elle yerleşim
                     "crowd"             alt çizgi boyunca çok sayıda küçük figür
                     "solo:<dosya>"      sağda tek büyük figür
                     "pair:<d1>,<d2>"    sağda karşılıklı iki büyük figür
                     "none"              silüet yok
                   Reversed sayfada A tarafı hep "crowd" (beyaz); yazılan preset B tarafına (siyah) gider.
                   Dosya adı assets/silhouettes/ içinde yoksa en yakın dosya kullanılır
                   (eşleştirme tablosu: index.html → CONFIG.silhouettes.alias).
                   Yan profil figürleri çevirmek için nesne biçimi (flip:true figürü yatay çevirir):
                     { preset: "pair", figures: ["suit-man", { src: "student-backpack", flip: true }] }
                   Elle yerleşim: [{ src, x, y, scale, layer:"white"|"black", flip }]
                   (+ isteğe bağlı crowds:[…], horizons:[…])

   MEDYA  — "dosya.jpg" ya da { src, caption, portrait }
     Uzantı .mp4/.webm/.mov ise video sayılır. Dikey videolar kendiliğinden telefon çerçevesine girer.
     Tüm medya gri tonludur (renkli için: index.html → CONFIG.mediaColor = true).

   TİPE ÖZEL ALANLAR
     cover     : kicker, title, subtitle
     section   : number (yazılmazsa sırayla 01, 02…), name, intro
     statement : kicker, text ("\n" yeni satır), sub, big (tek büyük sözcük), ring (ortada dönen yüzük),
                 lineDelay (sn; ikinci satır bu kadar geç gelir)
     media     : kicker, heading, sub, lines:[…], stepwise (true → satırlar tek tek), media, caption
     list      : heading, sub, items:["…" | { title, detail }], stepwise (false → hepsi birden),
                 columns:2, chain:true (oklu zincir), footer (son maddeden sonra beliren mono satır)
     reversed  : worldA / worldB → { label, title, subtitle, points, stat, quote, dialog:[2 satır], media, stepwise }
                 (media yalnızca worldA'da; stepwise yalnızca worldB'de: maddeler tek tek açılır)
     recipe    : heading (solda 90° döndürülmüş tek satır başlık), meta:[…], steps:["…" | { title, detail }]
     tip       : heading, text, quote, media:[1-2 öğe], effect:"jumpcut"
     instagram : heading, text  (telefon ekranı: assets/instagram/profile-1 ve varsa profile-2 ekran görüntüleri;
                 ayarlar: index.html → CONFIG.instagram; QR: assets/instagram/qr.svg)
     closing   : text, sub
   ===================================================================== */
window.SLIDES = [

  /* ============================== 00 — GİRİŞ ============================== */
  { /* 1 */
    type: 'cover', world: 'dark', section: '00 — Giriş', title: 'Medya ve İletişim',
    kicker: 'DinamİK · 6 Ekim', subtitle: 'Kalabalığa konuşmak, bir kişiye konuşmak.',
    silhouettes: 'solo:walker-phone',
    notes: 'Hoş geldiniz.'
  },
  { /* 2 */
    type: 'statement', world: 'dark', title: 'Nasıl izlenir', ring: true,
    text: 'Bu yüzüğü gördüğünüzde\ndünya tersine döner.',
    sub: 'Siyah: kitleye konuşmak. Beyaz: bir kişiye konuşmak.',
    silhouettes: 'none',
    notes: 'Sunumun dilini anlat: aynı kavram, iki dünya.'
  },

  /* ============================== 01 — MEDYA ============================== */
  { /* 3 */
    type: 'section', world: 'dark', number: '01', name: 'Medya', intro: 'Medya nedir, bize ne yapar?',
    silhouettes: 'crowd'
  },
  { /* 4 */
    type: 'list', world: 'dark', title: 'Geleneksel medya',
    heading: 'Geleneksel medya',
    sub: 'İçeriğin profesyonel kuruluşlarca üretilip tek merkezden geniş kitlelere dağıtıldığı yapı.',
    items: ['Gazete', 'Dergi', 'Radyo', 'Televizyon'],
    silhouettes: 'crowd'
  },
  { /* 5 */
    type: 'media', world: 'dark', title: 'Kennedy – Nixon',
    kicker: '1960', heading: 'Aynı tartışma, iki farklı kazanan',
    lines: [
      'ABD\'nin ilk televizyonlu başkanlık tartışması.',
      'Yaygın anlatıya göre radyodan dinleyenler Nixon\'ı, ekrandan izleyenler Kennedy\'yi daha başarılı buldu.'
    ],
    media: 'assets/media/kennedy-nixon.jpeg', caption: 'Kennedy – Nixon · 26 Eylül 1960',
    silhouettes: 'none',
    notes: 'Radyo-TV farkı anlatısı tartışmalıdır; "yaygın anlatı" vurgusu bilerek konuldu. Kennedy\'nin makyajlı, rahat; Nixon\'ın solgun ve terli görünüşünden bahset.'
  },
  { /* 6 */
    type: 'statement', world: 'dark', title: 'Algı',
    text: 'Televizyon medyaya\nbir şey daha ekledi: algı.',
    silhouettes: 'none'
  },
  { /* 7 */
    type: 'reversed', title: 'Algı',
    worldA: { label: 'Kitle İletişimi', title: 'Algı', subtitle: 'İzleyici içerikten önce görüntüyü okur.',
      points: ['Görünüş', 'Ses tonu', 'Kamera önündeki rahatlık'] },
    worldB: { label: 'Birebir İletişim', title: 'Algı', subtitle: 'Karşındaki ne söylediğinden önce nasıl söylediğini fark eder.',
      points: ['Duruş', 'Göz teması', 'Ses tonu'] },
    silhouettes: 'pair:suit-man,suit-woman',
    notes: 'Kennedy dersinin birebir hayattaki karşılığı: ilk izlenim.'
  },
  { /* 8 */
    type: 'statement', world: 'light', title: 'Bugün',
    text: 'Bugün bu algı\nnasıl sağlanıyor?',
    silhouettes: 'none'
  },
  { /* 9 */
    type: 'list', world: 'dark', title: 'Yeni medya',
    heading: 'Yeni medya',
    sub: 'Dijital medya: herkesin hem izleyici hem yayıncı olduğu yapı.',
    items: ['Sosyal medya', 'X (Twitter)', 'Dijital yayıncılık'],
    silhouettes: 'crowd'
  },
  { /* 10 */
    type: 'media', world: 'dark', title: 'If you fall',
    kicker: '2013 Oscar', heading: 'If you fall,\nfall in Dior.',
    lines: [
      'Jennifer Lawrence ödülünü almaya giderken merdivenlerde düştü.',
      'O an dünyanın konuştuğu bir görüntüye dönüştü; elbisenin markası da.',
      'Markalar kırmızı halıyı ve ünlüyü bir medya aracı olarak kullanıyor.'
    ],
    media: 'assets/media/dior.jpeg', caption: '85. Akademi Ödülleri · 2013',
    silhouettes: 'none',
    notes: 'Bu sahneye 3. bölümün sonunda "Düştüğünde" sayfasında geri döneceğiz.'
  },
  { /* 11 */
    type: 'list', world: 'dark', title: 'Dijital platformlar',
    heading: 'Diğer dijital platformlar',
    items: ['Netflix', 'Podcast\'ler', 'Bloglar', 'Haber siteleri'],
    silhouettes: 'crowd'
  },
  { /* 12 */
    type: 'list', world: 'light', title: 'Neden dijital?',
    heading: 'Dijital medya neden popülerleşti?',
    items: [
      { title: 'Hız', detail: 'Gazeteyi beklemeden, saniyeler içinde yayın.' },
      { title: 'Erişim', detail: 'Sadece İstanbul\'a değil, dünyanın her yerine.' },
      { title: 'Üretici olabilme', detail: 'Eskiden stüdyo gerekiyordu, şimdi bir telefon yeter.' },
      { title: 'Kişiselleştirme', detail: 'Televizyon herkese aynı şeyi gösterir; dijital platform sana seni gösterir.' }
    ],
    silhouettes: 'solo:student-backpack'
  },
  { /* 13 */
    type: 'statement', world: 'dark', title: 'İnsan',
    text: 'Peki insan üzerindeki\netkisi ne?',
    silhouettes: 'none'
  },
  { /* 14 */
    type: 'list', world: 'dark', title: 'Dikkat',
    heading: 'Dikkat',
    sub: 'Dijital medya dikkatimizi yakalamak için tasarlanıyor.',
    items: ['Bildirim → merak', 'Kısa video → hızlı ödül', 'Scroll → bir sonraki ne?'],
    footer: 'Bu yüzden içerikler kısa, hızlı ve çarpıcı.',
    silhouettes: 'crowd'
  },
  { /* 15 */
    type: 'statement', world: 'dark', title: 'Algı', big: true,
    text: 'Algı', sub: 'Gördüğümüz, düşündüğümüzü şekillendirir.',
    silhouettes: 'none',
    notes: 'Algıyla ilgili kendi örneğini burada anlat.'
  },
  { /* 16 */
    type: 'list', world: 'light', title: 'Davranış',
    heading: 'Davranış',
    sub: 'Dijital medya artık ne yapacağımızı da etkiliyor.',
    items: [
      'Bir influencer önerisi → ürün araştırması',
      'Bir TikTok videosu → mekâna gitmek',
      'Bir viral haber → gündemi takip etmek',
      'Bir trend → milyonlarca kişinin aynı şeyi yapması'
    ],
    silhouettes: 'pair:student-books,walker-phone'
  },
  { /* 17 */
    type: 'statement', world: 'dark', title: 'Sinema',
    text: 'Bir ülkeyi hiç ziyaret etmeden\no ülke hakkında bir fikrimiz olabilir mi?',
    silhouettes: 'none',
    notes: 'Cevabı salona sor.'
  },
  { /* 18 */
    type: 'media', world: 'dark', title: 'Soğuk Savaş',
    kicker: 'Sinema ve algı', heading: 'Hollywood ve Soğuk Savaş',
    lines: [
      'Rocky IV\'te ringdeki rakip bir Sovyet boksördü.',
      'Hollywood, Amerikan kahramanını tüm dünyaya izletti.',
      'ABD Savunma Bakanlığı, ordunun olumlu gösterildiği yapımlara ekipman ve danışmanlık desteği veriyor.'
    ],
    media: 'assets/media/rocky.jpeg', caption: 'Rocky serisi',
    silhouettes: 'none',
    notes: 'Marvel ve Top Gun gibi yapımlara verilen destekten bahset.'
  },
  { /* 19 */
    type: 'statement', world: 'light', title: 'Eskiden, şimdi', lineDelay: 1.7,
    text: 'Eskiden Hollywood.\nŞimdi Netflix.',
    silhouettes: 'none',
    notes: 'Hollywood bir ülkeyi nasıl gösteriyorsa dünya o ülkeyi öyle tanıyordu; küresel platformlar bu tekeli kırdı.'
  },
  { /* 20 */
    type: 'media', world: 'dark', title: 'Squid Game',
    kicker: 'Örnek', heading: 'Squid Game', sub: 'İzleyen birinde merak uyanıyor:',
    stepwise: true,
    lines: [
      'Kore\'deki sınıf farkları',
      'Ekonomik baskı ve çalışma hayatı',
      'Kore kültürü, dili ve yemekleri',
      'Şehirler ve yaşam tarzı'
    ],
    media: 'assets/media/squid-game.jpeg', caption: 'Squid Game · Netflix · 2021',
    silhouettes: 'none'
  },
  { /* 21 */
    type: 'statement', world: 'dark', title: 'Prodüksiyon',
    text: 'Peki izlediğimiz bu hikâyeler\nnasıl ortaya çıkıyor?',
    silhouettes: 'none'
  },
  { /* 22 */
    type: 'list', world: 'light', title: 'Prodüksiyon',
    heading: 'Prodüksiyon',
    sub: 'Bir fikrin ekranda izlediğimiz içeriğe dönüşme sürecinin tamamı.',
    columns: 2,
    items: ['Senaristler', 'Yönetmen', 'Oyuncular', 'Işık ekibi', 'Ses ekibi', 'Kostüm', 'VFX ve CGI'],
    silhouettes: 'pair:academic-woman,suit-man'
  },
  { /* 23 */
    type: 'media', world: 'dark', title: 'VFX / CGI',
    kicker: 'Kamera arkası', heading: 'The Odyssey',
    lines: [
      'CGI: Gerçekte çekilmesi zor olanın bilgisayarda yaratılması.',
      'Girdap sahnesi ve jet skiler: CGI.',
      'Ama her şey CGI değil: domuz sahnesinde hareket ettirilebilen mekanik parçalar kullanıldı.'
    ],
    media: 'assets/media/odyssey-bts.jpeg', caption: 'The Odyssey · Kamera arkası',
    silhouettes: 'none'
  },
  { /* 24 */
    type: 'list', world: 'dark', title: 'PR Event',
    heading: 'PR Event',
    sub: 'Bir markanın doğrudan reklam yerine deneyim ve haber değeriyle görünür olması.',
    chain: true,
    items: ['1 etkinlik', 'yüzlerce içerik', 'milyonlarca kişiye erişim'],
    silhouettes: 'crowd'
  },
  { /* 25 */
    type: 'statement', world: 'light', title: 'Neden creator?',
    text: '5 milyon takipçili tek bir marka hesabı mı,\ninsanların güvendiği 20 farklı creator mı?',
    silhouettes: 'none',
    notes: 'Influencer artık takipçi sayısı değil, güven demek.'
  },
  { /* 26 */
    type: 'media', world: 'dark', title: 'Range Rover House',
    kicker: 'Örnek', heading: 'Range Rover House Bodrum',
    lines: [
      'Gastronomi, sanat, yoga ve lüks yaşam deneyimleri.',
      'Gucci, Chanel ve Tiffany & Co. gibi markalarla iş birlikleri.',
      'Her odada bir markanın mücevher sergisi.'
    ],
    media: 'assets/media/range-rover-house.jpeg', caption: 'Range Rover House · Bodrum',
    silhouettes: 'none'
  },

  /* ========================== 02 — FİKİRDEN FEED'E ========================== */
  { /* 27 */
    type: 'section', world: 'dark', number: '02', name: 'Fikirden Feed\'e', intro: 'Bir içerik nasıl doğar?',
    silhouettes: 'crowd'
  },
  { /* 28 */
    type: 'instagram', world: 'light', title: 'DinamİK Dijital 360',
    heading: 'DinamİK\nDijital', text: '360° medya: fikirden ekrana her şey.',
    silhouettes: 'none'
  },
  { /* 29 */
    type: 'recipe', world: 'light', title: 'Tarif',
    heading: 'Fikirden Feed\'e',
    steps: [
      'Aklında bir fikir mi var? Getir!',
      'Fikri editör ekibi olarak inceleyip birlikte geliştiriyoruz.',
      'İçeriğin metnini ve storyboard\'unu oluşturuyoruz.',
      'Kamera arkası ve önü ekibini, detayları ve çekim gününü belirliyoruz.',
      'Çekimden sonra editoryal süreci tamamlıyoruz.',
      'Ve içerik paylaşılmaya hazır!'
    ],
    silhouettes: 'none'
  },
  { /* 30 */
    type: 'statement', world: 'dark', title: 'Püf noktaları',
    text: 'İçerik üretiminin\npüf noktaları',
    silhouettes: 'none'
  },
  { /* 31 */
    type: 'tip', world: 'dark', title: 'Hook',
    heading: 'Hook — İlk 3 saniye', text: 'İnsan neden kaydırmayı bırakıp seni izlesin?',
    media: ['assets/media/hookwitty.jpeg', 'assets/media/hook3levelss.jpeg'],
    silhouettes: 'none',
    notes: 'Kalıp hook\'lar: "What if I told you", "3 levels of".'
  },
  { /* 32 */
    type: 'tip', world: 'dark', title: 'Görsel hook',
    heading: 'Görsel hook', text: 'Söz daha bitmeden göz kararını verir: ilk kare, ilk cümleden önce gelir.',
    media: [{ src: 'assets/media/hookvideo1.mp4', portrait: true }],
    silhouettes: 'none'
  },
  { /* 33 */
    type: 'reversed', title: 'Hook',
    worldA: { title: 'Hook', subtitle: 'Kaydırmayı durduran ilk an.',
      points: ['İlk 3 saniye', 'Scroll durdurma', 'Merak boşluğu'] },
    worldB: { title: 'Hook', subtitle: 'Karşındakinin dikkatini kazandığın ilk an.',
      points: ['İlk izlenim', 'İlk cümle', 'Göz teması'],
      dialog: ['— Bugün başıma çok garip bir şey geldi!', '— Ne oldu??'] },
    silhouettes: 'pair:student-backpack,student-books',
    notes: 'Günlük konuşmada da hep hook kullanıyoruz.'
  },
  { /* 34 */
    type: 'tip', world: 'dark', title: 'Curiosity Gap',
    heading: 'Curiosity Gap — Merak boşluğu', text: 'Cevabı hemen vermek yerine izleyicide bir soru oluşturmak.',
    silhouettes: 'crowd'
  },
  { /* 35 */
    type: 'reversed', title: 'Merak boşluğu',
    worldA: { title: 'Curiosity Gap', subtitle: 'Soru, cevaptan önce gelir.',
      points: ['Cevabı sona sakla', 'Soruyu ilk saniyede sor', 'Sözünü sonunda tut'] },
    worldB: { title: 'Merak boşluğu', subtitle: 'Bir şeyi merak ettirmek, onu anlatmaktan önce gelir.',
      dialog: ['— Dün aldığım haberden sonra tüm planlarımı değiştirdim..', '— Ne haberi??'] },
    silhouettes: 'pair:suit-woman,suit-man'
  },
  { /* 36 */
    type: 'tip', world: 'dark', title: 'Relatability',
    heading: 'Relatability — "Bu tam ben!"', text: 'İzleyicinin kendini içerikte bulması.',
    media: [
      { src: 'assets/media/relatabilitiy.mp4', portrait: true },
      { src: 'assets/media/relatabilitity 2.mp4', portrait: true }
    ],
    silhouettes: 'none'
  },
  { /* 37 */
    type: 'reversed', title: 'Relatability',
    worldA: { title: 'Relatability', subtitle: 'İzleyici kendini görürse kalır.',
      points: ['Ortak dert', 'Tanıdık an', 'Paylaşılan duygu'] },
    worldB: { title: 'Ortak nokta', subtitle: '"Ben de aynısını yaşıyorum" hissi.',
      dialog: ['— Sınava 2 gün kala bizim rahatlık..', '— Aynen, ben de hiç başlamadım.'] },
    silhouettes: 'pair:student-backpack,student-books'
  },
  { /* 38 */
    type: 'tip', world: 'dark', title: 'B-Roll',
    heading: 'B-Roll — Seyir zevki', text: 'Ana konuşmayı destekleyen, üzerine eklenen görüntüler.',
    media: [{ src: 'assets/media/broll.mp4', portrait: true }],
    silhouettes: 'none'
  },
  { /* 39 */
    type: 'reversed', title: 'B-Roll',
    worldA: { title: 'B-Roll', subtitle: 'Söylediğini göster.',
      points: ['Yakın plan detaylar', 'Mekân görüntüleri', 'Konuyu destekleyen kareler'] },
    worldB: { title: 'Beden dili', subtitle: 'Konuşmanın görüntüsü sensin.',
      points: ['El hareketleri', 'Yüz ifadesi', 'Ses tonu'] },
    silhouettes: 'solo:academic-woman'
  },
  { /* 40 */
    type: 'tip', world: 'dark', title: 'Jump Cut', effect: 'jumpcut',
    heading: 'Cut / Jump Cut', text: '"Ne kadar akıcı konuştu ya!" — ritmi artırmak için yapılan kesmeler.',
    silhouettes: 'none'
  },
  { /* 41 */
    type: 'reversed', title: 'Jump Cut',
    worldA: { title: 'Jump Cut', subtitle: 'Boşlukları kes, ritmi koru.',
      points: ['Duraksamaları at', 'Tekrarları at', 'Her saniye bir şey söylesin'] },
    worldB: { title: 'Sözü uzatmamak', subtitle: 'Konuya gir, karşındakinin zamanına saygı göster.',
      points: ['Net ol', 'Kısa tut', 'Dinlemeye yer bırak'] },
    silhouettes: 'pair:suit-man,academic-man'
  },
  { /* 42 */
    type: 'tip', world: 'dark', title: 'CTA',
    heading: 'CTA — Call to Action', text: 'İzleyiciye ne yapmasını söylediğimiz bölüm.',
    quote: '"Sen olsan ne yapardın? Yorumlara yaz!"',
    silhouettes: 'crowd'
  },
  { /* 43 */
    type: 'reversed', title: 'CTA',
    worldA: { title: 'CTA', subtitle: 'İzleyiciye bir sonraki adımı ver.',
      points: ['Yorum yap', 'Kaydet', 'Paylaş'] },
    worldB: { title: 'Net bir sonraki adım', subtitle: 'Konuşmayı bir planla bitir.',
      dialog: ['— Haftaya bir kahve içelim mi?', '— Olur, salı uygun.'] },
    silhouettes: 'pair:suit-woman,suit-man'
  },

  /* ======================== 03 — İLETİŞİMİ SÜRDÜRMEK ======================== */
  { /* 44 */
    type: 'section', world: 'dark', number: '03', name: 'İletişimi sürdürmek',
    intro: 'Dikkat kazanmak bir an sürer. Güven kazanmak yıllar.',
    silhouettes: 'crowd'
  },
  { /* 45 */
    type: 'statement', world: 'light', title: 'Bonsai', nature: 'bonsai',
    text: 'Bonsai bir gecede büyümez.', sub: 'Network de kitle de az ama düzenli bakımla yaşar.',
    silhouettes: 'none'
  },
  { /* 46 */
    type: 'reversed', title: 'Tutarlılık',
    worldA: { title: 'Tutarlılık', subtitle: 'Kitle, ne bekleyeceğini bildiği hesaba bağlanır.',
      points: ['Belirli bir ritim', 'Tanınan bir ton', 'Tanınan bir görsel kimlik'] },
    worldB: { title: 'Tutarlılık', subtitle: 'Güven, tutarlılıktan doğar.',
      points: ['Söylediğini yapmak', 'Her ortamda aynı insan olmak', 'Sözünde durmak'] },
    silhouettes: 'solo:suit-man'
  },
  { /* 47 */
    type: 'reversed', title: 'Sadık kitle',
    worldA: { title: 'Sadık kitle', subtitle: 'İzleyiciden topluluğa.',
      points: ['1.000 gerçek hayran, ilgisiz bir milyondan değerlidir. (Kevin Kelly)',
        'Her içerik bir şey bıraksın: bilgi, kahkaha ya da duygu.'] },
    worldB: { title: 'Gerçek ilişki', subtitle: 'Herkesle tanışmak değil, tanıştığın insanın seni hatırlaması.',
      points: ['Az ama gerçek', 'Derin ama sakin'] },
    silhouettes: 'pair:student-books,academic-man'
  },
  { /* 48 */
    type: 'reversed', title: 'Konuşmak',
    worldA: { title: 'Kitleyle konuşmak', subtitle: 'Kitleye değil, kitleyle.',
      points: ['Yorumlara cevap ver', 'Soru sor, anket aç', 'Kitlenin fikrini içeriğe dönüştür', 'Kamera arkasını göster'] },
    worldB: { title: 'Aktif dinlemek', subtitle: 'İnsanlar en çok onları dinleyeni hatırlar.',
      points: ['Soru sor', 'Cevabı gerçekten dinle', 'Adını ve anlattığı bir detayı hatırla'] },
    silhouettes: 'pair:suit-woman,suit-man'
  },
  { /* 49 */
    type: 'reversed', title: 'Beklenti',
    worldA: { title: 'Beklentiyi karşılamak', subtitle: 'Kitlenin neden geldiğini bil ve o sözü tut.',
      points: ['Yorumlar, kaydetmeler ve izlenme süreleri konuşur', 'Veriyi dinle, kimliğini kaybetme'] },
    worldB: { title: 'Az söz, fazla iş', subtitle: 'Beklentiyi yönetmek, aşmaktan önce gelir.',
      points: ['Teslim tarihinden bir gün önce teslim et', 'Söylenmeyeni de düşün'] },
    silhouettes: 'solo:suit-woman'
  },
  { /* 50 */
    type: 'reversed', title: 'Yeni insanlar',
    worldA: { title: 'Yeni kitleye ulaşmak', subtitle: 'Köprüler kur.',
      points: ['Ortak ilgi alanında köprü içerikler', 'İş birlikleriyle başka bir kitleye misafir ol', 'Platformun diline uy, özünü koru'] },
    worldB: { title: 'Zayıf bağların gücü', subtitle: 'Yeni fırsatlar çoğu zaman uzak tanıdıklardan gelir. (Mark Granovetter)',
      points: ['Ortak tanıdıklar', 'Farklı kulüpler, farklı bölümler', 'Farklı etkinlikler'] },
    silhouettes: 'pair:student-backpack,academic-woman'
  },
  { /* 51 */
    type: 'reversed', title: 'Takip',
    worldA: { title: 'Takip', subtitle: 'Kitlede: takipçi kazanmak.',
      points: ['Göründüğün yer', 'Geri döndüğün ritim'] },
    worldB: { title: 'Takip', subtitle: 'Birebirde: takip etmek. Bir yöneticiyle tanıştın, sonra ne olacak?',
      stepwise: true,
      points: [
        '24-48 saat içinde kısa bir mesaj: nerede tanıştınız, ne konuştunuz, teşekkür.',
        'LinkedIn isteğini kişisel bir notla gönder.',
        'İstemeden önce ver: bir makale, bir tebrik, bir bağlantı.',
        'Birkaç ayda bir anlamlı bir temas.',
        'Bir şey isteyeceksen net sor: "15 dakikanız olur mu?"'
      ] },
    silhouettes: 'pair:suit-man,student-backpack',
    notes: 'Bölümün en önemli sayfası. "Takip"in iki anlamına vurgu yap.'
  },
  { /* 52 */
    type: 'reversed', title: 'Bonsai', nature: 'bonsai',
    worldA: { title: 'Topluluk yönetimi', subtitle: 'Seni büyüten insanları unutma.',
      points: ['Eski takipçilerin topluluğun çekirdeğidir', 'Yeni gelenleri karşıla'] },
    worldB: { title: 'Network\'ü korumak', subtitle: 'İlişki yalnızca ihtiyaç olduğunda hatırlanırsa kurur.',
      points: [
        'Karşılıklılık: ver ve al',
        'Dunbar sayısı: anlamlı ilişki sayımız ~150 civarı. Kime zaman ayıracağını seç.',
        'Bir kişi defteri: kim, nerede, ne konuştuk, son ne zaman?'
      ] },
    silhouettes: 'solo:academic-man'
  },
  { /* 53 */
    type: 'reversed', title: 'Düştüğünde',
    worldA: { title: 'Düştüğünde', subtitle: 'Kriz anında hızlı, açık ve sahiplenen bir dil.',
      points: ['Düşüşü saklamadı, gülerek sahiplendi. An, sevilen bir hikâyeye dönüştü.'],
      media: 'assets/media/dior.jpeg' },
    worldB: { title: 'Düştüğünde', subtitle: 'Hatanı kabul etmek ilişkiyi bitirmez, çoğu zaman güçlendirir.',
      quote: '"Haklısın, burada hata yaptım."' },
    silhouettes: 'solo:suit-woman',
    notes: 'Birinci bölümdeki Dior sahnesine geri dönüş.'
  },
  { /* 54 */
    type: 'closing', world: 'dark', title: 'Kapanış',
    text: 'Kitle dediğimiz şey, tek tek insanlardan oluşur.',
    sub: 'DinamİK · Teşekkürler',
    silhouettes: 'none'
  }
];
