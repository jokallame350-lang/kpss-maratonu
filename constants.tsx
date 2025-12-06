import { Subject, Flashcard } from './types';

export const CURRICULUM: Subject[] = [
  {
    id: 'tarih',
    title: 'Tarih',
    icon: 'Scroll',
    color: 'bg-amber-100 text-amber-700',
    topics: [
      { id: 't1', title: 'İslamiyet Öncesi Türk Tarihi' },
      { id: 't2', title: 'İlk Türk-İslam Devletleri' },
      { id: 't3', title: 'Osmanlı Devleti Kuruluş ve Yükselme' },
      { id: 't4', title: 'Osmanlı Kültür ve Medeniyeti' },
      { id: 't5', title: 'XVII. - XX. Yüzyıl Osmanlı Tarihi' },
      { id: 't6', title: 'Kurtuluş Savaşı Hazırlık Dönemi' },
      { id: 't7', title: 'Kurtuluş Savaşı Muharebeler' },
      { id: 't8', title: 'Atatürk İlke ve İnkılapları' },
      { id: 't9', title: 'Çağdaş Türk ve Dünya Tarihi' },
    ]
  },
  {
    id: 'cografya',
    title: 'Coğrafya',
    icon: 'Map',
    color: 'bg-emerald-100 text-emerald-700',
    topics: [
      { id: 'c1', title: 'Türkiye\'nin Coğrafi Konumu' },
      { id: 'c2', title: 'Türkiye\'nin Yer Şekilleri' },
      { id: 'c3', title: 'Türkiye\'nin İklimi ve Bitki Örtüsü' },
      { id: 'c4', title: 'Türkiye\'de Nüfus ve Yerleşme' },
      { id: 'c5', title: 'Türkiye\'de Tarım ve Hayvancılık' },
      { id: 'c6', title: 'Türkiye\'de Madenler ve Enerji Kaynakları' },
      { id: 'c7', title: 'Türkiye\'de Sanayi, Ticaret ve Ulaşım' },
      { id: 'c8', title: 'Türkiye\'nin Coğrafi Bölgeleri' },
    ]
  },
  {
    id: 'vatandaslik',
    title: 'Vatandaşlık',
    icon: 'Scale',
    color: 'bg-indigo-100 text-indigo-700',
    topics: [
      { id: 'v1', title: 'Hukukun Temel Kavramları' },
      { id: 'v2', title: 'Türk Anayasa Tarihi' },
      { id: 'v3', title: '1982 Anayasası ve Temel İlkeler' },
      { id: 'v4', title: 'Yasama' },
      { id: 'v5', title: 'Yürütme' },
      { id: 'v6', title: 'Yargı' },
      { id: 'v7', title: 'İdare Hukuku' },
      { id: 'v8', title: 'Uluslararası Kuruluşlar' },
    ]
  },
  {
    id: 'turkce',
    title: 'Türkçe',
    icon: 'BookOpen',
    color: 'bg-rose-100 text-rose-700',
    topics: [
      { id: 'tr1', title: 'Sözcükte Anlam' },
      { id: 'tr2', title: 'Cümlede Anlam' },
      { id: 'tr3', title: 'Paragraf Bilgisi' },
      { id: 'tr4', title: 'Ses Bilgisi' },
      { id: 'tr5', title: 'Yazım Kuralları' },
      { id: 'tr6', title: 'Noktalama İşaretleri' },
      { id: 'tr7', title: 'Sözcük Yapısı ve Ekler' },
      { id: 'tr8', title: 'Cümlenin Ögeleri' },
      { id: 'tr9', title: 'Anlatım Bozuklukları' },
    ]
  },
  {
    id: 'matematik',
    title: 'Matematik',
    icon: 'Calculator',
    color: 'bg-blue-100 text-blue-700',
    topics: [
      { id: 'm1', title: 'Temel Kavramlar ve Sayılar' },
      { id: 'm2', title: 'Bölme, Bölünebilme, OBEB-OKEK' },
      { id: 'm3', title: 'Rasyonel ve Ondalık Sayılar' },
      { id: 'm4', title: 'Üslü ve Köklü Sayılar' },
      { id: 'm5', title: 'Problemler (Sayı, Kesir, Yaş, Hareket)' },
      { id: 'm6', title: 'Kümeler ve Fonksiyonlar' },
      { id: 'm7', title: 'Olasılık, Permütasyon, Kombinasyon' },
      { id: 'm8', title: 'Sayısal Mantık' },
    ]
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    subject: 'Tarih',
    question: 'Osmanlı Devleti\'nde ilk resmi gazete hangisidir?',
    answer: 'Takvim-i Vekayi (1831 - II. Mahmut)',
    detailTitle: 'Takvim-i Vekayi ve Osmanlı Basını',
    detailSummary: 'Osmanlı Devleti\'nin ilk resmi gazetesi olup devletin uygulamalarını halka duyurmak amacıyla çıkarılmıştır.',
    detailContent: `
      <p><strong>Takvim-i Vekayi</strong>, 1831 yılında II. Mahmut döneminde çıkarılmaya başlanan Osmanlı Devleti'nin ilk resmi gazetesidir. Temel amacı, devletin yaptığı ıslahatları ve aldığı kararları halka ve memurlara duyurarak kamuoyu oluşturmaktır.</p>
      <ul>
        <li>Haftalık olarak Türkçe, Arapça, Farsça, Rumca, Ermenice ve Fransızca dillerinde yayımlanmıştır.</li>
        <li>Sadece bir haber kaynağı değil, aynı zamanda devletin modernleşme çabalarının bir sembolüdür.</li>
        <li>Resmi ilanlar, atamalar ve padişah fermanları burada yayımlanırdı.</li>
      </ul>
      <p>Bu gazetenin çıkarılması, Osmanlı'da merkezi otoritenin güçlendirilmesi ve devlet ile halk arasındaki iletişimin modernleştirilmesi açısından kritik bir adımdır.</p>
    `
  },
  {
    id: 'f2',
    subject: 'Coğrafya',
    question: 'Türkiye\'nin en yüksek dağı hangisidir?',
    answer: 'Ağrı Dağı (5137 m)',
    detailTitle: 'Türkiye\'nin Çatısı: Ağrı Dağı',
    detailSummary: '5137 metre yüksekliğiyle Türkiye\'nin en yüksek noktası olan volkanik bir dağdır.',
    detailContent: `
      <p><strong>Ağrı Dağı</strong>, Türkiye'nin Doğu Anadolu Bölgesi'nde, Iğdır ve Ağrı illeri sınırında yer alan sönmüş bir volkanik dağdır.</p>
      <p>Özellikleri:</p>
      <ul>
        <li><strong>Yükseklik:</strong> 5137 metre ile Türkiye'nin ve Avrupa'nın en yüksek zirvelerinden biridir.</li>
        <li><strong>Oluşum:</strong> Volkanik kökenlidir (Strato-volkan).</li>
        <li><strong>Buzul:</strong> Zirvesinde Türkiye'nin en büyük takke buzulu bulunur.</li>
      </ul>
      <p>Ağrı Dağı, hem dağcılık turizmi açısından önemlidir hem de mitolojik (Nuh'un Gemisi efsanesi) bir değere sahiptir.</p>
    `
  },
  {
    id: 'f3',
    subject: 'Vatandaşlık',
    question: '1982 Anayasası\'na göre yasama yetkisi kime aittir?',
    answer: 'Türkiye Büyük Millet Meclisi (TBMM)',
    detailTitle: 'Yasama Yetkisi ve TBMM',
    detailSummary: 'Yasama yetkisi Türk Milleti adına TBMM\'ye aittir ve bu yetki devredilemez.',
    detailContent: `
      <p>Anayasa'nın 7. maddesine göre: <strong>"Yasama yetkisi Türk Milleti adına Türkiye Büyük Millet Meclisinindir. Bu yetki devredilemez."</strong></p>
      <p>Bu yetkinin özellikleri şunlardır:</p>
      <ul>
        <li><strong>Genellik:</strong> TBMM, Anayasa'ya aykırı olmamak şartıyla her konuda kanun çıkarabilir.</li>
        <li><strong>Aslilik (İlkellik):</strong> Araya başka bir işlem girmeden doğrudan konuyu düzenleyebilmesidir.</li>
        <li><strong>Devredilmezlik:</strong> Bu yetki başka bir organa (örneğin Cumhurbaşkanına veya mahkemelere) devredilemez.</li>
      </ul>
    `
  },
  {
    id: 'f4',
    subject: 'Tarih',
    question: 'Mustafa Kemal Atatürk\'ün Samsun\'a çıktığı tarih nedir?',
    answer: '19 Mayıs 1919',
    detailTitle: 'Milli Mücadelenin Başlangıcı: 19 Mayıs',
    detailSummary: 'Kurtuluş Savaşı\'nın fiilen başladığı tarih olarak kabul edilir.',
    detailContent: `
      <p>Mustafa Kemal Paşa, 9. Ordu Müfettişi sıfatıyla Bandırma Vapuru ile İstanbul'dan hareket etmiş ve 19 Mayıs 1919 sabahı Samsun'a ayak basmıştır.</p>
      <p><strong>Önemi:</strong></p>
      <ul>
        <li>Milli Mücadele'nin fiilen başladığı tarihtir.</li>
        <li>Mustafa Kemal, Samsun'a çıktıktan sonra "Samsun Raporu"nu yayımlamış, ardından Havza ve Amasya'ya geçerek direnişi örgütlemiştir.</li>
        <li>Bu tarih, daha sonra Atatürk tarafından "Doğum günüm" olarak nitelendirilmiş ve Gençlik ve Spor Bayramı olarak armağan edilmiştir.</li>
      </ul>
    `
  },
  {
    id: 'f5',
    subject: 'Türkçe',
    question: '"Burnundan solumak" deyiminin anlamı nedir?',
    answer: 'Çok sinirlenmek, öfkelenmek.',
    detailTitle: 'Deyimler Sözlüğü: Burnundan Solumak',
    detailSummary: 'Kişinin aşırı öfke halini betimleyen yaygın bir deyimdir.',
    detailContent: `
      <p><strong>Anlamı:</strong> Çok öfkelenmek, sinirden ne yapacağını bilememek, çok kızmak.</p>
      <p>İnsanlar sinirlendiklerinde nefes alışverişleri hızlanır ve sertleşir. Bu fiziksel tepkiden yola çıkarak "burnundan solumak" deyimi türetilmiştir. Genellikle kişinin konuşamayacak kadar sinirli olduğu anları ifade eder.</p>
      <p><em>Örnek:</em> "Sınavdan düşük not aldığını öğrenince burnundan solumaya başladı."</p>
    `
  },
  {
    id: 'f6',
    subject: 'Matematik',
    question: 'Bir üçgenin iç açıları toplamı kaç derecedir?',
    answer: '180 derece',
    detailTitle: 'Üçgenlerde Açılar',
    detailSummary: 'Öklid geometrisinde her türlü üçgenin iç açılarının toplamı sabittir ve 180 derecedir.',
    detailContent: `
      <p>Geometride temel bir kuraldır: Bir düzlem üzerindeki herhangi bir üçgenin iç açılarının toplamı daima <strong>180 derece</strong>dir.</p>
      <ul>
        <li>Eşkenar üçgende her bir açı 60 derecedir (60+60+60=180).</li>
        <li>Dik üçgende bir açı 90 derecedir, diğer ikisinin toplamı 90'dır.</li>
      </ul>
      <p>Not: Dış açıların toplamı ise tüm çokgenlerde olduğu gibi 360 derecedir.</p>
    `
  },
  {
    id: 'f7',
    subject: 'Coğrafya',
    question: 'Türkiye\'de en çok yağış alan bölge hangisidir?',
    answer: 'Karadeniz Bölgesi',
    detailTitle: 'Türkiye\'nin Yağış Rejimi',
    detailSummary: 'Dağların kıyıya paralel uzanması nedeniyle Karadeniz kıyıları bol yağış alır.',
    detailContent: `
      <p>Türkiye'de yıllık ortalama yağış miktarının en fazla olduğu bölge <strong>Karadeniz Bölgesi</strong>, özellikle de <strong>Doğu Karadeniz</strong> bölümüdür (Rize ve çevresi).</p>
      <p><strong>Nedenleri:</strong></p>
      <ul>
        <li>Dağların kıyıya paralel uzanması (Orografik/Yamaç yağışları).</li>
        <li>Nemli hava kütlelerinin denizden gelip dağlara çarpması.</li>
      </ul>
      <p>Bu yağış rejimi, bölgede gür ormanların oluşmasını ve çay, fındık gibi suya ihtiyaç duyan tarım ürünlerinin yetişmesini sağlar.</p>
    `
  },
  {
    id: 'f8',
    subject: 'Vatandaşlık',
    question: 'Hatay, Türkiye topraklarına hangi yıl katılmıştır?',
    answer: '1939',
    detailTitle: 'Hatay\'ın Anavatana Katılması',
    detailSummary: 'Hatay Cumhuriyeti Meclisi\'nin aldığı kararla 1939\'da Türkiye\'ye katılmıştır.',
    detailContent: `
      <p>Hatay sorunu, Türkiye Cumhuriyeti'nin dış politikasındaki en önemli başarılardan biridir.</p>
      <ul>
        <li>1938 yılında bağımsız <strong>Hatay Cumhuriyeti</strong> kuruldu ve ilk cumhurbaşkanı Tayfur Sökmen oldu.</li>
        <li>Hatay Meclisi, 23 Haziran 1939'da oy birliğiyle Türkiye'ye katılma kararı aldı.</li>
        <li>TBMM, 7 Temmuz 1939'da bu kararı onaylayarak Hatay'ı bir il olarak Türkiye sınırlarına dahil etti.</li>
      </ul>
      <p>Atatürk bu mesele için "Hatay benim şahsi meselemdir" demiştir ancak ne yazık ki ilhakı göremeden vefat etmiştir.</p>
    `
  },
  {
    id: 'f9',
    subject: 'Tarih',
    question: 'Malazgirt Meydan Muharebesi hangi yıl gerçekleşmiştir?',
    answer: '1071',
    detailTitle: 'Malazgirt Zaferi (1071)',
    detailSummary: 'Büyük Selçuklu Hükümdarı Alparslan\'ın Bizans ordusunu yendiği ve Anadolu\'nun kapılarının Türklere açıldığı savaştır.',
    detailContent: `<p><strong>Malazgirt Meydan Muharebesi</strong>, 26 Ağustos 1071 tarihinde Büyük Selçuklu Hükümdarı Alparslan ile Bizans İmparatoru Romen Diyojen arasında gerçekleşmiştir.</p><p>Sonuçları:</p><ul><li>Anadolu'nun kapıları Türklere kesin olarak açılmıştır.</li><li>Türkiye Tarihi başlamıştır.</li><li>Anadolu'da ilk Türk beylikleri kurulmaya başlanmıştır.</li></ul>`
  },
  {
    id: 'f10',
    subject: 'Matematik',
    question: 'Asal sayılar kaça kadar olan sayılardır?',
    answer: 'Sadece 1\'e ve kendisine bölünebilen 1\'den büyük doğal sayılardır.',
    detailTitle: 'Asal Sayılar',
    detailSummary: '1 ve kendisinden başka tam böleni olmayan 1\'den büyük doğal sayılardır.',
    detailContent: `<p><strong>Asal Sayılar</strong>, sadece iki pozitif tam sayı böleni olan doğal sayılardır: 1 ve kendisi.</p><ul><li>En küçük asal sayı 2'dir.</li><li>2, hem asal olup hem de çift olan tek sayıdır.</li><li>Örnekler: 2, 3, 5, 7, 11, 13, 17...</li><li>1 sayısı asal değildir.</li></ul>`
  },
  {
    id: 'f11',
    subject: 'Tarih',
    question: 'Mecelle\'yi hazırlayan komisyonun başkanı kimdir?',
    answer: 'Ahmet Cevdet Paşa',
    detailTitle: 'Mecelle ve Ahmet Cevdet Paşa',
    detailSummary: 'Osmanlı Medeni Kanunu olan Mecelle, Ahmet Cevdet Paşa başkanlığındaki bir komisyon tarafından hazırlanmıştır.',
    detailContent: `<p><strong>Mecelle-i Ahkam-ı Adliye</strong>, Osmanlı Devleti'nin İslam hukukuna dayalı ilk medeni kanunudur.</p><p>1868-1876 yılları arasında Ahmet Cevdet Paşa başkanlığındaki bir ilim heyeti tarafından hazırlanmıştır. Borçlar hukuku, eşya hukuku ve yargılama hukuku gibi konuları kapsar. Cumhuriyet döneminde 1926 yılında Türk Medeni Kanunu'nun kabulü ile yürürlükten kalkmıştır.</p>`
  },
  {
    id: 'f12',
    subject: 'Coğrafya',
    question: 'Türkiye\'nin yüzölçümü en büyük gölü hangisidir?',
    answer: 'Van Gölü',
    detailTitle: 'Van Gölü',
    detailSummary: 'Volkanik set gölü olan Van Gölü, Türkiye\'nin en büyük gölüdür ve suları sodalıdır.',
    detailContent: `<p><strong>Van Gölü</strong>, Doğu Anadolu Bölgesi'nde yer alan Türkiye'nin en büyük gölüdür.</p><ul><li>Nemrut volkanından çıkan lavların set oluşturmasıyla (Volkanik Set Gölü) meydana gelmiştir.</li><li>Suları sodalıdır. Bu sayede "İnci Kefali" gibi endemik türler yaşar.</li><li>Üzerinde Akdamar Adası gibi turistik adalar bulunur.</li><li>Tatvan-Van arasında feribot seferleri yapılır.</li></ul>`
  },
  {
    id: 'f13',
    subject: 'Vatandaşlık',
    question: 'Yüksek Seçim Kurulu (YSK) üyelerini kimler seçer?',
    answer: 'Yargıtay ve Danıştay Genel Kurulları',
    detailTitle: 'Yüksek Seçim Kurulu (YSK)',
    detailSummary: 'Seçimlerin genel yönetim ve denetimini sağlayan en üst kuruldur.',
    detailContent: `<p><strong>YSK (Yüksek Seçim Kurulu)</strong>, yasama organı seçimlerinin genel yönetim ve denetiminden sorumlu olan yüksek yargı organıdır.</p><ul><li>7 asıl ve 4 yedek üyeden oluşur.</li><li>Üyelerin 6'sı Yargıtay, 5'i Danıştay Genel Kurullarınca kendi üyeleri arasından seçilir.</li><li>YSK kararları kesindir, itiraz edilemez.</li></ul>`
  },
  {
    id: 'f14',
    subject: 'Tarih',
    question: 'Osmanlı\'da "Şeyhülislam" hangi sınıfın üyesidir?',
    answer: 'İlmiye',
    detailTitle: 'Osmanlı Yönetim Sınıfları: İlmiye',
    detailSummary: 'Şeyhülislam, din, eğitim ve hukuk işlerinden sorumlu olan İlmiye sınıfının başıdır.',
    detailContent: `<p>Osmanlı devlet yönetiminde <strong>İlmiye</strong> sınıfı; din, eğitim ve hukuk işlerini yürütürdü.</p><ul><li><strong>Başkanı:</strong> Şeyhülislam (Fetva makamı).</li><li><strong>Üyeleri:</strong> Kazaskerler, Kadılar, Müderrisler, İmamlar.</li><li>Şeyhülislam, Divan-ı Hümayun'da alınan kararların dine uygun olup olmadığına dair fetva verirdi.</li></ul>`
  },
  {
    id: 'f15',
    subject: 'Coğrafya',
    question: 'Türkiye\'de en uzun kıyı şeridine sahip bölge hangisidir?',
    answer: 'Ege Bölgesi',
    detailTitle: 'Ege Bölgesi Kıyıları',
    detailSummary: 'Dağların denize dik uzanması nedeniyle kıyı girinti çıkıntılıdır ve bu durum kıyı şeridini uzatır.',
    detailContent: `<p><strong>Ege Bölgesi</strong>, Türkiye'nin en uzun kıyı şeridine sahip bölgesidir (kuş uçuşu değil, gerçek uzunluk olarak).</p><p><strong>Nedeni:</strong> Dağların denize dik uzanması (Enine Kıyı Tipi).</p><p>Bu durumun sonuçları:</p><ul><li>Kıyıda çok sayıda koy, körfez, yarımada ve doğal liman oluşmuştur.</li><li>Kıta sahanlığı geniştir.</li><li>Deniz etkisi iç kesimlere kadar sokulabilir.</li></ul>`
  },
  {
    id: 'f16',
    subject: 'Vatandaşlık',
    question: 'Memurların haftalık çalışma süresi genel olarak kaç saattir?',
    answer: '40 Saat',
    detailTitle: 'Devlet Memurları Çalışma Saatleri',
    detailSummary: '657 sayılı Devlet Memurları Kanunu\'na göre haftalık çalışma süresi genel olarak 40 saattir.',
    detailContent: `<p>657 sayılı Devlet Memurları Kanunu'nun 99. maddesine göre; <strong>"Memurların haftalık çalışma süresi genel olarak 40 saattir."</strong></p><p>Bu süre genellikle Cumartesi ve Pazar tatil olmak üzere düzenlenir. Ancak kurumların ve hizmetlerin özelliğine göre (örneğin sağlık, emniyet) farklı çalışma saatleri ve nöbet sistemleri uygulanabilir.</p>`
  },
  {
    id: 'f17',
    subject: 'Türkçe',
    question: '"Bana dokunmayan yılan bin yaşasın" atasözünün anlamı nedir?',
    answer: 'Kişinin kendisine zararı dokunmadıkça kötülüklere ses çıkarmaması, bencillik.',
    detailTitle: 'Atasözü: Bana Dokunmayan Yılan...',
    detailSummary: 'Toplumsal duyarsızlığı ve bencilliği eleştiren, ancak pratikte bencilce davranışı ifade eden bir sözdür.',
    detailContent: `<p>Bu atasözü, kişinin sadece kendi çıkarını ve güvenliğini düşündüğü, başkalarına yapılan haksızlıkları veya kötülükleri, ucu kendisine dokunmadığı sürece umursamadığı durumları anlatır.</p><p>Toplumsal dayanışmanın zıttı olan bencilce bir tutumu ifade eder.</p>`
  },
  {
    id: 'f18',
    subject: 'Tarih',
    question: 'I. Dünya Savaşı\'nda Osmanlı\'nın toprak kazandığı tek cephe hangisidir?',
    answer: 'Kafkas Cephesi',
    detailTitle: 'Kafkas Cephesi ve Toprak Kazancı',
    detailSummary: 'Osmanlı Devleti yenilmesine rağmen Rusya ile imzaladığı Brest-Litovsk Antlaşması ile Kars, Ardahan ve Batum\'u geri almıştır.',
    detailContent: `<p><strong>Kafkas Cephesi</strong>, Osmanlı'nın I. Dünya Savaşı'nda açtığı ilk taarruz cephesidir.</p><p>Sarıkamış Harekatı gibi büyük kayıplar yaşanmasına rağmen, Rusya'da Bolşevik İhtilali'nin çıkması sonucu Rusya savaştan çekilmiştir.</p><p>3 Mart 1918 <strong>Brest-Litovsk Antlaşması</strong> ile Rusya; Elviye-i Selase denilen Kars, Ardahan ve Batum'u Osmanlı'ya geri vermiştir. Böylece Osmanlı, yenik sayıldığı bir savaşta toprak kazandığı tek cepheyi yaşamıştır.</p>`
  },
  {
    id: 'f19',
    subject: 'Coğrafya',
    question: 'Türkiye\'de pamuk üretiminde ilk sırada yer alan il hangisidir?',
    answer: 'Şanlıurfa',
    detailTitle: 'Türkiye\'de Pamuk Üretimi',
    detailSummary: 'GAP (Güneydoğu Anadolu Projesi) ile sulama imkanlarının artması sonucu Şanlıurfa pamuk üretiminde zirveye yerleşmiştir.',
    detailContent: `<p>Eskiden "Beyaz Altın" denince akla Adana (Çukurova) gelirdi. Ancak <strong>GAP</strong> projesinin devreye girmesi ve sulu tarımın yaygınlaşmasıyla üretim merkezi Güneydoğu Anadolu'ya kaymıştır.</p><p>Günümüzde Türkiye pamuk üretiminin yaklaşık yarısı <strong>Şanlıurfa</strong> tarafından karşılanmaktadır. Onu Aydın ve Hatay gibi iller takip eder.</p>`
  },
  {
    id: 'f20',
    subject: 'Vatandaşlık',
    question: 'Köy muhtarını kim seçer?',
    answer: 'Köy Derneği (Köydeki seçmenler)',
    detailTitle: 'Köy Yönetimi ve Muhtar Seçimi',
    detailSummary: 'Köy muhtarını, köyde ikamet eden seçmenlerin oluşturduğu Köy Derneği seçer.',
    detailContent: `<p>Köy yönetiminde karar organlarından biri <strong>Köy Derneği</strong>dir.</p><ul><li>Köy Derneği, köyde yaşayan 18 yaşını doldurmuş tüm kadın ve erkek seçmenlerden oluşur.</li><li>Bu dernek, köy muhtarını ve ihtiyar heyeti üyelerini doğrudan seçer.</li><li>Köy işlerinin imece usulüyle yapılmasına da karar verebilir.</li></ul>`
  },
  {
    id: 'f21',
    subject: 'Tarih',
    question: 'Türk adının anlamı Çin kaynaklarında ne olarak geçer?',
    answer: 'Miğfer',
    detailTitle: 'Türk Adının Anlamları',
    detailSummary: 'Türk adı farklı kaynaklarda farklı anlamlara gelir; Çin kaynaklarında "Miğfer" olarak geçer.',
    detailContent: `<p>Tarih boyunca "Türk" kelimesine farklı anlamlar yüklenmiştir:</p><ul><li><strong>Çin Kaynakları:</strong> Miğfer (Türklerin oturduğu bölge miğfere benzediği için).</li><li><strong>Kaşgarlı Mahmut:</strong> Olgunluk Çağı.</li><li><strong>Ziya Gökalp:</strong> Kanun ve nizam sahibi (Töreli).</li><li><strong>Uygur Metinleri:</strong> Güç, kuvvet.</li></ul>`
  },
  {
    id: 'f22',
    subject: 'Tarih',
    question: 'Uygurların benimsediği ve hayvancılığı bırakıp tarıma geçmelerine neden olan din hangisidir?',
    answer: 'Maniheizm',
    detailTitle: 'Uygurlar ve Maniheizm',
    detailSummary: 'Bögü Kağan döneminde benimsenen Maniheizm dini, et yemeyi ve savaşmayı yasakladığı için Uygurların yaşam tarzını değiştirmiştir.',
    detailContent: `<p>Uygurlar, <strong>Bögü Kağan</strong> döneminde Maniheizm dinini kabul etmiştir.</p><p>Bu dinin etkileri:</p><ul><li>Et yemek ve canlı öldürmek yasaktır. Bu nedenle hayvancılık ve savaşçılık özellikleri zayıflamıştır.</li><li>Yerleşik hayata geçilmiş, tarım, mimari ve sanat gelişmiştir.</li><li>Türk tarihinde yerleşik hayata geçen ilk devlet Uygurlar olmuştur.</li></ul>`
  },
  {
    id: 'f23',
    subject: 'Coğrafya',
    question: 'Türkiye\'nin en doğu ucu ile en batı ucu arasındaki zaman farkı kaç dakikadır?',
    answer: '76 Dakika',
    detailTitle: 'Yerel Saat Farkı Hesabı',
    detailSummary: 'Türkiye 26° ve 45° Doğu meridyenleri arasındadır. 19 meridyen fark vardır.',
    detailContent: `<p>Türkiye'nin matematik konumu:</p><ul><li>En batı: Gökçeada (26° Doğu)</li><li>En doğu: Iğdır-Dilucu (45° Doğu)</li></ul><p>Meridyen farkı: 45 - 26 = 19 meridyen.</p><p>İki meridyen arası zaman farkı 4 dakikadır.</p><p><strong>19 x 4 = 76 dakika</strong> (1 saat 16 dakika) zaman farkı vardır.</p>`
  },
  {
    id: 'f24',
    subject: 'Coğrafya',
    question: 'Karstik arazilerin en yaygın olduğu bölge hangisidir?',
    answer: 'Akdeniz Bölgesi',
    detailTitle: 'Karstik Şekiller ve Akdeniz',
    detailSummary: 'Kireç taşı (kalker) gibi suda kolay eriyen kayaçların en yaygın olduğu bölge Akdeniz\'dir.',
    detailContent: `<p><strong>Karstik arazi</strong>, kireç taşı, alçı taşı, kaya tuzu gibi suda kolay çözünebilen kayaçların bulunduğu arazilerdir.</p><p>Türkiye'de en çok <strong>Akdeniz Bölgesi</strong>'nde (Teke ve Taşeli Platoları, Göller Yöresi) görülür.</p><p>Karstik şekiller: Lapya, dolin, uvala, polye, mağara, obruk, sarkıt, dikit, traverten.</p>`
  },
  {
    id: 'f25',
    subject: 'Vatandaşlık',
    question: 'Olağanüstü Hal (OHAL) ilan etme yetkisi kime aittir?',
    answer: 'Cumhurbaşkanı',
    detailTitle: 'OHAL İlan Yetkisi',
    detailSummary: '2017 Anayasa değişikliği ile OHAL ilan etme yetkisi Cumhurbaşkanına verilmiştir.',
    detailContent: `<p>Anayasa'ya göre; doğal afet, tehlikeli salgın hastalık, ağır ekonomik bunalım, kamu düzeninin ciddi şekilde bozulması gibi durumlarda <strong>Cumhurbaşkanı</strong>, yurdun tamamında veya bir bölgesinde, süresi <strong>6 ayı geçmemek üzere</strong> olağanüstü hal (OHAL) ilan edebilir.</p><p>Bu karar Resmi Gazete'de yayımlanır ve aynı gün TBMM onayına sunulur.</p>`
  }
];