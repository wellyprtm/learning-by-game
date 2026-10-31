-- Seed data for Game Belajar Anak

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
    'Belajar membaca dari vokal ceria, suku kata terbuka, menyusun kata, hingga akhiran -ng dan digraf nyamuk.',
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
    'Mengenal angka 1-50, menghitung benda seru, membandingkan jumlah, serta penjumlahan dan pengurangan tanpa stres.',
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
    'Permainan ketangkasan interaktif memberi makan Milo si kucing dan menghitung makanan kesukaannya.',
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

-- 2. Insert Levels for Pulau Membaca
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
    '{
        "instruction": "Sentuh huruf yang disebutkan Milo!",
        "questions": [
            {"target": "A", "audioText": "A", "prompt": "Cari huruf A seperti Apel!", "options": ["A", "B", "O"], "hint": "Bentuknya seperti atap rumah!", "icon": "🍎"},
            {"target": "I", "audioText": "I", "prompt": "Cari huruf I seperti Ikan!", "options": ["U", "I", "E"], "hint": "Bentuknya seperti tiang ada titiknya!", "icon": "🐟"},
            {"target": "U", "audioText": "U", "prompt": "Cari huruf U seperti Ular!", "options": ["U", "O", "A"], "hint": "Bentuknya seperti mangkuk!", "icon": "🐍"},
            {"target": "E", "audioText": "E", "prompt": "Cari huruf E seperti Ember!", "options": ["I", "E", "A"], "hint": "Punya tiga garis ke samping!", "icon": "🪣"},
            {"target": "O", "audioText": "O", "prompt": "Cari huruf O seperti Obor!", "options": ["O", "U", "I"], "hint": "Bulat bundar seperti donat!", "icon": "🍩"}
        ]
    }',
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
    '{
        "instruction": "Dengarkan bunyi suku kata lalu ketuk yang benar!",
        "questions": [
            {"target": "ba", "audioText": "ba", "prompt": "Ketuk suku kata ba!", "options": ["ba", "bi", "bu"], "hint": "B bertemu A dibaca ba!", "icon": "🎈"},
            {"target": "bi", "audioText": "bi", "prompt": "Ketuk suku kata bi!", "options": ["bu", "bi", "bo"], "hint": "B bertemu I dibaca bi!", "icon": "🐝"},
            {"target": "bu", "audioText": "bu", "prompt": "Ketuk suku kata bu!", "options": ["be", "ba", "bu"], "hint": "B bertemu U dibaca bu seperti buku!", "icon": "📖"},
            {"target": "be", "audioText": "be", "prompt": "Ketuk suku kata be!", "options": ["be", "bo", "ba"], "hint": "B bertemu E dibaca be seperti bebek!", "icon": "🦆"},
            {"target": "bo", "audioText": "bo", "prompt": "Ketuk suku kata bo!", "options": ["bi", "bo", "bu"], "hint": "B bertemu O dibaca bo seperti bola!", "icon": "⚽"}
        ]
    }',
    1
),
(
    'reading-r3',
    'reading-adventure',
    'R3',
    'Suku Kata Ma Mi Mu Me Mo',
    'Gabungkan huruf M dan vokal bersama Milo',
    3,
    'tap-choose',
    '{
        "instruction": "Dengarkan bunyi suku kata lalu ketuk kartu yang cocok!",
        "questions": [
            {"target": "ma", "audioText": "ma", "prompt": "Ketuk suku kata ma seperti mata!", "options": ["ma", "mi", "mu"], "hint": "M bertemu A dibaca ma!", "icon": "👀"},
            {"target": "mi", "audioText": "mi", "prompt": "Ketuk suku kata mi seperti minum!", "options": ["mo", "me", "mi"], "hint": "M bertemu I dibaca mi!", "icon": "🥛"},
            {"target": "mu", "audioText": "mu", "prompt": "Ketuk suku kata mu seperti mulut!", "options": ["mu", "ma", "mi"], "hint": "M bertemu U dibaca mu!", "icon": "👄"},
            {"target": "me", "audioText": "me", "prompt": "Ketuk suku kata me seperti meja!", "options": ["mo", "me", "mu"], "hint": "M bertemu E dibaca me!", "icon": "🪑"},
            {"target": "mo", "audioText": "mo", "prompt": "Ketuk suku kata mo seperti mobil!", "options": ["ma", "mi", "mo"], "hint": "M bertemu O dibaca mo!", "icon": "🚗"}
        ]
    }',
    2
),
(
    'reading-r6',
    'reading-adventure',
    'R6',
    'Menyusun Kata 2 Suku Kata',
    'Susun bola, buku, sapi, mata',
    4,
    'build-word',
    '{
        "instruction": "Sentuh suku kata berurutan untuk menyusun kata!",
        "questions": [
            {"word": "bola", "syllables": ["bo", "la"], "audioText": "bola", "prompt": "Ayo susun kata BOLA!", "options": ["la", "bo", "sa", "ku"], "hint": "bo lalu la", "icon": "⚽"},
            {"word": "buku", "syllables": ["bu", "ku"], "audioText": "buku", "prompt": "Ayo susun kata BUKU!", "options": ["ku", "bu", "pi", "ma"], "hint": "bu lalu ku", "icon": "📖"},
            {"word": "sapi", "syllables": ["sa", "pi"], "audioText": "sapi", "prompt": "Ayo susun kata SAPI!", "options": ["pi", "bo", "sa", "ta"], "hint": "sa lalu pi", "icon": "🐄"},
            {"word": "mata", "syllables": ["ma", "ta"], "audioText": "mata", "prompt": "Ayo susun kata MATA!", "options": ["ta", "ku", "ma", "la"], "hint": "ma lalu ta", "icon": "👀"}
        ]
    }',
    3
),
(
    'reading-r8',
    'reading-adventure',
    'R8',
    'Kata Berakhiran (-n, -k, -m, -r, -s)',
    'Kenali kata: ikan, anak, malam, pasar, bus',
    5,
    'build-word',
    '{
        "instruction": "Susun kata dengan bunyi akhiran!",
        "questions": [
            {"word": "ikan", "syllables": ["i", "kan"], "audioText": "ikan", "prompt": "Susun kata I-KAN!", "options": ["kan", "i", "lam", "sar"], "hint": "i lalu kan", "icon": "🐟"},
            {"word": "anak", "syllables": ["a", "nak"], "audioText": "anak", "prompt": "Susun kata A-NAK!", "options": ["nak", "a", "bus", "kan"], "hint": "a lalu nak", "icon": "🧒"},
            {"word": "malam", "syllables": ["ma", "lam"], "audioText": "malam", "prompt": "Susun kata MA-LAM!", "options": ["lam", "ma", "sar", "nak"], "hint": "ma lalu lam", "icon": "🌙"},
            {"word": "pasar", "syllables": ["pa", "sar"], "audioText": "pasar", "prompt": "Susun kata PA-SAR!", "options": ["sar", "pa", "lam", "i"], "hint": "pa lalu sar", "icon": "🏪"}
        ]
    }',
    4
),
(
    'reading-r9',
    'reading-adventure',
    'R9',
    'Kata Berakhiran NG',
    'kucing, piring, bintang, pisang',
    6,
    'build-word',
    '{
        "instruction": "Dengarkan bunyi NG di akhir kata!",
        "questions": [
            {"word": "kucing", "syllables": ["ku", "cing"], "audioText": "kucing", "prompt": "Susun kata KU-CING seperti Milo!", "options": ["cing", "ku", "ring", "tang"], "hint": "ku lalu cing!", "icon": "🐱"},
            {"word": "piring", "syllables": ["pi", "ring"], "audioText": "piring", "prompt": "Susun kata PI-RING!", "options": ["ring", "pi", "sang", "cing"], "hint": "pi lalu ring!", "icon": "🍽️"},
            {"word": "bintang", "syllables": ["bin", "tang"], "audioText": "bintang", "prompt": "Susun kata BIN-TANG di langit malam!", "options": ["tang", "bin", "cing", "ring"], "hint": "bin lalu tang!", "icon": "⭐"},
            {"word": "pisang", "syllables": ["pi", "sang"], "audioText": "pisang", "prompt": "Susun kata PI-SANG buah manis!", "options": ["sang", "pi", "tang", "ku"], "hint": "pi lalu sang!", "icon": "🍌"}
        ]
    }',
    5
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;

-- 3. Insert Levels for Pulau Berhitung
INSERT INTO game_levels (id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required)
VALUES
(
    'counting-n1',
    'counting-adventure',
    'N1',
    'Kenalan Angka 1-5',
    'Kenali bentuk angka 1 sampai 5 dan jumlah benda',
    1,
    'count-tap',
    '{
        "instruction": "Ketuk benda untuk menghitung bersama Milo!",
        "questions": [
            {"targetCount": 1, "audioText": "satu", "prompt": "Ada berapa apel merah? Ketuk untuk menghitung!", "itemEmoji": "🍎", "options": [1, 2, 3]},
            {"targetCount": 2, "audioText": "dua", "prompt": "Ada berapa ikan biru berenang? Ketuk keduanya!", "itemEmoji": "🐟", "options": [2, 1, 3]},
            {"targetCount": 3, "audioText": "tiga", "prompt": "Ada berapa bintang bersinar? Hitung ya!", "itemEmoji": "⭐", "options": [3, 2, 4]},
            {"targetCount": 4, "audioText": "empat", "prompt": "Ada berapa jeruk manis? Sentuh semuanya!", "itemEmoji": "🍊", "options": [4, 3, 5]},
            {"targetCount": 5, "audioText": "lima", "prompt": "Ada berapa anak kucing ceria? Hitung yuk!", "itemEmoji": "🐱", "options": [5, 4, 3]}
        ]
    }',
    0
),
(
    'counting-n2',
    'counting-adventure',
    'N2',
    'Hitung Angka 6-10',
    'Belajar menghitung sampai 10 dengan gembira',
    2,
    'count-tap',
    '{
        "instruction": "Ayo hitung benda sampai sepuluh!",
        "questions": [
            {"targetCount": 6, "audioText": "enam", "prompt": "Hitung 6 permen manis!", "itemEmoji": "🍬", "options": [6, 5, 7]},
            {"targetCount": 7, "audioText": "tujuh", "prompt": "Hitung 7 balon warna-warni!", "itemEmoji": "🎈", "options": [7, 6, 8]},
            {"targetCount": 8, "audioText": "delapan", "prompt": "Hitung 8 bunga matahari!", "itemEmoji": "🌻", "options": [8, 7, 9]},
            {"targetCount": 9, "audioText": "sembilan", "prompt": "Hitung 9 donat lezat!", "itemEmoji": "🍩", "options": [9, 8, 10]},
            {"targetCount": 10, "audioText": "sepuluh", "prompt": "Luar biasa! Hitung 10 hati cinta!", "itemEmoji": "💖", "options": [10, 9, 8]}
        ]
    }',
    1
),
(
    'counting-n3',
    'counting-adventure',
    'N3',
    'Mana yang Lebih Banyak?',
    'Bandingkan jumlah benda bersama Milo',
    3,
    'tap-choose',
    '{
        "instruction": "Pilih kelompok yang jumlahnya LEBIH BANYAK!",
        "questions": [
            {"prompt": "Mana kelompok yang LEBIH BANYAK?", "options": ["🍎🍎🍎 (3 Apel)", "🍎 (1 Apel)"], "target": "🍎🍎🍎 (3 Apel)", "hint": "Tiga lebih banyak dari satu!"},
            {"prompt": "Mana kelompok yang LEBIH BANYAK?", "options": ["🐟🐟 (2 Ikan)", "🐟🐟🐟🐟 (4 Ikan)"], "target": "🐟🐟🐟🐟 (4 Ikan)", "hint": "Empat lebih banyak dari dua!"},
            {"prompt": "Mana kelompok yang LEBIH BANYAK?", "options": ["⭐⭐⭐⭐⭐ (5 Bintang)", "⭐⭐⭐ (3 Bintang)"], "target": "⭐⭐⭐⭐⭐ (5 Bintang)", "hint": "Lima lebih banyak dari tiga!"},
            {"prompt": "Mana kelompok yang LEBIH SEDIKIT?", "options": ["🐱🐱 (2 Kucing)", "🐱🐱🐱🐱🐱 (5 Kucing)"], "target": "🐱🐱 (2 Kucing)", "hint": "Dua lebih sedikit dari lima!"}
        ]
    }',
    2
),
(
    'counting-n5',
    'counting-adventure',
    'N5',
    'Penjumlahan Lezat (Hasil <= 5)',
    'Bantu Milo menjumlahkan makanan enak',
    4,
    'feed-mascot',
    '{
        "instruction": "Hitung semua makanan lalu ketuk jawaban yang benar!",
        "questions": [
            {"numA": 1, "numB": 1, "result": 2, "itemEmoji": "🐟", "prompt": "1 ikan ditambah 1 ikan jadi berapa ya?", "options": [2, 1, 3]},
            {"numA": 2, "numB": 1, "result": 3, "itemEmoji": "🍎", "prompt": "2 apel ditambah 1 apel jadi berapa ya?", "options": [3, 2, 4]},
            {"numA": 2, "numB": 2, "result": 4, "itemEmoji": "🍩", "prompt": "2 donat ditambah 2 donat jadi berapa ya?", "options": [4, 3, 5]},
            {"numA": 3, "numB": 2, "result": 5, "itemEmoji": "🧁", "prompt": "3 kue ditambah 2 kue jadi berapa ya?", "options": [5, 4, 3]}
        ]
    }',
    3
),
(
    'counting-n6',
    'counting-adventure',
    'N6',
    'Pengurangan Seru Milo (<= 5)',
    'Milo memakan sebagian biskuit lezat',
    5,
    'feed-mascot',
    '{
        "instruction": "Ada biskuit yang dimakan Milo, berapa sisanya?",
        "questions": [
            {"numA": 3, "numB": 1, "result": 2, "operation": "-", "itemEmoji": "🍪", "prompt": "Ada 3 biskuit, dimakan Milo 1. Berapa sisanya?", "options": [2, 1, 3]},
            {"numA": 4, "numB": 2, "result": 2, "operation": "-", "itemEmoji": "🐟", "prompt": "Ada 4 ikan, dimakan Milo 2. Berapa sisanya?", "options": [2, 3, 1]},
            {"numA": 5, "numB": 1, "result": 4, "operation": "-", "itemEmoji": "🧁", "prompt": "Ada 5 kue, dimakan Milo 1. Berapa sisanya?", "options": [4, 3, 5]},
            {"numA": 5, "numB": 3, "result": 2, "operation": "-", "itemEmoji": "🍎", "prompt": "Ada 5 apel, dimakan Milo 3. Berapa sisanya?", "options": [2, 1, 4]}
        ]
    }',
    4
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;

-- 4. Insert Levels for Pesta Makan Milo (Mini-game)
INSERT INTO game_levels (id, game_id, level_code, title, description, order_num, activity_type, items_json, unlock_stars_required)
VALUES
(
    'feed-mini1',
    'feed-cat',
    'M1',
    'Tangkap Ikan Renang',
    'Ketuk ikan warna-warni yang berenang ke arah Milo!',
    1,
    'drag-drop',
    '{
        "instruction": "Ketuk ikan kesukaan Milo yang berenang!",
        "rounds": [
            {"targetColor": "merah", "targetEmoji": "🐟", "label": "Ikan Merah", "count": 3, "prompt": "Milo ingin 3 Ikan Merah yang manis!"},
            {"targetColor": "emas", "targetEmoji": "🐠", "label": "Ikan Emas", "count": 4, "prompt": "Bagus! Sekarang tangkap 4 Ikan Emas!"},
            {"targetColor": "biru", "targetEmoji": "🐡", "label": "Ikan Biru", "count": 5, "prompt": "Hebat! Tangkap 5 Ikan Biru bulat!"}
        ]
    }',
    0
),
(
    'feed-mini2',
    'feed-cat',
    'M2',
    'Mangkuk Biskuit Ikan',
    'Pilih mangkuk yang memiliki jumlah biskuit tepat!',
    2,
    'feed-mascot',
    '{
        "instruction": "Pilih mangkuk biskuit yang pas untuk Milo!",
        "questions": [
            {"targetCount": 3, "prompt": "Milo ingin mangkuk dengan 3 biskuit!", "options": [3, 2, 4], "itemEmoji": "🐟"},
            {"targetCount": 5, "prompt": "Sekarang Milo lapar, pilih mangkuk 5 biskuit!", "options": [5, 4, 6], "itemEmoji": "🐟"},
            {"targetCount": 7, "prompt": "Pesta biskuit! Pilih mangkuk dengan 7 biskuit!", "options": [7, 6, 8], "itemEmoji": "🐟"}
        ]
    }',
    1
)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    items_json = EXCLUDED.items_json;
