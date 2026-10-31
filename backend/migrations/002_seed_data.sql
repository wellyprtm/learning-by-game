-- Seed data for Game Belajar Anak (70 Levels Progressive Curriculum)

-- 1. Insert Game Catalog
INSERT INTO game_catalog (id, title, subtitle, category, icon, theme_color, description, min_age, max_age, order_num)
VALUES 
(
    'reading-adventure',
    'Pulau Membaca',
    'Petualangan Huruf & Kata bersama Milo',
    'reading',
    'BookOpen',
    'from-amber-400 to-orange-500',
    '24 Stasiun petualangan: Vokal ajaib, suku kata A-Z, menyusun kata bergambar, akhiran kata, hingga kalimat pendek.',
    4,
    7,
    1
),
(
    'counting-adventure',
    'Pulau Berhitung',
    'Petualangan Angka & Logika bersama Milo',
    'math',
    'Sparkles',
    'from-emerald-400 to-teal-600',
    '24 Stasiun berhitung: Mengenal angka 1-50, menghitung benda, lebih banyak/sedikit, serta penjumlahan & pengurangan santai.',
    4,
    7,
    2
),
(
    'feed-cat',
    'Pesta Makan Milo',
    'Beri Makan & Tangkap Ikan Lezat',
    'mini-game',
    'Fish',
    'from-pink-400 to-rose-500',
    '22 Stasiun tantangan ketangkasan: Menangkap ikan hidup di kolam, menghitung camilan, dan menyajikan pesta lezat untuk Milo.',
    4,
    7,
    3
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    icon = EXCLUDED.icon,
    theme_color = EXCLUDED.theme_color,
    description = EXCLUDED.description;

-- ============================================================================
-- 2. PULAU MEMBACA (24 STASIUN TINGKAT PERKEMBANGAN ANAK)
-- ============================================================================

INSERT INTO game_levels (id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required)
VALUES
(
    'reading-r1',
    'reading-adventure',
    'R1',
    'Vokal Ceria',
    'Kenali 5 vokal ajaib: a, i, u, e, o',
    1,
    'tap-choose',
    '{"instruction": "Sentuh huruf yang disebutkan Milo!", "questions": [
        {"target": "A", "audioText": "A", "prompt": "Cari huruf A seperti Apel!", "options": ["A", "B", "O"], "hint": "Bentuknya seperti atap rumah!", "icon": "apel"},
        {"target": "I", "audioText": "I", "prompt": "Cari huruf I seperti Ikan!", "options": ["U", "I", "E"], "hint": "Bentuknya seperti tiang ada titiknya!", "icon": "ikan"},
        {"target": "U", "audioText": "U", "prompt": "Cari huruf U seperti Ulat!", "options": ["U", "O", "A"], "hint": "Bentuknya melengkung ke atas!", "icon": "ulat"},
        {"target": "E", "audioText": "E", "prompt": "Cari huruf E seperti Ember!", "options": ["I", "E", "A"], "hint": "Punya tiga garis ke samping!", "icon": "ember"},
        {"target": "O", "audioText": "O", "prompt": "Cari huruf O seperti Obor!", "options": ["O", "U", "I"], "hint": "Bulat bundar seperti donat!", "icon": "donat"}
    ]}',
    0
),
(
    'reading-r2',
    'reading-adventure',
    'R2',
    'Suku Kata Ba Bi Bu Be Bo',
    'Gabungkan huruf B dan vokal bersama Milo',
    2,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata lalu ketuk yang benar!", "questions": [
        {"target": "ba", "audioText": "ba", "prompt": "Ketuk suku kata ba!", "options": ["ba", "bi", "bu"], "hint": "B bertemu A dibaca ba!", "icon": "balon"},
        {"target": "bi", "audioText": "bi", "prompt": "Ketuk suku kata bi!", "options": ["bu", "bi", "bo"], "hint": "B bertemu I dibaca bi!", "icon": "bintang"},
        {"target": "bu", "audioText": "bu", "prompt": "Ketuk suku kata bu seperti buku!", "options": ["be", "ba", "bu"], "hint": "B bertemu U dibaca bu!", "icon": "buku"},
        {"target": "be", "audioText": "be", "prompt": "Ketuk suku kata be seperti bebek!", "options": ["be", "bo", "ba"], "hint": "B bertemu E dibaca be!", "icon": "bebek"},
        {"target": "bo", "audioText": "bo", "prompt": "Ketuk suku kata bo seperti bola!", "options": ["bi", "bo", "bu"], "hint": "B bertemu O dibaca bo!", "icon": "bola"}
    ]}',
    1
),
(
    'reading-r3',
    'reading-adventure',
    'R3',
    'Suku Kata Ca Ci Cu Ce Co',
    'Gabungkan huruf C dan vokal bersama Milo',
    3,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata C!", "questions": [
        {"target": "ca", "audioText": "ca", "prompt": "Ketuk suku kata ca!", "options": ["ca", "ci", "cu"], "hint": "C bertemu A dibaca ca!", "icon": "cacing"},
        {"target": "ci", "audioText": "ci", "prompt": "Ketuk suku kata ci!", "options": ["co", "ci", "ce"], "hint": "C bertemu I dibaca ci!", "icon": "cincin"},
        {"target": "cu", "audioText": "cu", "prompt": "Ketuk suku kata cu!", "options": ["ca", "cu", "ci"], "hint": "C bertemu U dibaca cu!", "icon": "cumi"},
        {"target": "ce", "audioText": "ce", "prompt": "Ketuk suku kata ce!", "options": ["ce", "co", "ca"], "hint": "C bertemu E dibaca ce!", "icon": "ceri"},
        {"target": "co", "audioText": "co", "prompt": "Ketuk suku kata co!", "options": ["ci", "co", "cu"], "hint": "C bertemu O dibaca co!", "icon": "cokelat"}
    ]}',
    2
),
(
    'reading-r4',
    'reading-adventure',
    'R4',
    'Suku Kata Da Di Du De Do',
    'Gabungkan huruf D dan vokal bersama Milo',
    4,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata D!", "questions": [
        {"target": "da", "audioText": "da", "prompt": "Ketuk suku kata da seperti daun!", "options": ["da", "di", "du"], "hint": "D bertemu A dibaca da!", "icon": "daun"},
        {"target": "di", "audioText": "di", "prompt": "Ketuk suku kata di!", "options": ["do", "de", "di"], "hint": "D bertemu I dibaca di!", "icon": "dinding"},
        {"target": "du", "audioText": "du", "prompt": "Ketuk suku kata du seperti durian!", "options": ["du", "da", "di"], "hint": "D bertemu U dibaca du!", "icon": "durian"},
        {"target": "de", "audioText": "de", "prompt": "Ketuk suku kata de!", "options": ["do", "de", "du"], "hint": "D bertemu E dibaca de!", "icon": "desa"},
        {"target": "do", "audioText": "do", "prompt": "Ketuk suku kata do seperti donat!", "options": ["da", "di", "do"], "hint": "D bertemu O dibaca do!", "icon": "donat"}
    ]}',
    3
),
(
    'reading-r5',
    'reading-adventure',
    'R5',
    'Suku Kata Ga Gi Gu Ge Go',
    'Gabungkan huruf G dan vokal bersama Milo',
    5,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata G!", "questions": [
        {"target": "ga", "audioText": "ga", "prompt": "Ketuk suku kata ga seperti gajah!", "options": ["ga", "gi", "gu"], "hint": "G bertemu A dibaca ga!", "icon": "gajah"},
        {"target": "gi", "audioText": "gi", "prompt": "Ketuk suku kata gi seperti gigi!", "options": ["go", "ge", "gi"], "hint": "G bertemu I dibaca gi!", "icon": "gigi"},
        {"target": "gu", "audioText": "gu", "prompt": "Ketuk suku kata gu seperti gula!", "options": ["gu", "ga", "gi"], "hint": "G bertemu U dibaca gu!", "icon": "gula"},
        {"target": "ge", "audioText": "ge", "prompt": "Ketuk suku kata ge!", "options": ["ge", "go", "ga"], "hint": "G bertemu E dibaca ge!", "icon": "gelas"},
        {"target": "go", "audioText": "go", "prompt": "Ketuk suku kata go!", "options": ["gi", "go", "gu"], "hint": "G bertemu O dibaca go!", "icon": "gol"}
    ]}',
    4
),
(
    'reading-r6',
    'reading-adventure',
    'R6',
    'Suku Kata Ha Hi Hu He Ho',
    'Gabungkan huruf H dan vokal bersama Milo',
    6,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata H!", "questions": [
        {"target": "ha", "audioText": "ha", "prompt": "Ketuk suku kata ha seperti hati!", "options": ["ha", "hi", "hu"], "hint": "H bertemu A dibaca ha!", "icon": "hati"},
        {"target": "hi", "audioText": "hi", "prompt": "Ketuk suku kata hi seperti hidung!", "options": ["ho", "he", "hi"], "hint": "H bertemu I dibaca hi!", "icon": "hidung"},
        {"target": "hu", "audioText": "hu", "prompt": "Ketuk suku kata hu seperti hujan!", "options": ["hu", "ha", "hi"], "hint": "H bertemu U dibaca hu!", "icon": "hujan"},
        {"target": "he", "audioText": "he", "prompt": "Ketuk suku kata he seperti hewan!", "options": ["he", "ho", "ha"], "hint": "H bertemu E dibaca he!", "icon": "hewan"},
        {"target": "ho", "audioText": "ho", "prompt": "Ketuk suku kata ho!", "options": ["hi", "ho", "hu"], "hint": "H bertemu O dibaca ho!", "icon": "hotel"}
    ]}',
    5
),
(
    'reading-r7',
    'reading-adventure',
    'R7',
    'Suku Kata Ja Ji Ju Je Jo',
    'Gabungkan huruf J dan vokal bersama Milo',
    7,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata J!", "questions": [
        {"target": "ja", "audioText": "ja", "prompt": "Ketuk suku kata ja seperti jari!", "options": ["ja", "ji", "ju"], "hint": "J bertemu A dibaca ja!", "icon": "jari"},
        {"target": "ji", "audioText": "ji", "prompt": "Ketuk suku kata ji!", "options": ["jo", "je", "ji"], "hint": "J bertemu I dibaca ji!", "icon": "jerapah"},
        {"target": "ju", "audioText": "ju", "prompt": "Ketuk suku kata ju seperti jus!", "options": ["ju", "ja", "ji"], "hint": "J bertemu U dibaca ju!", "icon": "jus"},
        {"target": "je", "audioText": "je", "prompt": "Ketuk suku kata je seperti jeruk!", "options": ["je", "jo", "ja"], "hint": "J bertemu E dibaca je!", "icon": "jeruk"},
        {"target": "jo", "audioText": "jo", "prompt": "Ketuk suku kata jo!", "options": ["ji", "jo", "ju"], "hint": "J bertemu O dibaca jo!", "icon": "joran"}
    ]}',
    6
),
(
    'reading-r8',
    'reading-adventure',
    'R8',
    'Suku Kata Ka Ki Ku Ke Ko',
    'Gabungkan huruf K dan vokal bersama Milo',
    8,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata K!", "questions": [
        {"target": "ka", "audioText": "ka", "prompt": "Ketuk suku kata ka seperti kaki!", "options": ["ka", "ki", "ku"], "hint": "K bertemu A dibaca ka!", "icon": "kaki"},
        {"target": "ki", "audioText": "ki", "prompt": "Ketuk suku kata ki seperti kipas!", "options": ["ko", "ke", "ki"], "hint": "K bertemu I dibaca ki!", "icon": "kipas"},
        {"target": "ku", "audioText": "ku", "prompt": "Ketuk suku kata ku seperti kucing!", "options": ["ku", "ka", "ki"], "hint": "K bertemu U dibaca ku!", "icon": "kucing"},
        {"target": "ke", "audioText": "ke", "prompt": "Ketuk suku kata ke seperti keju!", "options": ["ke", "ko", "ka"], "hint": "K bertemu E dibaca ke!", "icon": "keju"},
        {"target": "ko", "audioText": "ko", "prompt": "Ketuk suku kata ko seperti kopi!", "options": ["ki", "ko", "ku"], "hint": "K bertemu O dibaca ko!", "icon": "kopi"}
    ]}',
    7
),
(
    'reading-r9',
    'reading-adventure',
    'R9',
    'Suku Kata La Li Lu Le Lo',
    'Gabungkan huruf L dan vokal bersama Milo',
    9,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata L!", "questions": [
        {"target": "la", "audioText": "la", "prompt": "Ketuk suku kata la seperti labu!", "options": ["la", "li", "lu"], "hint": "L bertemu A dibaca la!", "icon": "labu"},
        {"target": "li", "audioText": "li", "prompt": "Ketuk suku kata li seperti lilin!", "options": ["lo", "le", "li"], "hint": "L bertemu I dibaca li!", "icon": "lilin"},
        {"target": "lu", "audioText": "lu", "prompt": "Ketuk suku kata lu seperti lumba-lumba!", "options": ["lu", "la", "li"], "hint": "L bertemu U dibaca lu!", "icon": "ikan"},
        {"target": "le", "audioText": "le", "prompt": "Ketuk suku kata le seperti lebah!", "options": ["le", "lo", "la"], "hint": "L bertemu E dibaca le!", "icon": "lebah"},
        {"target": "lo", "audioText": "lo", "prompt": "Ketuk suku kata lo!", "options": ["li", "lo", "lu"], "hint": "L bertemu O dibaca lo!", "icon": "loket"}
    ]}',
    8
),
(
    'reading-r10',
    'reading-adventure',
    'R10',
    'Suku Kata Ma Mi Mu Me Mo',
    'Gabungkan huruf M dan vokal bersama Milo',
    10,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata M!", "questions": [
        {"target": "ma", "audioText": "ma", "prompt": "Ketuk suku kata ma seperti mata!", "options": ["ma", "mi", "mu"], "hint": "M bertemu A dibaca ma!", "icon": "mata"},
        {"target": "mi", "audioText": "mi", "prompt": "Ketuk suku kata mi seperti Milo!", "options": ["mo", "me", "mi"], "hint": "M bertemu I dibaca mi!", "icon": "kucing"},
        {"target": "mu", "audioText": "mu", "prompt": "Ketuk suku kata mu seperti mulut!", "options": ["mu", "ma", "mi"], "hint": "M bertemu U dibaca mu!", "icon": "mulut"},
        {"target": "me", "audioText": "me", "prompt": "Ketuk suku kata me seperti meja!", "options": ["me", "mo", "ma"], "hint": "M bertemu E dibaca me!", "icon": "meja"},
        {"target": "mo", "audioText": "mo", "prompt": "Ketuk suku kata mo seperti mobil!", "options": ["mi", "mo", "mu"], "hint": "M bertemu O dibaca mo!", "icon": "mobil"}
    ]}',
    9
),
(
    'reading-r11',
    'reading-adventure',
    'R11',
    'Suku Kata Na Ni Nu Ne No',
    'Gabungkan huruf N dan vokal bersama Milo',
    11,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata N!", "questions": [
        {"target": "na", "audioText": "na", "prompt": "Ketuk suku kata na seperti nanas!", "options": ["na", "ni", "nu"], "hint": "N bertemu A dibaca na!", "icon": "nanas"},
        {"target": "ni", "audioText": "ni", "prompt": "Ketuk suku kata ni!", "options": ["no", "ne", "ni"], "hint": "N bertemu I dibaca ni!", "icon": "nila"},
        {"target": "nu", "audioText": "nu", "prompt": "Ketuk suku kata nu!", "options": ["nu", "na", "ni"], "hint": "N bertemu U dibaca nu!", "icon": "nuri"},
        {"target": "ne", "audioText": "ne", "prompt": "Ketuk suku kata ne seperti nenek!", "options": ["ne", "no", "na"], "hint": "N bertemu E dibaca ne!", "icon": "nenek"},
        {"target": "no", "audioText": "no", "prompt": "Ketuk suku kata no seperti nomor!", "options": ["ni", "no", "nu"], "hint": "N bertemu O dibaca no!", "icon": "nomor"}
    ]}',
    10
),
(
    'reading-r12',
    'reading-adventure',
    'R12',
    'Suku Kata Pa Pi Pu Pe Po',
    'Gabungkan huruf P dan vokal bersama Milo',
    12,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata P!", "questions": [
        {"target": "pa", "audioText": "pa", "prompt": "Ketuk suku kata pa seperti payung!", "options": ["pa", "pi", "pu"], "hint": "P bertemu A dibaca pa!", "icon": "payung"},
        {"target": "pi", "audioText": "pi", "prompt": "Ketuk suku kata pi seperti pipi!", "options": ["po", "pe", "pi"], "hint": "P bertemu I dibaca pi!", "icon": "pipi"},
        {"target": "pu", "audioText": "pu", "prompt": "Ketuk suku kata pu seperti pulau!", "options": ["pu", "pa", "pi"], "hint": "P bertemu U dibaca pu!", "icon": "pulau"},
        {"target": "pe", "audioText": "pe", "prompt": "Ketuk suku kata pe seperti permen!", "options": ["pe", "po", "pa"], "hint": "P bertemu E dibaca pe!", "icon": "permen"},
        {"target": "po", "audioText": "po", "prompt": "Ketuk suku kata po seperti pohon!", "options": ["pi", "po", "pu"], "hint": "P bertemu O dibaca po!", "icon": "pohon"}
    ]}',
    11
),
(
    'reading-r13',
    'reading-adventure',
    'R13',
    'Suku Kata Ra Ri Ru Re Ro',
    'Gabungkan huruf R dan vokal bersama Milo',
    13,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata R!", "questions": [
        {"target": "ra", "audioText": "ra", "prompt": "Ketuk suku kata ra seperti radio!", "options": ["ra", "ri", "ru"], "hint": "R bertemu A dibaca ra!", "icon": "radio"},
        {"target": "ri", "audioText": "ri", "prompt": "Ketuk suku kata ri!", "options": ["ro", "re", "ri"], "hint": "R bertemu I dibaca ri!", "icon": "rimba"},
        {"target": "ru", "audioText": "ru", "prompt": "Ketuk suku kata ru seperti rumah!", "options": ["ru", "ra", "ri"], "hint": "R bertemu U dibaca ru!", "icon": "rumah"},
        {"target": "re", "audioText": "re", "prompt": "Ketuk suku kata re!", "options": ["re", "ro", "ra"], "hint": "R bertemu E dibaca re!", "icon": "rem"},
        {"target": "ro", "audioText": "ro", "prompt": "Ketuk suku kata ro seperti roti!", "options": ["ri", "ro", "ru"], "hint": "R bertemu O dibaca ro!", "icon": "roti"}
    ]}',
    12
),
(
    'reading-r14',
    'reading-adventure',
    'R14',
    'Suku Kata Sa Si Su Se So',
    'Gabungkan huruf S dan vokal bersama Milo',
    14,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata S!", "questions": [
        {"target": "sa", "audioText": "sa", "prompt": "Ketuk suku kata sa seperti sapi!", "options": ["sa", "si", "su"], "hint": "S bertemu A dibaca sa!", "icon": "sapi"},
        {"target": "si", "audioText": "si", "prompt": "Ketuk suku kata si seperti sisir!", "options": ["so", "se", "si"], "hint": "S bertemu I dibaca si!", "icon": "sisir"},
        {"target": "su", "audioText": "su", "prompt": "Ketuk suku kata su seperti susu!", "options": ["su", "sa", "si"], "hint": "S bertemu U dibaca su!", "icon": "susu"},
        {"target": "se", "audioText": "se", "prompt": "Ketuk suku kata se seperti sepeda!", "options": ["se", "so", "sa"], "hint": "S bertemu E dibaca se!", "icon": "sepeda"},
        {"target": "so", "audioText": "so", "prompt": "Ketuk suku kata so seperti sosis!", "options": ["si", "so", "su"], "hint": "S bertemu O dibaca so!", "icon": "sosis"}
    ]}',
    13
),
(
    'reading-r15',
    'reading-adventure',
    'R15',
    'Suku Kata Ta Ti Tu Te To',
    'Gabungkan huruf T dan vokal bersama Milo',
    15,
    'tap-choose',
    '{"instruction": "Dengarkan bunyi suku kata T!", "questions": [
        {"target": "ta", "audioText": "ta", "prompt": "Ketuk suku kata ta seperti tali!", "options": ["ta", "ti", "tu"], "hint": "T bertemu A dibaca ta!", "icon": "tali"},
        {"target": "ti", "audioText": "ti", "prompt": "Ketuk suku kata ti seperti tidur!", "options": ["to", "te", "ti"], "hint": "T bertemu I dibaca ti!", "icon": "tidur"},
        {"target": "tu", "audioText": "tu", "prompt": "Ketuk suku kata tu seperti tupai!", "options": ["tu", "ta", "ti"], "hint": "T bertemu U dibaca tu!", "icon": "tupai"},
        {"target": "te", "audioText": "te", "prompt": "Ketuk suku kata te seperti telur!", "options": ["te", "to", "ta"], "hint": "T bertemu E dibaca te!", "icon": "telur"},
        {"target": "to", "audioText": "to", "prompt": "Ketuk suku kata to seperti topi!", "options": ["ti", "to", "tu"], "hint": "T bertemu O dibaca to!", "icon": "topi"}
    ]}',
    14
),
(
    'reading-r16',
    'reading-adventure',
    'R16',
    'Menyusun Kata Benda 2 Suku Kata',
    'Susun kata bola, buku, sapi, mata',
    16,
    'build-word',
    '{"instruction": "Sentuh suku kata berurutan untuk menyusun kata!", "questions": [
        {"word": "bola", "syllables": ["bo", "la"], "audioText": "bola", "prompt": "Ayo susun kata BOLA!", "options": ["la", "bo", "sa", "ku"], "hint": "bo lalu la", "icon": "bola"},
        {"word": "buku", "syllables": ["bu", "ku"], "audioText": "buku", "prompt": "Ayo susun kata BUKU!", "options": ["ku", "bu", "pi", "ma"], "hint": "bu lalu ku", "icon": "buku"},
        {"word": "sapi", "syllables": ["sa", "pi"], "audioText": "sapi", "prompt": "Ayo susun kata SAPI!", "options": ["pi", "bo", "sa", "ta"], "hint": "sa lalu pi", "icon": "sapi"},
        {"word": "mata", "syllables": ["ma", "ta"], "audioText": "mata", "prompt": "Ayo susun kata MATA!", "options": ["ta", "ku", "ma", "la"], "hint": "ma lalu ta", "icon": "mata"}
    ]}',
    15
),
(
    'reading-r17',
    'reading-adventure',
    'R17',
    'Menyusun Kata Makanan & Minuman',
    'Susun kata roti, susu, madu, keju',
    17,
    'build-word',
    '{"instruction": "Susun kata makanan lezat!", "questions": [
        {"word": "roti", "syllables": ["ro", "ti"], "audioText": "roti", "prompt": "Ayo susun kata RO-TI!", "options": ["ti", "ro", "su", "ma"], "hint": "ro lalu ti", "icon": "roti"},
        {"word": "susu", "syllables": ["su", "su"], "audioText": "susu", "prompt": "Ayo susun kata SU-SU segar!", "options": ["su", "su", "ke", "ju"], "hint": "su lalu su", "icon": "susu"},
        {"word": "madu", "syllables": ["ma", "du"], "audioText": "madu", "prompt": "Ayo susun kata MA-DU manis!", "options": ["du", "ma", "ro", "ti"], "hint": "ma lalu du", "icon": "madu"},
        {"word": "keju", "syllables": ["ke", "ju"], "audioText": "keju", "prompt": "Ayo susun kata KE-JU lezat!", "options": ["ju", "ke", "du", "su"], "hint": "ke lalu ju", "icon": "keju"}
    ]}',
    16
),
(
    'reading-r18',
    'reading-adventure',
    'R18',
    'Menyusun Kata 3 Suku Kata',
    'Susun sepeda, kemeja, kelapa, boneka',
    18,
    'build-word',
    '{"instruction": "Susun kata 3 suku kata!", "questions": [
        {"word": "sepeda", "syllables": ["se", "pe", "da"], "audioText": "sepeda", "prompt": "Susun kata SE-PE-DA!", "options": ["da", "se", "pe", "ka"], "hint": "se lalu pe lalu da", "icon": "sepeda"},
        {"word": "kemeja", "syllables": ["ke", "me", "ja"], "audioText": "kemeja", "prompt": "Susun kata KE-ME-JA rapi!", "options": ["ja", "ke", "me", "la"], "hint": "ke lalu me lalu ja", "icon": "kemeja"},
        {"word": "kelapa", "syllables": ["ke", "la", "pa"], "audioText": "kelapa", "prompt": "Susun kata KE-LA-PA!", "options": ["pa", "ke", "la", "bo"], "hint": "ke lalu la lalu pa", "icon": "kelapa"},
        {"word": "boneka", "syllables": ["bo", "ne", "ka"], "audioText": "boneka", "prompt": "Susun kata BO-NE-KA lucu!", "options": ["ka", "bo", "ne", "pe"], "hint": "bo lalu ne lalu ka", "icon": "boneka"}
    ]}',
    17
),
(
    'reading-r19',
    'reading-adventure',
    'R19',
    'Kata Berakhiran (-n, -k, -m)',
    'Kenali kata: ikan, anak, malam',
    19,
    'build-word',
    '{"instruction": "Susun kata dengan bunyi akhiran konsonan!", "questions": [
        {"word": "ikan", "syllables": ["i", "kan"], "audioText": "ikan", "prompt": "Susun kata I-KAN!", "options": ["kan", "i", "lam", "nak"], "hint": "i lalu kan", "icon": "ikan"},
        {"word": "anak", "syllables": ["a", "nak"], "audioText": "anak", "prompt": "Susun kata A-NAK cerdas!", "options": ["nak", "a", "kan", "sar"], "hint": "a lalu nak", "icon": "anak"},
        {"word": "malam", "syllables": ["ma", "lam"], "audioText": "malam", "prompt": "Susun kata MA-LAM sunyi!", "options": ["lam", "ma", "nak", "i"], "hint": "ma lalu lam", "icon": "malam"}
    ]}',
    18
),
(
    'reading-r20',
    'reading-adventure',
    'R20',
    'Kata Berakhiran (-r, -s, -t)',
    'Kenali kata: pasar, bus, obat',
    20,
    'build-word',
    '{"instruction": "Susun kata berakhiran -r, -s, dan -t!", "questions": [
        {"word": "pasar", "syllables": ["pa", "sar"], "audioText": "pasar", "prompt": "Susun kata PA-SAR!", "options": ["sar", "pa", "bus", "bat"], "hint": "pa lalu sar", "icon": "pasar"},
        {"word": "bus", "syllables": ["b", "us"], "audioText": "bus", "prompt": "Susun kata BUS kuning!", "options": ["us", "b", "sar", "pa"], "hint": "b lalu us", "icon": "bus"},
        {"word": "obat", "syllables": ["o", "bat"], "audioText": "obat", "prompt": "Susun kata O-BAT sehat!", "options": ["bat", "o", "sar", "b"], "hint": "o lalu bat", "icon": "obat"}
    ]}',
    19
),
(
    'reading-r21',
    'reading-adventure',
    'R21',
    'Kata Berakhiran NG',
    'kucing, piring, bintang, pisang',
    21,
    'build-word',
    '{"instruction": "Dengarkan bunyi NG di akhir kata!", "questions": [
        {"word": "kucing", "syllables": ["ku", "cing"], "audioText": "kucing", "prompt": "Susun kata KU-CING seperti Milo!", "options": ["cing", "ku", "ring", "tang"], "hint": "ku lalu cing!", "icon": "kucing"},
        {"word": "piring", "syllables": ["pi", "ring"], "audioText": "piring", "prompt": "Susun kata PI-RING!", "options": ["ring", "pi", "sang", "cing"], "hint": "pi lalu ring!", "icon": "piring"},
        {"word": "bintang", "syllables": ["bin", "tang"], "audioText": "bintang", "prompt": "Susun kata BIN-TANG di langit!", "options": ["tang", "bin", "cing", "ring"], "hint": "bin lalu tang!", "icon": "bintang"},
        {"word": "pisang", "syllables": ["pi", "sang"], "audioText": "pisang", "prompt": "Susun kata PI-SANG manis!", "options": ["sang", "pi", "tang", "ku"], "hint": "pi lalu sang!", "icon": "pisang"}
    ]}',
    20
),
(
    'reading-r22',
    'reading-adventure',
    'R22',
    'Akhiran di Tengah Kata',
    'lampu, kursi, pensil, pintu',
    22,
    'build-word',
    '{"instruction": "Susun kata dengan akhiran di tengah kata!", "questions": [
        {"word": "lampu", "syllables": ["lam", "pu"], "audioText": "lampu", "prompt": "Susun kata LAM-PU terang!", "options": ["pu", "lam", "kur", "si"], "hint": "lam lalu pu", "icon": "lampu"},
        {"word": "kursi", "syllables": ["kur", "si"], "audioText": "kursi", "prompt": "Susun kata KUR-SI kayu!", "options": ["si", "kur", "pen", "sil"], "hint": "kur lalu si", "icon": "kursi"},
        {"word": "pensil", "syllables": ["pen", "sil"], "audioText": "pensil", "prompt": "Susun kata PEN-SIL warna!", "options": ["sil", "pen", "pin", "tu"], "hint": "pen lalu sil", "icon": "pensil"},
        {"word": "pintu", "syllables": ["pin", "tu"], "audioText": "pintu", "prompt": "Susun kata PIN-TU rumah!", "options": ["tu", "pin", "lam", "pu"], "hint": "pin lalu tu", "icon": "pintu"}
    ]}',
    21
),
(
    'reading-r23',
    'reading-adventure',
    'R23',
    'Digraf Hebat (NG & NY)',
    'bunga, angin, nyamuk, banyak',
    23,
    'build-word',
    '{"instruction": "Kenali bunyi digraf NG dan NY!", "questions": [
        {"word": "bunga", "syllables": ["bu", "nga"], "audioText": "bunga", "prompt": "Susun kata BU-NGA wangi!", "options": ["nga", "bu", "nya", "muk"], "hint": "bu lalu nga", "icon": "bunga"},
        {"word": "angin", "syllables": ["a", "ngin"], "audioText": "angin", "prompt": "Susun kata A-NGIN sejuk!", "options": ["ngin", "a", "ba", "nyak"], "hint": "a lalu ngin", "icon": "balon"},
        {"word": "nyamuk", "syllables": ["nya", "muk"], "audioText": "nyamuk", "prompt": "Susun kata NYA-MUK!", "options": ["muk", "nya", "nga", "bu"], "hint": "nya lalu muk", "icon": "nyamuk"},
        {"word": "banyak", "syllables": ["ba", "nyak"], "audioText": "banyak", "prompt": "Susun kata BA-NYAK bintang!", "options": ["nyak", "ba", "ngin", "a"], "hint": "ba lalu nyak", "icon": "bintang"}
    ]}',
    22
),
(
    'reading-r24',
    'reading-adventure',
    'R24',
    'Membaca Kalimat Pendek Milo',
    'Milo lari, Ibu makan, Sapi makan',
    24,
    'tap-choose',
    '{"instruction": "Baca dan sentuh kalimat yang benar!", "questions": [
        {"target": "Milo lari", "audioText": "Milo lari", "prompt": "Mana tulisan: Milo lari?", "options": ["Milo lari", "Milo tidur", "Milo makan"], "hint": "Milo sedang lari!", "icon": "kucing"},
        {"target": "Ibu makan", "audioText": "Ibu makan", "prompt": "Mana tulisan: Ibu makan?", "options": ["Ibu makan", "Ibu minum", "Ibu tidur"], "hint": "Ibu sedang makan!", "icon": "roti"},
        {"target": "Sapi makan", "audioText": "Sapi makan", "prompt": "Mana tulisan: Sapi makan?", "options": ["Sapi makan", "Sapi lari", "Sapi tidur"], "hint": "Sapi makan rumput!", "icon": "sapi"}
    ]}',
    23
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;

-- ============================================================================
-- 3. PULAU BERHITUNG (24 STASIUN TINGKAT PERKEMBANGAN ANAK)
-- ============================================================================

INSERT INTO game_levels (id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required)
VALUES
(
    'counting-n1',
    'counting-adventure',
    'N1',
    'Kenalan Angka 1-3',
    'Kenali bentuk angka 1 sampai 3 dan jumlah benda',
    1,
    'count-tap',
    '{"instruction": "Ketuk benda untuk menghitung bersama Milo!", "questions": [
        {"targetCount": 1, "audioText": "satu", "prompt": "Ada berapa apel merah? Ketuk untuk menghitung!", "itemEmoji": "apel", "options": [1, 2, 3]},
        {"targetCount": 2, "audioText": "dua", "prompt": "Ada berapa ikan biru berenang? Ketuk keduanya!", "itemEmoji": "ikan", "options": [2, 1, 3]},
        {"targetCount": 3, "audioText": "tiga", "prompt": "Ada berapa bintang bersinar? Hitung ya!", "itemEmoji": "bintang", "options": [3, 2, 4]}
    ]}',
    0
),
(
    'counting-n2',
    'counting-adventure',
    'N2',
    'Kenalan Angka 4-5',
    'Kenali bentuk angka 4 dan 5 bersama Milo',
    2,
    'count-tap',
    '{"instruction": "Ketuk benda untuk menghitung 4 dan 5!", "questions": [
        {"targetCount": 4, "audioText": "empat", "prompt": "Ada berapa jeruk manis? Sentuh semuanya!", "itemEmoji": "jeruk", "options": [4, 3, 5]},
        {"targetCount": 5, "audioText": "lima", "prompt": "Ada berapa anak kucing ceria? Hitung yuk!", "itemEmoji": "kucing", "options": [5, 4, 3]}
    ]}',
    1
),
(
    'counting-n3',
    'counting-adventure',
    'N3',
    'Hitung Campuran 1-5',
    'Latihan berhitung cepat angka 1 sampai 5',
    3,
    'count-tap',
    '{"instruction": "Ayo hitung benda-benda lucu bersama Milo!", "questions": [
        {"targetCount": 2, "audioText": "dua", "prompt": "Hitung 2 donat lezat!", "itemEmoji": "donat", "options": [2, 3, 1]},
        {"targetCount": 3, "audioText": "tiga", "prompt": "Hitung 3 bola tendang!", "itemEmoji": "bola", "options": [3, 4, 2]},
        {"targetCount": 4, "audioText": "empat", "prompt": "Hitung 4 permen manis!", "itemEmoji": "permen", "options": [4, 5, 3]},
        {"targetCount": 5, "audioText": "lima", "prompt": "Hitung 5 balon warna-warni!", "itemEmoji": "balon", "options": [5, 4, 3]}
    ]}',
    2
),
(
    'counting-n4',
    'counting-adventure',
    'N4',
    'Kenalan Angka 6-7',
    'Kenali bentuk angka 6 dan 7',
    4,
    'count-tap',
    '{"instruction": "Hitung sampai angka enam dan tujuh!", "questions": [
        {"targetCount": 6, "audioText": "enam", "prompt": "Hitung 6 permen manis!", "itemEmoji": "permen", "options": [6, 5, 7]},
        {"targetCount": 7, "audioText": "tujuh", "prompt": "Hitung 7 balon warna-warni!", "itemEmoji": "balon", "options": [7, 6, 8]}
    ]}',
    3
),
(
    'counting-n5',
    'counting-adventure',
    'N5',
    'Kenalan Angka 8-10',
    'Hitung benda sampai angka sepuluh lengkap!',
    5,
    'count-tap',
    '{"instruction": "Ayo capai angka 10!", "questions": [
        {"targetCount": 8, "audioText": "delapan", "prompt": "Hitung 8 bunga matahari!", "itemEmoji": "bunga", "options": [8, 7, 9]},
        {"targetCount": 9, "audioText": "sembilan", "prompt": "Hitung 9 donat lezat!", "itemEmoji": "donat", "options": [9, 8, 10]},
        {"targetCount": 10, "audioText": "sepuluh", "prompt": "Luar biasa! Hitung 10 hati cinta!", "itemEmoji": "hati", "options": [10, 9, 8]}
    ]}',
    4
),
(
    'counting-n6',
    'counting-adventure',
    'N6',
    'Hitung Benda 1-10',
    'Tantangan menghitung benda acak sampai 10',
    6,
    'count-tap',
    '{"instruction": "Hitung semua benda yang muncul!", "questions": [
        {"targetCount": 6, "audioText": "enam", "prompt": "Hitung 6 biskuit cokelat!", "itemEmoji": "biskuit", "options": [6, 7, 5]},
        {"targetCount": 7, "audioText": "tujuh", "prompt": "Hitung 7 ikan berenang!", "itemEmoji": "ikan", "options": [7, 6, 8]},
        {"targetCount": 9, "audioText": "sembilan", "prompt": "Hitung 9 bintang berkelap-kelip!", "itemEmoji": "bintang", "options": [9, 8, 10]}
    ]}',
    5
),
(
    'counting-n7',
    'counting-adventure',
    'N7',
    'Mana Lebih Banyak? (1-5)',
    'Bandingkan jumlah benda bersama Milo',
    7,
    'tap-choose',
    '{"instruction": "Pilih kelompok yang LEBIH BANYAK!", "questions": [
        {"prompt": "Mana yang LEBIH BANYAK?", "options": ["3 Apel", "1 Apel"], "target": "3 Apel", "hint": "Tiga lebih banyak dari satu!", "icon": "apel"},
        {"prompt": "Mana yang LEBIH BANYAK?", "options": ["2 Ikan", "4 Ikan"], "target": "4 Ikan", "hint": "Empat lebih banyak dari dua!", "icon": "ikan"},
        {"prompt": "Mana yang LEBIH BANYAK?", "options": ["5 Bintang", "2 Bintang"], "target": "5 Bintang", "hint": "Lima lebih banyak dari dua!", "icon": "bintang"}
    ]}',
    6
),
(
    'counting-n8',
    'counting-adventure',
    'N8',
    'Mana Lebih Sedikit? (1-5)',
    'Pilih kelompok yang jumlahnya lebih sedikit',
    8,
    'tap-choose',
    '{"instruction": "Pilih kelompok yang LEBIH SEDIKIT!", "questions": [
        {"prompt": "Mana yang LEBIH SEDIKIT?", "options": ["2 Kucing", "5 Kucing"], "target": "2 Kucing", "hint": "Dua lebih sedikit dari lima!", "icon": "kucing"},
        {"prompt": "Mana yang LEBIH SEDIKIT?", "options": ["1 Donat", "4 Donat"], "target": "1 Donat", "hint": "Satu lebih sedikit dari empat!", "icon": "donat"},
        {"prompt": "Mana yang LEBIH SEDIKIT?", "options": ["3 Balon", "5 Balon"], "target": "3 Balon", "hint": "Tiga lebih sedikit dari lima!", "icon": "balon"}
    ]}',
    7
),
(
    'counting-n9',
    'counting-adventure',
    'N9',
    'Bandingkan Jumlah (1-10)',
    'Perbandingan angka lebih banyak dan sedikit sampai 10',
    9,
    'tap-choose',
    '{"instruction": "Pilih jawaban perbandingan yang tepat!", "questions": [
        {"prompt": "Mana angka yang LEBIH BESAR?", "options": ["8", "4"], "target": "8", "hint": "Delapan lebih besar dari empat!", "icon": "bintang"},
        {"prompt": "Mana angka yang LEBIH KECIL?", "options": ["3", "7"], "target": "3", "hint": "Tiga lebih kecil dari tujuh!", "icon": "bintang"},
        {"prompt": "Mana angka yang LEBIH BESAR?", "options": ["10", "6"], "target": "10", "hint": "Sepuluh lebih besar dari enam!", "icon": "bintang"}
    ]}',
    8
),
(
    'counting-n10',
    'counting-adventure',
    'N10',
    'Urutan Angka 1-5',
    'Tebak angka yang hilang dalam barisan 1 sampai 5',
    10,
    'tap-choose',
    '{"instruction": "Lengkapi angka yang hilang dalam urutan!", "questions": [
        {"prompt": "1, 2, ..., 4, 5. Angka berapa yang hilang?", "options": ["3", "2", "4"], "target": "3", "hint": "Setelah 2 adalah 3!", "icon": "bintang"},
        {"prompt": "1, ..., 3, 4, 5. Angka berapa yang hilang?", "options": ["2", "4", "5"], "target": "2", "hint": "Setelah 1 adalah 2!", "icon": "bintang"},
        {"prompt": "1, 2, 3, ..., 5. Angka berapa yang hilang?", "options": ["4", "3", "2"], "target": "4", "hint": "Setelah 3 adalah 4!", "icon": "bintang"}
    ]}',
    9
),
(
    'counting-n11',
    'counting-adventure',
    'N11',
    'Urutan Angka 6-10',
    'Lengkapi barisan angka 6 sampai 10',
    11,
    'tap-choose',
    '{"instruction": "Lengkapi angka yang hilang!", "questions": [
        {"prompt": "6, 7, ..., 9, 10. Angka berapa setelah 7?", "options": ["8", "7", "9"], "target": "8", "hint": "Tujuh lalu delapan!", "icon": "bintang"},
        {"prompt": "6, ..., 8, 9, 10. Angka berapa setelah 6?", "options": ["7", "6", "9"], "target": "7", "hint": "Enam lalu tujuh!", "icon": "bintang"},
        {"prompt": "6, 7, 8, ..., 10. Angka berapa sebelum 10?", "options": ["9", "8", "7"], "target": "9", "hint": "Sembilan sebelum sepuluh!", "icon": "bintang"}
    ]}',
    10
),
(
    'counting-n12',
    'counting-adventure',
    'N12',
    'Angka Nol (0) & Kosong',
    'Mengenal angka nol sebagai keadaan kosong',
    12,
    'tap-choose',
    '{"instruction": "Kenali angka nol bersama Milo!", "questions": [
        {"prompt": "Jika piring tidak ada makanan sama sekali, angkanya berapa?", "options": ["0", "1", "2"], "target": "0", "hint": "Kosong artinya nol (0)!", "icon": "mangkuk"},
        {"prompt": "Mana yang menunjukkan angka NOL?", "options": ["0", "1", "3"], "target": "0", "hint": "Angka nol bulat seperti telur!", "icon": "bintang"},
        {"prompt": "Ada 1 biskuit lalu dimakan habis, sisa berapa?", "options": ["0", "1", "2"], "target": "0", "hint": "Habis berarti sisa 0!", "icon": "biskuit"}
    ]}',
    11
),
(
    'counting-n13',
    'counting-adventure',
    'N13',
    'Belasan Ajaib (11-15)',
    'Hitung benda belasan 11 sampai 15',
    13,
    'count-tap',
    '{"instruction": "Hitung benda belasan bersama Milo!", "questions": [
        {"targetCount": 11, "audioText": "sebelas", "prompt": "Hitung 11 apel manis!", "itemEmoji": "apel", "options": [11, 10, 12]},
        {"targetCount": 12, "audioText": "dua belas", "prompt": "Hitung 12 ikan berenang!", "itemEmoji": "ikan", "options": [12, 11, 13]},
        {"targetCount": 15, "audioText": "lima belas", "prompt": "Luar biasa! Hitung 15 bintang!", "itemEmoji": "bintang", "options": [15, 14, 16]}
    ]}',
    12
),
(
    'counting-n14',
    'counting-adventure',
    'N14',
    'Belasan Ajaib (16-20)',
    'Menghitung sampai angka 20 penuh!',
    14,
    'count-tap',
    '{"instruction": "Ayo tantang diri sampai 20!", "questions": [
        {"targetCount": 16, "audioText": "enam belas", "prompt": "Hitung 16 permen ceria!", "itemEmoji": "permen", "options": [16, 15, 17]},
        {"targetCount": 18, "audioText": "delapan belas", "prompt": "Hitung 18 balon warna-warni!", "itemEmoji": "balon", "options": [18, 17, 19]},
        {"targetCount": 20, "audioText": "dua puluh", "prompt": "Hebat! Hitung 20 hati cinta!", "itemEmoji": "hati", "options": [20, 19, 18]}
    ]}',
    13
),
(
    'counting-n15',
    'counting-adventure',
    'N15',
    'Penjumlahan Sederhana (<= 3)',
    'Tambah makanan 1+1, 2+1, 1+2',
    15,
    'feed-mascot',
    '{"instruction": "Bantu Milo menjumlahkan makanan enak!", "questions": [
        {"numA": 1, "numB": 1, "result": 2, "itemEmoji": "ikan", "prompt": "1 ikan ditambah 1 ikan jadi berapa?", "options": [2, 1, 3]},
        {"numA": 2, "numB": 1, "result": 3, "itemEmoji": "apel", "prompt": "2 apel ditambah 1 apel jadi berapa?", "options": [3, 2, 4]},
        {"numA": 1, "numB": 2, "result": 3, "itemEmoji": "donat", "prompt": "1 donat ditambah 2 donat jadi berapa?", "options": [3, 4, 2]}
    ]}',
    14
),
(
    'counting-n16',
    'counting-adventure',
    'N16',
    'Penjumlahan Lezat (<= 5)',
    'Jumlahkan 2+2, 3+2, 4+1',
    16,
    'feed-mascot',
    '{"instruction": "Hitung semua makanan lalu ketuk jawaban benar!", "questions": [
        {"numA": 2, "numB": 2, "result": 4, "itemEmoji": "biskuit", "prompt": "2 biskuit ditambah 2 biskuit jadi berapa?", "options": [4, 3, 5]},
        {"numA": 3, "numB": 2, "result": 5, "itemEmoji": "kue", "prompt": "3 kue ditambah 2 kue jadi berapa?", "options": [5, 4, 3]},
        {"numA": 4, "numB": 1, "result": 5, "itemEmoji": "jeruk", "prompt": "4 jeruk ditambah 1 jeruk jadi berapa?", "options": [5, 6, 4]}
    ]}',
    15
),
(
    'counting-n17',
    'counting-adventure',
    'N17',
    'Penjumlahan Bintang (<= 7)',
    'Jumlahkan 3+3, 4+3, 5+2',
    17,
    'feed-mascot',
    '{"instruction": "Hitung penjumlahan sampai tujuh!", "questions": [
        {"numA": 3, "numB": 3, "result": 6, "itemEmoji": "ikan", "prompt": "3 ikan ditambah 3 ikan jadi berapa?", "options": [6, 5, 7]},
        {"numA": 4, "numB": 3, "result": 7, "itemEmoji": "apel", "prompt": "4 apel ditambah 3 apel jadi berapa?", "options": [7, 6, 8]},
        {"numA": 5, "numB": 2, "result": 7, "itemEmoji": "donat", "prompt": "5 donat ditambah 2 donat jadi berapa?", "options": [7, 8, 6]}
    ]}',
    16
),
(
    'counting-n18',
    'counting-adventure',
    'N18',
    'Penjumlahan Lengkap (<= 10)',
    'Jumlahkan 5+5, 6+3, 7+2',
    18,
    'feed-mascot',
    '{"instruction": "Ayo jumlahkan sampai sepuluh!", "questions": [
        {"numA": 5, "numB": 5, "result": 10, "itemEmoji": "bintang", "prompt": "5 bintang ditambah 5 bintang jadi berapa?", "options": [10, 9, 8]},
        {"numA": 6, "numB": 3, "result": 9, "itemEmoji": "permen", "prompt": "6 permen ditambah 3 permen jadi berapa?", "options": [9, 8, 10]},
        {"numA": 7, "numB": 2, "result": 9, "itemEmoji": "biskuit", "prompt": "7 biskuit ditambah 2 biskuit jadi berapa?", "options": [9, 10, 8]}
    ]}',
    17
),
(
    'counting-n19',
    'counting-adventure',
    'N19',
    'Pengurangan Sederhana (<= 3)',
    'Milo memakan 1 camilan: 2-1, 3-1, 3-2',
    19,
    'feed-mascot',
    '{"instruction": "Hitung berapa sisa makanan!", "questions": [
        {"numA": 2, "numB": 1, "result": 1, "operation": "-", "itemEmoji": "ikan", "prompt": "Ada 2 ikan, dimakan Milo 1. Berapa sisanya?", "options": [1, 2, 0]},
        {"numA": 3, "numB": 1, "result": 2, "operation": "-", "itemEmoji": "biskuit", "prompt": "Ada 3 biskuit, dimakan Milo 1. Berapa sisanya?", "options": [2, 1, 3]},
        {"numA": 3, "numB": 2, "result": 1, "operation": "-", "itemEmoji": "apel", "prompt": "Ada 3 apel, dimakan Milo 2. Berapa sisanya?", "options": [1, 2, 3]}
    ]}',
    18
),
(
    'counting-n20',
    'counting-adventure',
    'N20',
    'Pengurangan Seru Milo (<= 5)',
    'Hitung pengurangan 4-2, 5-1, 5-3',
    20,
    'feed-mascot',
    '{"instruction": "Milo makan lagi, hitung sisanya!", "questions": [
        {"numA": 4, "numB": 2, "result": 2, "operation": "-", "itemEmoji": "ikan", "prompt": "Ada 4 ikan, dimakan Milo 2. Berapa sisanya?", "options": [2, 3, 1]},
        {"numA": 5, "numB": 1, "result": 4, "operation": "-", "itemEmoji": "kue", "prompt": "Ada 5 kue, dimakan Milo 1. Berapa sisanya?", "options": [4, 3, 5]},
        {"numA": 5, "numB": 3, "result": 2, "operation": "-", "itemEmoji": "donat", "prompt": "Ada 5 donat, dimakan Milo 3. Berapa sisanya?", "options": [2, 1, 3]}
    ]}',
    19
),
(
    'counting-n21',
    'counting-adventure',
    'N21',
    'Pengurangan Mahir (<= 10)',
    'Hitung pengurangan 7-2, 8-3, 10-5',
    21,
    'feed-mascot',
    '{"instruction": "Tantangan pengurangan sampai 10!", "questions": [
        {"numA": 7, "numB": 2, "result": 5, "operation": "-", "itemEmoji": "apel", "prompt": "Ada 7 apel, dimakan Milo 2. Berapa sisanya?", "options": [5, 4, 6]},
        {"numA": 8, "numB": 3, "result": 5, "operation": "-", "itemEmoji": "biskuit", "prompt": "Ada 8 biskuit, dimakan Milo 3. Berapa sisanya?", "options": [5, 6, 4]},
        {"numA": 10, "numB": 5, "result": 5, "operation": "-", "itemEmoji": "ikan", "prompt": "Ada 10 ikan, dimakan Milo 5. Berapa sisanya?", "options": [5, 4, 6]}
    ]}',
    20
),
(
    'counting-n22',
    'counting-adventure',
    'N22',
    'Lompatan Puluhan (10-50)',
    'Kenali angka puluhan: 10, 20, 30, 40, 50',
    22,
    'tap-choose',
    '{"instruction": "Sentuh angka puluhan yang tepat!", "questions": [
        {"prompt": "Mana angka DUA PULUH?", "options": ["20", "12", "2"], "target": "20", "hint": "Angka 2 dengan 0 dibaca 20!", "icon": "bintang"},
        {"prompt": "Mana angka TIGA PULUH?", "options": ["30", "13", "3"], "target": "30", "hint": "Angka 3 dengan 0 dibaca 30!", "icon": "bintang"},
        {"prompt": "Mana angka LIMA PULUH?", "options": ["50", "15", "5"], "target": "50", "hint": "Angka 5 dengan 0 dibaca 50!", "icon": "bintang"}
    ]}',
    21
),
(
    'counting-n23',
    'counting-adventure',
    'N23',
    'Tebak Angka Lebih Besar (1-20)',
    'Bandingkan angka belasan dengan teliti',
    23,
    'tap-choose',
    '{"instruction": "Pilih angka yang lebih besar!", "questions": [
        {"prompt": "Mana yang LEBIH BESAR: 15 atau 12?", "options": ["15", "12"], "target": "15", "hint": "15 lebih banyak dari 12!", "icon": "bintang"},
        {"prompt": "Mana yang LEBIH BESAR: 18 atau 20?", "options": ["20", "18"], "target": "20", "hint": "20 lebih banyak dari 18!", "icon": "bintang"},
        {"prompt": "Mana yang LEBIH BESAR: 14 atau 19?", "options": ["19", "14"], "target": "19", "hint": "19 lebih banyak dari 14!", "icon": "bintang"}
    ]}',
    22
),
(
    'counting-n24',
    'counting-adventure',
    'N24',
    'Juara Berhitung Milo (1-50)',
    'Tantangan kelulusan pulau berhitung',
    24,
    'tap-choose',
    '{"instruction": "Jawab tantangan juara berhitung!", "questions": [
        {"prompt": "10 ditambah 10 jadi berapa?", "options": ["20", "15", "25"], "target": "20", "hint": "Sepuluh tambah sepuluh jadi 20!", "icon": "bintang"},
        {"prompt": "Urutan: 10, 20, 30, ..., 50. Angka berapa di tengah?", "options": ["40", "35", "45"], "target": "40", "hint": "Tiga puluh lalu empat puluh!", "icon": "bintang"},
        {"prompt": "Berapa hasil dari 5 + 5?", "options": ["10", "8", "9"], "target": "10", "hint": "Lima tambah lima sama dengan 10!", "icon": "hati"}
    ]}',
    23
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;

-- ============================================================================
-- 4. PESTA MAKAN MILO (22 STASIUN TINGKAT PERKEMBANGAN ANAK)
-- ============================================================================

INSERT INTO game_levels (id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required)
VALUES
(
    'feed-mini1',
    'feed-cat',
    'M1',
    'Tangkap Ikan Merah',
    'Ketuk 3 ikan merah yang berenang ke arah Milo!',
    1,
    'drag-drop',
    '{"instruction": "Ketuk 3 Ikan Merah kesukaan Milo!", "rounds": [
        {"targetColor": "merah", "targetEmoji": "ikan", "label": "Ikan Merah", "count": 3, "prompt": "Milo ingin 3 Ikan Merah yang manis!"}
    ]}',
    0
),
(
    'feed-mini2',
    'feed-cat',
    'M2',
    'Tangkap Ikan Emas',
    'Bantu Milo menangkap 4 ikan emas berkilau!',
    2,
    'drag-drop',
    '{"instruction": "Ketuk 4 Ikan Emas berkilau!", "rounds": [
        {"targetColor": "emas", "targetEmoji": "emas", "label": "Ikan Emas", "count": 4, "prompt": "Hebat! Sekarang tangkap 4 Ikan Emas!"}
    ]}',
    1
),
(
    'feed-mini3',
    'feed-cat',
    'M3',
    'Tangkap Ikan Biru',
    'Milo ingin 5 ikan biru segar!',
    3,
    'drag-drop',
    '{"instruction": "Ketuk 5 Ikan Biru segar!", "rounds": [
        {"targetColor": "biru", "targetEmoji": "ikan", "label": "Ikan Biru", "count": 5, "prompt": "Tangkap 5 Ikan Biru yang berenang cepat!"}
    ]}',
    2
),
(
    'feed-mini4',
    'feed-cat',
    'M4',
    'Mangkuk Biskuit (3 Biskuit)',
    'Pilih mangkuk yang berisi 3 biskuit ikan!',
    4,
    'feed-mascot',
    '{"instruction": "Pilih mangkuk dengan 3 biskuit!", "questions": [
        {"targetCount": 3, "prompt": "Milo ingin mangkuk dengan 3 biskuit!", "options": [3, 2, 4], "itemEmoji": "biskuit"}
    ]}',
    3
),
(
    'feed-mini5',
    'feed-cat',
    'M5',
    'Mangkuk Biskuit (5 Biskuit)',
    'Pilih mangkuk yang berisi 5 biskuit lezat!',
    5,
    'feed-mascot',
    '{"instruction": "Pilih mangkuk dengan 5 biskuit!", "questions": [
        {"targetCount": 5, "prompt": "Milo lapar, beri mangkuk 5 biskuit!", "options": [5, 4, 6], "itemEmoji": "biskuit"}
    ]}',
    4
),
(
    'feed-mini6',
    'feed-cat',
    'M6',
    'Mangkuk Biskuit (7 Biskuit)',
    'Pesta biskuit! Pilih mangkuk dengan 7 biskuit!',
    6,
    'feed-mascot',
    '{"instruction": "Pilih mangkuk dengan 7 biskuit!", "questions": [
        {"targetCount": 7, "prompt": "Pesta biskuit! Pilih mangkuk 7 biskuit!", "options": [7, 6, 8], "itemEmoji": "biskuit"}
    ]}',
    5
),
(
    'feed-mini7',
    'feed-cat',
    'M7',
    'Ikan Berenang Cepat',
    'Tangkap 4 ikan merah di antara ikan-ikan lain!',
    7,
    'drag-drop',
    '{"instruction": "Fokus! Tangkap 4 Ikan Merah!", "rounds": [
        {"targetColor": "merah", "targetEmoji": "ikan", "label": "Ikan Merah", "count": 4, "prompt": "Ayo fokus, tangkap 4 Ikan Merah yang berenang cepat!"}
    ]}',
    6
),
(
    'feed-mini8',
    'feed-cat',
    'M8',
    'Apel Merah Milo (3 Apel)',
    'Milo suka buah manis! Beri 3 apel segar!',
    8,
    'feed-mascot',
    '{"instruction": "Beri makan Milo 3 apel manis!", "questions": [
        {"targetCount": 3, "prompt": "Milo ingin 3 apel merah manis!", "options": [3, 2, 4], "itemEmoji": "apel"}
    ]}',
    7
),
(
    'feed-mini9',
    'feed-cat',
    'M9',
    'Apel Merah Milo (5 Apel)',
    'Sajikan 5 apel renyah di piring Milo!',
    9,
    'feed-mascot',
    '{"instruction": "Sajikan 5 apel di piring Milo!", "questions": [
        {"targetCount": 5, "prompt": "Sajikan 5 apel renyah untuk Milo!", "options": [5, 4, 6], "itemEmoji": "apel"}
    ]}',
    8
),
(
    'feed-mini10',
    'feed-cat',
    'M10',
    'Camilan Donat Milo (4 Donat)',
    'Milo ingin 4 donat bertabur meses!',
    10,
    'feed-mascot',
    '{"instruction": "Beri Milo 4 donat lezat!", "questions": [
        {"targetCount": 4, "prompt": "Milo ingin 4 donat pink bertabur meses!", "options": [4, 3, 5], "itemEmoji": "donat"}
    ]}',
    9
),
(
    'feed-mini11',
    'feed-cat',
    'M11',
    'Biskuit Cokelat Milo (6 Biskuit)',
    'Beri Milo piring berisi 6 biskuit cokelat!',
    11,
    'feed-mascot',
    '{"instruction": "Pilih piring dengan 6 biskuit!", "questions": [
        {"targetCount": 6, "prompt": "Milo ingin 6 biskuit cokelat gurih!", "options": [6, 5, 7], "itemEmoji": "biskuit"}
    ]}',
    10
),
(
    'feed-mini12',
    'feed-cat',
    'M12',
    'Berbagi Makanan: Ikan 1 + 2',
    'Gabungkan 1 ikan dan 2 ikan untuk Milo!',
    12,
    'feed-mascot',
    '{"instruction": "Hitung ikan dan sajikan ke Milo!", "questions": [
        {"numA": 1, "numB": 2, "result": 3, "itemEmoji": "ikan", "prompt": "1 ikan ditambah 2 ikan jadi berapa ya?", "options": [3, 2, 4]}
    ]}',
    11
),
(
    'feed-mini13',
    'feed-cat',
    'M13',
    'Berbagi Makanan: Ikan 2 + 2',
    'Gabungkan 2 ikan dan 2 ikan di piring Milo!',
    13,
    'feed-mascot',
    '{"instruction": "Jumlahkan ikan untuk Milo!", "questions": [
        {"numA": 2, "numB": 2, "result": 4, "itemEmoji": "ikan", "prompt": "2 ikan ditambah 2 ikan jadi berapa ya?", "options": [4, 3, 5]}
    ]}',
    12
),
(
    'feed-mini14',
    'feed-cat',
    'M14',
    'Berbagi Camilan: Donat 3 + 1',
    'Gabungkan 3 donat dan 1 donat untuk Milo!',
    14,
    'feed-mascot',
    '{"instruction": "Jumlahkan donat lezat!", "questions": [
        {"numA": 3, "numB": 1, "result": 4, "itemEmoji": "donat", "prompt": "3 donat ditambah 1 donat jadi berapa ya?", "options": [4, 5, 3]}
    ]}',
    13
),
(
    'feed-mini15',
    'feed-cat',
    'M15',
    'Milo Kenyang: Ikan 3 - 1',
    'Ada 3 ikan, dimakan Milo 1. Berapa sisanya?',
    15,
    'feed-mascot',
    '{"instruction": "Hitung sisa ikan di piring!", "questions": [
        {"numA": 3, "numB": 1, "result": 2, "operation": "-", "itemEmoji": "ikan", "prompt": "Ada 3 ikan, dimakan Milo 1. Berapa sisanya?", "options": [2, 1, 3]}
    ]}',
    14
),
(
    'feed-mini16',
    'feed-cat',
    'M16',
    'Milo Kenyang: Biskuit 4 - 2',
    'Ada 4 biskuit, dimakan Milo 2. Berapa sisanya?',
    16,
    'feed-mascot',
    '{"instruction": "Hitung sisa biskuit Milo!", "questions": [
        {"numA": 4, "numB": 2, "result": 2, "operation": "-", "itemEmoji": "biskuit", "prompt": "Ada 4 biskuit, dimakan Milo 2. Berapa sisanya?", "options": [2, 3, 1]}
    ]}',
    15
),
(
    'feed-mini17',
    'feed-cat',
    'M17',
    'Milo Kenyang: Apel 5 - 2',
    'Ada 5 apel, dimakan Milo 2. Berapa sisanya?',
    17,
    'feed-mascot',
    '{"instruction": "Hitung sisa apel di piring!", "questions": [
        {"numA": 5, "numB": 2, "result": 3, "operation": "-", "itemEmoji": "apel", "prompt": "Ada 5 apel, dimakan Milo 2. Berapa sisanya?", "options": [3, 2, 4]}
    ]}',
    16
),
(
    'feed-mini18',
    'feed-cat',
    'M18',
    'Tangkap Ikan Kilat di Danau',
    'Tangkap 5 ikan emas sebelum berenang pergi!',
    18,
    'drag-drop',
    '{"instruction": "Tangkap 5 Ikan Emas kilat!", "rounds": [
        {"targetColor": "emas", "targetEmoji": "emas", "label": "Ikan Emas", "count": 5, "prompt": "Cepat! Tangkap 5 Ikan Emas yang berenang lincah!"}
    ]}',
    17
),
(
    'feed-mini19',
    'feed-cat',
    'M19',
    'Mangkuk Pesta Besar (8 Biskuit)',
    'Pesta besar! Pilih mangkuk dengan 8 biskuit!',
    19,
    'feed-mascot',
    '{"instruction": "Pilih mangkuk dengan 8 biskuit!", "questions": [
        {"targetCount": 8, "prompt": "Pesta biskuit besar! Pilih mangkuk 8 biskuit!", "options": [8, 7, 9], "itemEmoji": "biskuit"}
    ]}',
    18
),
(
    'feed-mini20',
    'feed-cat',
    'M20',
    'Pesta Ulang Tahun Milo',
    'Tangkap 6 ikan merah perayaan ulang tahun!',
    20,
    'drag-drop',
    '{"instruction": "Tangkap 6 Ikan Merah ulang tahun!", "rounds": [
        {"targetColor": "merah", "targetEmoji": "ikan", "label": "Ikan Merah", "count": 6, "prompt": "Selamat ulang tahun Milo! Tangkap 6 Ikan Merah pesta!"}
    ]}',
    19
),
(
    'feed-mini21',
    'feed-cat',
    'M21',
    'Ikan Emas Spesial Milo',
    'Jumlahkan 5 ikan + 3 ikan pesta spesial!',
    21,
    'feed-mascot',
    '{"instruction": "Jumlahkan ikan pesta spesial!", "questions": [
        {"numA": 5, "numB": 3, "result": 8, "itemEmoji": "emas", "prompt": "5 ikan emas ditambah 3 ikan emas jadi berapa?", "options": [8, 7, 9]}
    ]}',
    20
),
(
    'feed-mini22',
    'feed-cat',
    'M22',
    'Master Koki Kucing Milo',
    'Tantangan akhir: 6 apel lezat + 4 apel manis!',
    22,
    'feed-mascot',
    '{"instruction": "Hitung sajian master koki Milo!", "questions": [
        {"numA": 6, "numB": 4, "result": 10, "itemEmoji": "apel", "prompt": "6 apel ditambah 4 apel jadi berapa ya?", "options": [10, 9, 8]}
    ]}',
    21
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;
