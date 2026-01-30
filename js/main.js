/**
 * In Search of Light - Main JavaScript
 * YouTube 影片播放器功能
 */

(function () {
    'use strict';

    // ==================== 語言切換系統 ====================
    // 當前語言設定（預設為中文）
    let currentLang = 'zh';

    // ==================== 作品音訊同步配置 ====================
    /**
     * 作品音訊同步配置
     * 格式：{ 作品ID: { 語言: [時間節點陣列] } }
     * 
     * 時間節點格式：{ time: 秒數, slideIndex: slide 索引 }
     * slideIndex 從 0 開始（0 = 第一個 slide）
     * 
     * 注意：時間點為初步估算，可根據實際音檔長度微調
     */
    const workSyncConfig = {
        // 作品 1：3 個節點（3 個 slides）
        // 音檔總時長：中文約 2:00，英文約 2:54
        1: {
            zh: [
                { time: 0, slideIndex: 0 },
                { time: 60, slideIndex: 1 },
                { time: 120, slideIndex: 2 }
            ],
            en: [
                { time: 0, slideIndex: 0 },
                { time: 60, slideIndex: 1 },
                { time: 120, slideIndex: 2 }
            ]
        },

        // 作品 2：5 個節點（5 個 slides）
        // 音檔總時長：中文約 4:00，英文約 4:20
        2: {
            zh: [
                { time: 0, slideIndex: 0 },
                { time: 63, slideIndex: 1 },
                { time: 102, slideIndex: 2 },
                { time: 124, slideIndex: 3 },
                { time: 151, slideIndex: 4 }
            ],
            en: [
                { time: 0, slideIndex: 0 },
                { time: 63, slideIndex: 1 },
                { time: 102, slideIndex: 2 },
                { time: 124, slideIndex: 3 },
                { time: 151, slideIndex: 4 }
            ]
        },

        // 作品 3：3 個節點（3 個 slides）
        // 音檔總時長：中文約 2:00，英文約 2:10
        3: {
            zh: [
                { time: 0, slideIndex: 0 },
                { time: 144, slideIndex: 1 },
                { time: 176, slideIndex: 2 }
            ],
            en: [
                { time: 0, slideIndex: 0 },
                { time: 144, slideIndex: 1 },
                { time: 176, slideIndex: 2 }
            ]
        },

        // 作品 4：3 個節點（3 個 slides）
        // 音檔總時長：中文約 2:00，英文約 2:10
        4: {
            zh: [
                { time: 0, slideIndex: 0 },
                { time: 80, slideIndex: 1 },
                { time: 103, slideIndex: 2 }
            ],
            en: [
                { time: 0, slideIndex: 0 },
                { time: 80, slideIndex: 1 },
                { time: 103, slideIndex: 2 }
            ]
        },

        // 作品 6：5 個節點（5 個 slides）
        // 音檔總時長：中文約 4:00，英文約 4:20
        6: {
            zh: [
                { time: 0, slideIndex: 0 },
                { time: 58, slideIndex: 1 },
                { time: 107, slideIndex: 2 },
                { time: 178, slideIndex: 3 },
                { time: 229, slideIndex: 4 }
            ],
            en: [
                { time: 0, slideIndex: 0 },
                { time: 58, slideIndex: 1 },
                { time: 107, slideIndex: 2 },
                { time: 178, slideIndex: 3 },
                { time: 229, slideIndex: 4 }
            ]
        }
        // 作品 5、7、8 不需要同步功能
    };

    // ==================== 語音/作品音訊自動播放開關 ====================
    // true：進入語音導覽頁或點選作品時自動播放；false：不自動播放，需手動按播放
    // 客戶若之後要改回自動播放，將此處改為 true 即可
    const AUDIO_AUTOPLAY_ENABLED = false;

    // YouTube embed 診斷：僅輸出一次，供排查 153 等問題
    let youtubeDiagnosticLogged = false;

    // 翻譯物件
    const translations = {
        zh: {
            // 語言切換
            'lang.switch': 'EN',
            // 導航
            'nav.exhibition': '展覽簡介',
            'nav.audio': '語音導覽',
            'nav.survey': '滿意度調查',
            // 展覽簡介
            'exhibition.introVideo': '畫展介紹影片',
            'exhibition.title': '光之追尋——江賢二藝術展',
            'exhibition.description1': '江賢二的創作世界始終圍繞著「光」。半世紀來，他穿越孤獨、困惑、突破與重生，將生命不同階段的心境，化為一幅幅既沉靜又強韌的畫作。「光」在他的作品中不只是自然風景的折射，而是內在信念、精神性與希望的象徵。',
            'exhibition.description2': '本展以三個精神階段串起江賢二的創作軸線：',
            'exhibition.description3': '追尋光 → 遇見光 → 成為光。',
            'exhibition.seeking.title': '追尋光',
            'exhibition.seeking.subtitle': '源自他遷居台東後的轉變呈現江賢二在生命黑暗與封窗創作期的掙扎。',
            'exhibition.seeking.content': '《巴黎聖母院》、《淨化之夜》、《百年廟》到《銀湖》皆屬此階段。畫面多以黑、白、灰、褐為主，筆觸層層堆疊、刮除與覆寫，像是不斷在迷霧中摸索出口；然而在深沉的底層之下，仍能看見微弱但堅定的亮點，象徵著仍未放棄的希望。《銀湖》更是這段生命歷程的縮影——在女兒病情與創作瓶頸之間，他仍努力相信光會再度出現。「遇見光」源自他遷居台東後的轉變。自然光影、太平洋的海天與群山色層重新啟動他的色彩語言，使畫面變得明亮繽紛、自由並充滿流動感。《台灣山脈》捕捉不同天候下的光之變奏，而《比西里岸之夢》則展現他在自然與文化相遇後所獲得的創作新生命，色彩自由綻放，彷彿生命再度被光點亮。',
            'exhibition.encountering.title': '遇見光',
            'exhibition.encountering.subtitle': '源自他遷居台東後的轉變。',
            'exhibition.encountering.content': '自然光影、太平洋的海天與群山色層重新啟動他的色彩語言，使畫面變得明亮繽紛、自由並充滿流動感。《台灣山脈》捕捉不同天候下的光之變奏，而《比西里岸之夢》則展現他在自然與文化相遇後所獲得的創作新生命，色彩自由綻放，彷彿生命再度被光點亮。',
            'exhibition.becoming.title': '成為光',
            'exhibition.becoming.subtitle': '是一種生命的實踐。',
            'exhibition.becoming.content1': '本區以金樽江賢二藝術園區的影像作為展覽的終章，象徵他將多年對光的追尋，最終化為土地、建築與風景之中的真實存在。藝術在此不再侷限於畫布，而是成為照亮他人生活的力量。',
            'exhibition.becoming.content2': '這座園區同時也是共同發起人嚴長壽，透過眾多支持者，包括緯創資通與林憲銘董事長長年投入的社會實踐，承載著連結國際、展現台灣生活文明的願景，期望以藝術為媒介，使光在這片土地上持續被看見、被傳遞。',
            'exhibition.becoming.content3': '我們特別在每幅作品旁標註江老師創作時的年齡，期盼觀眾不只停留於欣賞，更能在觀看作品的同時，與自身生命產生照映：',
            'exhibition.becoming.content3.question': '在不同的年紀，我們正在追尋什麼？正面對什麼？又將走向哪一道光？',
            'exhibition.becoming.content4': '願這趟「尋光之旅」陪伴每一位走進展場的人——從觀看藝術，走向觀看自己。 光不必耀眼，只要能指引前行。願你在這裡，也找到屬於自己的那一道光。',
            'exhibition.opening': '2025.11.27 開幕式精華',
            'exhibition.gallery': '畫展剪影',
            // 語音導覽
            'audio.guide': '請點選平面圖上的展位號碼，並聆聽導覽語音',
            // 引言
            'work.0.title': '引言',
            'work.0.description': '引言內容（可於 main.js 翻譯中修改）',
            'work.0.image': '引言',
            'work.1.title': '《台灣山脈》系列',
            'work.1.age': '75歲',
            'work.1.description': '江賢二希望找一處有海的地方居住，有五年間，他和太太常從清晨就從台北開車往東海岸，經過宜蘭、花蓮，最終來到台東金樽，這讓他將對台灣山巒不同時間的光影印象化為《台灣山脈》系列。',
            'work.1.image1': '台灣山脈 17-17, 2017',
            // 作品 2
            'work.2.title': '《比西里岸之夢》',
            'work.2.image1': '比西里岸之夢 09-07, 2009',
            'work.2.age1': '67歲',
            'work.2.description1': '《比西里岸之夢》系列是江賢二移居台東後，最早發展的一個系列，畫面出現前所未見似繁花盛開的紅、淡粉紅、藍、亮黃色，他突破過去用色的極限，畫面瀰漫春之氣息。',
            'work.2.image2': '比西里岸之夢 10-07, 2010',
            'work.2.age2': '68歲',
            'work.2.description2': '這是江賢二個人極為喜歡的作品。畫面正中央及左上角的橫向流痕都是創作過程中自然衍生的，曖昧的淡藍與淡黃透出亮光，呈現一種清明之氣，雋永諧和。',
            'work.2.image3': '比西里岸之夢 11-41, 2011',
            'work.2.age3': '69歲',
            'work.2.description3': '光是色彩的靈魂。這幅畫的靈感源自江賢二對台東月光海的印象，天空一片月光，海裡也有一片月光，海面蕩漾出種種奇幻的色彩，畫面呈現光影的流動。',
            'work.2.image4': '比西里岸之夢 11-03, 2011',
            'work.2.age4': '69歲',
            'work.2.description4': '江賢二初到台東前三年的創作顯得熾烈、熱火、坦率歌頌大自然，像初戀男女的激情，他突破所有過去用色的極限，但不可思議的是畫面呈現同樣的純淨、盈滿。',
            'work.2.image5': '比西里岸之夢 15-03, 2015',
            'work.2.age5': '73歲',
            'work.2.description5': '到了台東，江賢二所畫的海終於呈現藍色，海水就像一副透鏡，隨時折射天光變化，撞擊出與陸地完全相異的色感。他每天與海相伴，眼中所見的是不同的海天變奏。',
            // 作品 3
            'work.3.title': '《巴黎聖母院》、《淨化之夜 94-01》系列',
            'work.3.image1': '巴黎聖母院 1982',
            'work.3.age1': '40歲',
            'work.3.description1': '住在紐約的江賢二重返巴黎，他封窗作畫，以熱門景點巴黎聖母院為題。聖母院在他的筆下寧靜異常，寫景寓情，畫出這幅畫後他終於覺得自己有資格當個藝術家。',
            'work.3.image2': '巴黎聖母院 82-21, 1982',
            'work.3.age2': '40歲',
            'work.3.description2': '黑沉沉的巴黎聖母院，江賢二半具象半抽象的展現巨大的十字架與背後的白光，畫面虔敬的精神性像是空氣，流動其間，這似乎是在長期自我懷疑下內在對光的渴求。',
            'work.3.image3': '淨化之夜 94-01, 1994',
            'work.3.age3': '52歲',
            'work.3.description3': '「淨化」是江賢二一生創作重要的主題，像是一條他不斷回頭面對的內在之路。在漫長的創作生涯，江賢二仍持續以追求崇高精神性的「淨化」，作為對創作的期許。',
            // 作品 4
            'work.4.title': '《百年廟》系列',
            'work.4.image1': '百年廟 98-17, 1998',
            'work.4.age1': '55歲',
            'work.4.description1': '江賢二回到台灣，街頭廟宇裡的龍柱、香火、燭光、裊裊的煙霧，讓他重新感受與土地、與文化與記憶的深刻連結。《百年廟》也成為他立足於台灣藝壇的重要系列創作。',
            'work.4.image2': '百年廟 98-07, 1998',
            'work.4.age2': '55歲',
            'work.4.description2': '畫面兩側厚重堆疊的筆觸，彷彿一根根通天的龍柱。中央細小而溫暖的光點，是陪伴人、給人力量的光。他以過去30年在異國淬鍊的純熟技巧，畫出東方溫暖的感覺。',
            'work.4.image3': '百年廟 98-16, 1998',
            'work.4.age3': '56歲',
            'work.4.description3': '剛回到台灣，雖然工作室簡陋，並沒有削弱江賢二日以繼夜創作的熱情。這些作品承載他層層堆疊的記憶、信仰與歸屬感，畫面中金銅色的光象徵著溫暖而不熄的永恆之光。',
            // 作品 5
            'work.5.title': '《對永恆的冥想 01-55》系列',
            'work.5.age': '59歲',
            'work.5.description': '江賢二將視線推向更遼闊的宇宙，以深藍、黑與細小如星塵的光點構成畫面，對他來說，宇宙並不是一個外在景象，而是一種通往內心、更廣闊存在的道路。',
            'work.5.image': '對永恆的冥想 01-55, 2001',
            // 作品 6
            'work.6.title': '《銀湖》系列',
            'work.6.image1': '銀湖 2006',
            'work.6.age1': '64歲',
            'work.6.description1': '江賢二回台定居10年後面臨創作瓶頸，他渴望突破、找到下一個方向，他說，「熟能生巧對於藝術家而言是個美麗的陷阱」，也因大女兒生病，他面臨人生與創作的雙重考驗。',
            'work.6.image2': '銀湖 08-07, 2008',
            'work.6.age2': '65歲',
            'work.6.description2': '他彷彿置身漫長黑夜等待著光，最終，他以黑白兩色創作出《銀湖》系列。畫面中看似外在的湖水與月光，其實是他在黑暗中等待光、並最終找到光的心境映照。',
            'work.6.image3': '銀湖 12-20, 2012',
            'work.6.age3': '70歲',
            'work.6.description3': '定居台東後，江賢二《銀湖》系列的色彩融入屬於台東的深藍與海氣。畫面彷彿無邊無際的太平洋水面，海與天被光霧柔化成一片朦朧的白，生命逐步走向開闊與平靜。',
            'work.6.image4': '比西里岸之夢 15-58, 2015',
            'work.6.age4': '73歲',
            'work.6.description4': '夜幕低垂，台東的月光靜靜落在水面上，映照出寧靜而深邃的倒影。江賢二讓色彩記錄月光進入夜的瞬間，深藍與金色交織，捕捉月光、水面與時間之間安詳而永恆的呼吸。',
            'work.6.image5': '銀湖 22-21, 2022',
            'work.6.age5': '80歲',
            'work.6.description5': '江賢二以純粹、自由的色彩呈現生命歷程中的沉澱與成熟。此時的《銀湖》，如同一縷微光滑過海面，細浪閃爍，彷彿銀帶般在深藍之中緩緩流動，映照夜色靜謐而深遠的光。',
            // 作品 7
            'work.7.title': '留言互動牆',
            'work.7.image': '留言互動牆',
            'work.7.description': '留言互動牆',
            // 作品 8
            'work.8.title': '江賢二藝術園區的自然、建築、藝術',
            'work.8.age': '',
            'work.8.description': '在眾人企盼多年下，終將於3/15開幕。園區坐落於靜謐的太平洋邊，由著名藝術家江賢二的舊畫室擴建而成，這座融合「自然、藝術、建築」的傑作由台灣與德國兩地執業的林友寒建築師與江賢二共同設計，江賢二藝術園區共同發起人嚴長壽擔任館長。',
            'work.8.image': '自然、建築、藝術',
            // Footer
            'footer.organizer': '主辦',
            'footer.curator': '策展',
            'footer.coorganizer': '協辦',
            // Meta
            'meta.title': '緯創 - 江賢二線上導覽 | In Search of Light',
            'meta.description': '探索光在不同文化中的意義與價值，透過藝術與科技的結合，呈現光的多樣面貌。匯集來自世界各地的藝術家作品，每一件作品都代表著對光的獨特詮釋與理解。',
            'meta.ogTitle': '緯創 - 江賢二線上導覽 | In Search of Light',
            'meta.ogDescription': '探索光在不同文化中的意義與價值，透過藝術與科技的結合，呈現光的多樣面貌。匯集來自世界各地的藝術家作品，每一件作品都代表著對光的獨特詮釋與理解。',
            // Structured Data
            'structuredData.name': '緯創 - 江賢二線上導覽',
            'structuredData.alternateName': 'In Search of Light',
            'structuredData.description': '探索光在不同文化中的意義與價值，透過藝術與科技的結合，呈現光的多樣面貌。匯集來自世界各地的藝術家作品，每一件作品都代表著對光的獨特詮釋與理解。',
            'structuredData.organizer.name': '緯創資通股份有限公司',
            'structuredData.keywords': '江賢二, 線上展覽, 藝術展覽, 光, 緯創, 線上導覽'
        },
        en: {
            // 語言切換
            'lang.switch': '中文',
            // 導航
            'nav.exhibition': 'Exhibition',
            'nav.audio': 'Audio Guide',
            'nav.survey': 'Satisfaction Survey',
            // 展覽簡介
            'exhibition.introVideo': 'Exhibition Introduction Video',
            'exhibition.title': 'In Search of Light — The Art of Paul Chiang',
            'exhibition.description1': 'For more than half a century, the art of Paul Chiang has revolved around a single, enduring theme: light. Across solitude, uncertainty, breakthrough, and renewal, Chiang has transformed each chapter of life into artworks that are both quiet and resilient. In his work, light is never just a reflection of nature—it is an inner conviction, a spiritual presence, and a symbol of hope.',
            'exhibition.description2': 'This exhibition traces his creative journey through three states of spirit:',
            'exhibition.description3': 'Seeking Light → Encountering Light → Becoming Light.',
            'exhibition.seeking.title': 'Seeking Light',
            'exhibition.seeking.subtitle': 'This section reveals Chiang\'s struggles during his dark years and his period of shuttered-window creation. Works such as Notre Dame de Paris, Transfigured Night, Hundred Year Temple, and Silver Lake belong to this stage.',
            'exhibition.seeking.content': 'Rendered mainly in black, white, gray, and brown, these paintings are built up through layering, scraping, and overwriting—like finding a path through fog. Beneath the density, faint but steady points of brightness remain, symbols of hope that endures. Silver Lake especially reflects this era, created amid his daughter’s illness and his own creative impasse, yet sustained by a belief that light would return.',
            'exhibition.encountering.title': 'Encountering Light',
            'exhibition.encountering.subtitle': 'A turning point came with Chiang\'s move to Taitung.',
            'exhibition.encountering.content': 'The natural light, the Pacific sky and sea, and the layered hues of the mountains rekindled his language of color. His works became bright, fluid, richly colored, and full of movement. Mountain Range of Taiwan captures shifting light under changing weather, while Pisirian embodies a creative rebirth—where culture, nature, and emotion meet, and color unfolds freely as though illuminated from within.',
            'exhibition.becoming.title': 'Becoming Light',
            'exhibition.becoming.subtitle': 'It is a practice of life.',
            'exhibition.becoming.content1': 'This final chapter is a way of living as light. Images of the Paul Chiang Art Center in Jinzun mark the culmination of his lifelong pursuit—light expressed through the land, architecture, and landscape.',
            'exhibition.becoming.content2': 'Here, art extends beyond the canvas and becomes a serene presence of light in the lives of others. The Art Center is also a long-term social endeavor co-founded with Stanley Yen and many supporters, carrying the hope of connecting Taiwan with the world and presenting a vision of everyday cultural richness—art as a bridge through which light continues to be shared.',
            'exhibition.becoming.content3': 'Throughout the exhibition, each label notes the age at which Chiang created the work. As you move through the exhibition, you may find reflections of your own journey:',
            'exhibition.becoming.content3.question': 'At this moment, what are you seeking? What are you facing? And where is your light leading you?',
            'exhibition.becoming.content4': 'May this journey toward light accompany you as you walk through the gallery.Light does not need to be dazzling—it only needs to guide. May you find your own light here.',
            'exhibition.opening': '2025.11.27 Opening Ceremony Highlights',
            'exhibition.gallery': 'Exhibition Gallery',
            // 語音導覽
            'audio.guide': 'Please click on the booth numbers on the floor plan and listen to the audio guide',
            // 引言
            'work.0.title': 'Introduction',
            'work.0.description': 'Introduction content (edit in main.js translations)',
            'work.0.image': 'Introduction',
            'work.1.title': 'Mountain Range of Taiwan series',
            'work.1.age': 'Age 75',
            'work.1.description': 'Paul Chiang longed to live by the sea. For five years, he and his wife often set out from Taipei at daybreak, traveling along Taiwan’s east coast, passing through Yilan and Hualien until they finally settled in Jinzun. These journeys shaped his impressions of shifting mountain light into the Mountain Range of Taiwan series.',
            'work.1.image1': 'Mountain Range of Taiwan 17-17, 2017',
            // 作品 2
            'work.2.title': 'Pisirian',
            'work.2.image1': 'Pisirian 09-07, 2009',
            'work.2.age1': 'Age 67',
            'work.2.description1': 'Pisirian is the first series Paul Chiang created after moving to Taitung. For the first time, the canvas bursts with colors resembling blooming flowers—vivid reds, soft pinks, blues, and bright yellows. In this work, he breaks through the limits of his previous palette, filling the picture with the atmosphere and vitality of spring.',
            'work.2.image2': 'Pisirian 10-07, 2010',
            'work.2.age2': 'Age 68',
            'work.2.description2': 'Among Paul Chiang\'s own favorites, the horizontal flow marks in the center and upper-left emerged naturally during the creative process. The subtle pale blue and yellow hues emit a gentle radiance, evoking a sense of clarity and quiet luminosity—timeless and harmonious.',
            'work.2.image3': 'Pisirian 11-41, 2011',
            'work.2.age3': 'Age 69',
            'work.2.description3': 'Immersed in Taitung’s moonlit sea, Paul Chiang created this work as a reflection of a sky washed in moonlight and a sea carrying its shimmering path of light. Fantastical hues ripple across the water, the canvas holding a quiet, breathing interplay of light and shadow.',
            'work.2.image4': 'Pisirian 11-03, 2011',
            'work.2.age4': 'Age 69',
            'work.2.description4': 'Immersed in Taitung’s moonlit sea, Paul Chiang created this work as a reflection of a sky washed in moonlight and a sea carrying its shimmering path of light. Fantastical hues ripple across the water, the canvas holding a quiet, breathing interplay of light and shadow.',
            'work.2.image5': 'Pisirian 15-03, 2015',
            'work.2.age5': 'Age 73',
            'work.2.description5': 'The sea in Paul Chiang\'s paintings finally emerged in blue. The sea is like a lens, constantly refracting shifting light into colors unseen on land. Living beside the ocean, he sees endless variations of sea and sky—each a quiet movement in nature\'s unfolding symphony.',
            // 作品 3
            'work.3.title': 'Notre Dame de Paris, Transfigured Night',
            'work.3.image1': 'Notre Dame de Paris 1982',
            'work.3.age1': 'Age 40',
            'work.3.description1': 'While living in New York, Paul Chiang returned to Paris and painted this piece with his windows shut, capturing Notre-Dame in an unusual, quiet stillness. When he completed it, he felt—for the first time—that he truly had the right to call himself an artist.',
            'work.3.image2': 'Notre Dame de Paris 82-21, 1982',
            'work.3.age2': 'Age 40',
            'work.3.description2': 'In this darkened view of Notre-Dame, Paul Chiang renders the monumental cross and its white light in a space between abstraction and figuration. A quiet spiritual undertone permeates the work, suggesting an inner longing for light after years of self-doubt.',
            'work.3.image3': 'Transfigured Night 94-01, 1994',
            'work.3.age3': 'Age 52',
            'work.3.description3': '"Purification" is one of the defining themes of Paul Chiang\'s work—an inner path he continually returns to. Throughout his long artistic journey, he has upheld this pursuit of spirituality as a guiding aspiration.',
            // 作品 4
            'work.4.title': 'Hundred Year Temple',
            'work.4.image1': 'Hundred Year Temple 98-17, 1998',
            'work.4.age1': 'Age 55',
            'work.4.description1': 'Returning to Taiwan, Paul Chiang felt a renewed connection to the land, culture, and memories evoked by temple scenes—the dragon pillars, incense, candlelight, and drifting smoke. His Hundred Year Temple series became a cornerstone of his artistic presence in Taiwan’s art world.',
            'work.4.image2': 'Hundred Year Temple 98-07, 1998',
            'work.4.age2': 'Age 55',
            'work.4.description2': 'The heavy, layered brushstrokes on both sides of the canvas rise like towering dragon pillars. At the center, a small, warm point of light evokes the gentle glow that accompanies and sustains. With technique refined over 30 years abroad, Paul Chiang\'s work carries the East\'s warmth and inner light.',
            'work.4.image3': 'Hundred Year Temple 98-16, 1998',
            'work.4.age3': 'Age 56',
            'work.4.description3': 'Newly returned to Taiwan, Paul Chiang\'s modest studio did nothing to dim his day-and-night passion for creation. These paintings carry his layered memories, faith, and sense of belonging, their golden-bronze light symbolizing a warm, enduring, ever-present glow.',
            // 作品 5
            'work.5.title': 'Meditation on Eternity series',
            'work.5.age': 'Age 59',
            'work.5.description': 'Paul Chiang turned his gaze toward a vaster cosmos, using deep blue, black, and stardust-like points of light. For him, the universe is not an external scene but a path inward—toward a broader, more expansive state of being.',
            'work.5.image': 'Meditation on Eternity 01-55, 2001',
            // 作品 6
            'work.6.title': 'Silver Lake, Pisirian',
            'work.6.image1': 'Silver Lake 2006',
            'work.6.age1': 'Age 64',
            'work.6.description1': 'A decade after returning to Taiwan, Paul Chiang found himself at a creative crossroads, yearning for a new direction. “For an artist, proficiency can be a beautiful trap,” he said. With his elder daughter’s illness, he faced a twofold challenge in both life and creation.',
            'work.6.image2': 'Silver Lake 08-07, 2008',
            'work.6.age2': 'Age 65',
            'work.6.description2': 'He seemed to dwell in a long night, waiting for light. In the end, he created the Silver Lake series in black and white. It appears to depict a lake and moonlight, but is in fact the reflection of his own state of mind—waiting for light in the darkness and ultimately finding it.',
            'work.6.image3': 'Silver Lake 12-20, 2012',
            'work.6.age3': 'Age 70',
            'work.6.description3': 'After settling in Taitung, the Silver Lake series has taken on the deep blues and ocean air of the coast. The canvas suggests the boundless Pacific, where sea and sky blur into a soft, luminous white—an image of life opening toward clarity and calm.',
            'work.6.image4': 'Pisirian 15-58, 2015',
            'work.6.age4': 'Age 73',
            'work.6.description4': 'As night descended, Taitung’s moonlight settled quietly on the water, casting a reflection both tranquil and deep. Through shifting tones of deep blue and gold that intertwine, Paul Chiang evokes the moment moonlight meets the night—capturing the quiet, timeless breath between moonlight, water, and time.',
            'work.6.image5': 'Silver Lake 22-21, 2022',
            'work.6.age5': 'Age 80',
            'work.6.description5': 'His pure and transparent color conveys a quiet, distilled clarity. The Silver Lake series feels like a faint gleam gliding across the sea, where small waves shimmer and a silver ribbon drifts through deep blue—carrying a light that is tranquil and far-reaching in the night.',
            // 作品 7
            'work.7.title': 'Message Wall',
            'work.7.image': 'Message Wall',
            'work.7.description': 'Message Wall',
            // 作品 8
            'work.8.title': 'Nature, Architecture, and Art of Paul Chiang Art Center',
            'work.8.age': '',
            'work.8.description': 'After years of anticipation, it will finally open on March 15. The center is located by the tranquil Pacific, expanded from the old studio of renowned artist Paul Chiang. This masterpiece combining "nature, art, and architecture" was co-designed by architect Lin You-han, who practices in both Taiwan and Germany, and Paul Chiang. Stanley Yen, co-founder of the Paul Chiang Art Center, serves as the director.',
            'work.8.image': 'Nature, Architecture, and Art',
            // Footer
            'footer.organizer': 'Organizer',
            'footer.curator': 'Curator',
            'footer.coorganizer': 'Co-organizer',
            // Meta
            'meta.title': 'In Search of Light - Paul Chiang\'s Life Journey for Art  | Wistron',
            'meta.description': 'Exploring the meaning and value of light in different cultures, presenting the diverse aspects of light through the combination of art and technology. Featuring works from artists around the world, each piece represents a unique interpretation and understanding of light.',
            'meta.ogTitle': 'In Search of Light - Paul Chiang\'s Life Journey for Art  | Wistron',
            'meta.ogDescription': 'Exploring the meaning and value of light in different cultures, presenting the diverse aspects of light through the combination of art and technology. Featuring works from artists around the world, each piece represents a unique interpretation and understanding of light.',
            // Structured Data
            'structuredData.name': 'In Search of Light - Paul Chiang\'s Life Journey for Art  | Wistron',
            'structuredData.alternateName': 'In Search of Light',
            'structuredData.description': 'Exploring the meaning and value of light in different cultures, presenting the diverse aspects of light through the combination of art and technology. Featuring works from artists around the world, each piece represents a unique interpretation and understanding of light.',
            'structuredData.organizer.name': 'Wistron Corporation',
            'structuredData.keywords': 'Paul Chiang, Online Exhibition, Art Exhibition, Light, Wistron, Online Tour'
        }
    };

    /**
     * 套用翻譯到所有帶有 data-i18n 屬性的元素
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     */
    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        const langData = translations[lang] || translations['zh'];

        elements.forEach(function (element) {
            const key = element.getAttribute('data-i18n');
            const translation = langData[key];

            if (translation) {
                // 如果是 meta 標籤，更新 content 屬性
                if (element.tagName === 'META') {
                    element.setAttribute('content', translation);
                } else if (element.tagName === 'TITLE') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // 處理帶有 data-i18n-src 屬性的圖片元素（語言切換時更新圖片 src）
        const imageElements = document.querySelectorAll('[data-i18n-src]');
        imageElements.forEach(function (element) {
            try {
                const srcConfig = JSON.parse(element.getAttribute('data-i18n-src'));
                if (srcConfig && srcConfig[lang]) {
                    element.src = srcConfig[lang];
                } else if (srcConfig && srcConfig['zh']) {
                    // 如果當前語言沒有配置，回退到中文
                    element.src = srcConfig['zh'];
                }
            } catch (e) {
                console.warn('無法解析 data-i18n-src 屬性:', element, e);
            }
        });

        // 更新 Structured Data (JSON-LD)
        updateStructuredData(lang);

        // 更新 og:locale meta 標籤
        const ogLocaleElement = document.querySelector('meta[property="og:locale"]');
        if (ogLocaleElement) {
            try {
                const localeConfig = JSON.parse(ogLocaleElement.getAttribute('data-i18n-locale') || '{"zh": "zh_TW", "en": "en_US"}');
                if (localeConfig && localeConfig[lang]) {
                    ogLocaleElement.setAttribute('content', localeConfig[lang]);
                }
            } catch (e) {
                // 如果解析失敗，使用預設值
                ogLocaleElement.setAttribute('content', lang === 'zh' ? 'zh_TW' : 'en_US');
            }
        }

        // 更新 html lang 屬性
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
        document.documentElement.setAttribute('data-lang', lang);
    }

    /**
     * 更新 Structured Data (JSON-LD)
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     */
    function updateStructuredData(lang) {
        const scriptElement = document.getElementById('structuredData');
        if (!scriptElement) {
            return;
        }

        const langData = translations[lang] || translations['zh'];

        try {
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "ExhibitionEvent",
                "name": langData['structuredData.name'] || '緯創 - 江賢二線上導覽',
                "alternateName": langData['structuredData.alternateName'] || 'In Search of Light',
                "description": langData['structuredData.description'] || '',
                "organizer": {
                    "@type": "Organization",
                    "name": langData['structuredData.organizer.name'] || '緯創資通股份有限公司',
                    "alternateName": "Wistron Corporation",
                    "url": "https://www.wistron.com"
                },
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "location": {
                    "@type": "VirtualLocation",
                    "url": window.location.href
                },
                "image": "images/ogimg.png",
                "keywords": langData['structuredData.keywords'] || '江賢二, 線上展覽, 藝術展覽, 光, 緯創, 線上導覽'
            };

            scriptElement.textContent = JSON.stringify(structuredData, null, 2);
        } catch (e) {
            console.warn('更新 Structured Data 失敗:', e);
        }
    }

    /**
     * 更新 URL hash（使用 pushState 建立歷史記錄）
     * @param {string} hash - 新的 hash 值（不包含 #）
     * @param {boolean} replace - 是否使用 replaceState 而非 pushState（預設為 false）
     */
    function updateHash(hash, replace = false) {
        const newHash = hash ? '#' + hash : '';
        const currentHash = window.location.hash;
        const baseUrl = window.location.origin + window.location.pathname;
        const newUrl = baseUrl + newHash;

        console.log('[History] updateHash 開始', {
            currentHash: currentHash,
            newHash: newHash,
            replace: replace,
            currentUrl: window.location.href,
            newUrl: newUrl
        });

        // 如果新的 hash 與當前 hash 相同，不執行任何操作
        if (currentHash === newHash || (currentHash === '' && newHash === '')) {
            console.log('[History] updateHash: hash 相同，跳過更新');
            return;
        }

        // 標記正在更新 hash，避免觸發 hashchange 事件時重複處理
        window._isUpdatingHash = true;

        // 對於 hash-based routing，直接更新 window.location.hash 會自動建立歷史記錄
        // 這是瀏覽器的標準行為，最簡單和最可靠的方法

        if (replace) {
            // 使用 replaceState，不建立新的歷史記錄
            // 先更新 window.location.hash，這樣瀏覽器會立即更新地址欄
            window.location.hash = newHash;
            // 然後使用 replaceState 同步歷史記錄（使用當前 URL，因為 hash 已經更新了）
            // 這樣可以替換當前歷史記錄，而不是建立新的
            history.replaceState({ hash: hash }, '', window.location.href);
            console.log('[History] updateHash: 使用 replaceState', {
                hash: hash,
                url: window.location.href,
                historyLength: history.length
            });
        } else {
            // 使用 pushState 建立歷史記錄
            // 直接更新 window.location.hash，這會自動建立歷史記錄
            // 這是瀏覽器的標準行為，不需要額外的 pushState
            window.location.hash = newHash;

            console.log('[History] updateHash: 使用 pushState（通過 hash 更新）', {
                hash: hash,
                url: window.location.href,
                historyLength: history.length,
                actualHash: window.location.hash,
                beforeHash: currentHash
            });
        }

        // 清除標記（延遲清除，確保 hashchange 事件已處理）
        // 注意：hashchange 事件是同步觸發的，所以我們需要在同一個事件循環中清除標記
        // 但為了確保所有 hashchange 監聽器都已執行，我們使用 setTimeout
        setTimeout(() => {
            window._isUpdatingHash = false;
            console.log('[History] updateHash: 清除 _isUpdatingHash 標記', {
                finalHash: window.location.hash,
                historyLength: history.length
            });
        }, 0); // 改為 0ms，確保在下一個事件循環中清除，但不會太晚
    }

    /**
     * 切換語言
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     */
    function switchLanguage(lang, shouldUpdateHash = true) {
        if (lang !== 'zh' && lang !== 'en') {
            lang = 'zh';
        }

        console.log('[History] switchLanguage 開始', {
            lang: lang,
            currentLang: currentLang,
            shouldUpdateHash: shouldUpdateHash,
            currentHash: window.location.hash
        });

        currentLang = lang;
        applyTranslations(lang);

        // 儲存到 localStorage
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            // localStorage 不可用時忽略錯誤
        }

        // 重新載入音訊檔案（根據新語言）
        reloadAudioForLanguage(lang);

        // 只有在需要時才更新 URL hash
        if (!shouldUpdateHash) {
            console.log('[History] switchLanguage: shouldUpdateHash 為 false，跳過更新 hash');
            return;
        }

        // 更新 URL hash
        const currentHash = window.location.hash.replace('#', '');

        // 獲取當前 tab 和作品名稱
        const hashInfo = getTabFromHash();

        // 計算目標 hash
        let targetHash = '';
        if (currentHash === 'en' || currentHash === 'zh') {
            // 如果當前 hash 是 'en' 或 'zh'，直接更新語言 hash
            targetHash = lang === 'en' ? 'en' : '';
        } else if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
            // 如果當前在作品詳情頁面，更新 URL 以包含語言
            targetHash = lang === 'en' ? 'en/' + hashInfo.workName : hashInfo.workName;
        } else if (hashInfo.tab === 'audio') {
            // 如果當前在語音導覽頁面
            targetHash = lang === 'en' ? 'en/audio' : 'audio';
        } else {
            // 如果沒有 hash 或是在展覽簡介頁面，直接設置語言 hash
            targetHash = lang === 'en' ? 'en' : '';
        }

        // 檢查目標 hash 是否與當前 hash 相同
        const targetHashWithPrefix = targetHash ? '#' + targetHash : '';
        if (window.location.hash === targetHashWithPrefix) {
            console.log('[History] switchLanguage: hash 已經正確，跳過更新', {
                currentHash: window.location.hash,
                targetHash: targetHashWithPrefix
            });
            return;
        }

        // 使用 replaceState 來替換歷史記錄，而不是建立新的
        // 因為這是由 hashchange 事件觸發的語言同步，不應該建立新的歷史記錄
        console.log('[History] switchLanguage: 更新 hash', {
            targetHash: targetHash,
            usingReplace: true
        });
        updateHash(targetHash, true); // 使用 replace 模式，不建立新的歷史記錄
    }

    /**
     * 初始化語言系統
     */
    function initLanguage() {
        // 從 URL hash 讀取語言設定
        const hashInfo = getTabFromHash();
        if (hashInfo.lang === 'en') {
            currentLang = 'en';
        } else {
            // 如果 hash 中沒有語言資訊，從 localStorage 讀取
            try {
                const savedLang = localStorage.getItem('preferredLanguage');
                if (savedLang === 'en' || savedLang === 'zh') {
                    currentLang = savedLang;
                } else {
                    currentLang = 'zh'; // 預設為中文
                }
            } catch (e) {
                // localStorage 不可用時使用預設語言（中文）
                currentLang = 'zh';
            }
        }

        // 套用翻譯
        applyTranslations(currentLang);

        // 綁定語言切換按鈕事件
        const langButtons = document.querySelectorAll('.language a');
        langButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const newLang = currentLang === 'zh' ? 'en' : 'zh';
                switchLanguage(newLang);
            });
        });
    }

    /**
     * 重新載入音訊檔案（根據語言）
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     */
    function reloadAudioForLanguage(lang) {
        // 重新載入主要音訊播放器（語音導覽區域）
        if (window.audioVideoPlayer && typeof window.audioVideoPlayer.pause === 'function') {
            try {
                const currentTime = window.audioVideoPlayer.currentTime();
                const wasPlaying = !window.audioVideoPlayer.paused();

                window.audioVideoPlayer.src({
                    type: 'audio/mpeg',
                    src: getMainAudioFile(lang)
                });

                // 如果原本在播放，繼續播放
                if (wasPlaying) {
                    window.audioVideoPlayer.ready(function () {
                        window.audioVideoPlayer.currentTime(currentTime);
                        window.audioVideoPlayer.play().catch(function (err) {
                            console.warn('播放錯誤:', err);
                        });
                    });
                }
            } catch (e) {
                console.warn('重新載入主要音訊失敗:', e);
            }
        }

        // 重新載入所有作品播放器（0=引言, 1～8=作品1～8）
        for (let i = 0; i <= 8; i++) {
            const playerId = 'workAudioPlayer' + i;
            try {
                if (typeof videojs !== 'undefined') {
                    const player = videojs.getPlayer(playerId);
                    if (player) {
                        const currentTime = player.currentTime();
                        const wasPlaying = !player.paused();

                        player.src({
                            type: 'audio/mpeg',
                            src: getWorkAudioFile(lang, i)
                        });

                        // 如果原本在播放，繼續播放
                        if (wasPlaying) {
                            player.ready(function () {
                                player.currentTime(currentTime);
                                player.play().catch(function (err) {
                                    console.warn('播放錯誤:', err);
                                });
                            });
                        }
                    }
                }
            } catch (e) {
                // 播放器可能尚未初始化，忽略錯誤
            }
        }
    }

    // ==================== 語言切換系統結束 ====================

    // ==================== 自動播放錯誤處理 ====================
    /**
     * 處理自動播放錯誤
     * 對於瀏覽器自動播放政策限制（NotAllowedError）進行靜默處理
     * @param {Error} err - 錯誤對象
     * @param {string} context - 錯誤上下文（用於日誌）
     * @param {Function} onError - 錯誤回調函數（可選）
     */
    function handleAutoplayError(err, context = '', onError) {
        // NotAllowedError 是瀏覽器自動播放政策限制，這是預期的行為，不需要顯示錯誤
        if (err && err.name === 'NotAllowedError') {
            // 靜默處理，不顯示錯誤訊息
            if (onError && typeof onError === 'function') {
                onError();
            }
            return;
        }

        // 其他錯誤才顯示警告
        if (context) {
            console.warn(`[${context}] 自動播放失敗:`, err);
        } else {
            console.warn('自動播放失敗:', err);
        }

        if (onError && typeof onError === 'function') {
            onError();
        }
    }

    // ==================== YouTube 影片功能 ====================
    // YouTube 影片 ID - 上方主要播放的影片
    const youtubeVideoId = 'NoDJ_ltS8-k';

    // 儲存 YouTube iframe 的原始 src，用於恢復播放
    let youtubeIframeOriginalSrc = null;

    // 作品英文名稱陣列 - 對應作品 0～8（0=引言，1～8=作品1～8），用於 URL hash
    const workNames = [
        'Work_0',  // 作品 0 引言
        'Work_1',  // 作品 1
        'Work_2',  // 作品 2
        'Work_3',  // 作品 3
        'Work_4',  // 作品 4
        'Work_5',  // 作品 5
        'Work_6',  // 作品 6
        'Work_7',  // 作品 7
        'Work_8'   // 作品 8
    ];

    // ==================== 音訊檔案管理（支援中英文版本） ====================
    /**
     * 根據語言和檔案編號取得音訊檔案路徑
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     * @param {number} fileIndex - 檔案編號 (0-9, 0=主要音訊, 1-9=作品音訊)
     * @returns {string} 音訊檔案路徑
     */
    function getAudioFile(lang, fileIndex) {
        // 格式化檔案編號（00, 01, 02, ...）
        const fileNumber = String(fileIndex).padStart(2, '0');

        // 音訊檔案路徑結構：
        // 中文版：images/audio/zh/{編號}.mp3（標準結構）
        //         或 images/audio/{編號}.mp3（過渡期，如果 zh 資料夾不存在）
        // 英文版：images/audio/en/{編號}.mp3（未來提供後）
        //         或 images/audio/{編號}.mp3（過渡期，暫時使用中文版）
        if (lang === 'en') {
            // 英文版路徑
            // 未來提供英文版後，取消註解下面這行：
            // return `images/audio/en/${fileNumber}.mp3`;
            // 目前英文版尚未提供，暫時使用中文版檔案
            return `images/audio/zh/${fileNumber}.mp3`; // 暫時使用中文檔案
        } else {
            // 中文版路徑
            return `images/audio/zh/${fileNumber}.mp3`;
        }
    }

    /**
     * 取得主要音訊檔案（語音導覽區域）
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     * @returns {string} 音訊檔案路徑
     */
    function getMainAudioFile(lang) {
        return getAudioFile(lang, 0); // 00.mp3
    }

    /**
     * 取得作品音訊檔案
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     * @param {number} workId - 作品編號 (0=引言, 1-8=作品1～8)
     * @returns {string} 音訊檔案路徑
     *
     * 語音導覽主音訊：00.mp3（getMainAudioFile）
     * 引言（作品0）：00-intro.mp3（可與語音導覽不同；請在 images/audio/zh/、en/ 放入該檔）
     * 作品1～8：01.mp3～08.mp3
     */
    function getWorkAudioFile(lang, workId) {
        // 作品 0（引言）使用獨立檔 00-intro.mp3，與語音導覽的 00.mp3 分開
        if (workId === 0) {
            return `images/audio/${lang}/00-intro.mp3`;
        }
        return getAudioFile(lang, workId); // 01.mp3, 02.mp3, ..., 08.mp3
    }

    /**
     * 建立 YouTube 嵌入 URL
     * @param {string} videoId - YouTube 影片 ID
     * @param {boolean} autoplay - 是否自動播放，預設為 false
     * @returns {string} YouTube 嵌入 URL
     */
    function getYouTubeEmbedUrl(videoId, autoplay = false) {
        // 檢查 videoId 是否有效
        if (!videoId || videoId.trim() === '') {
            console.error('YouTube video ID is empty');
            return '';
        }

        // 添加更多參數以改善相容性和功能
        // 不寫入 origin 參數：由瀏覽器自然送 Referer，與開發站一致，避免正式站 153
        const currentOrigin = window.location.origin;
        const productionDomain = 'in-search-of-light.wistronladiesopen.com';
        const isProduction = currentOrigin.includes(productionDomain) ||
            currentOrigin.includes('wistronladiesopen.com');

        const params = new URLSearchParams({
            'autoplay': autoplay ? '1' : '0',
            'rel': '0', // 不顯示相關影片
            'modestbranding': '1', // 減少 YouTube 品牌標識
            'enablejsapi': '1', // 啟用 JavaScript API
            'playsinline': '1', // 在 iOS 上內聯播放
            'iv_load_policy': '3', // 不顯示註解
            'fs': '1', // 允許全螢幕
            'cc_load_policy': '0', // 不自動顯示字幕
            'widget_referrer': currentOrigin // 用於追蹤和權限檢查
        });

        // 不設定 origin：實測正式站寫入 origin 會導致全部瀏覽器 153，改由瀏覽器送 Referer
        const originInUrl = null;

        const fullEmbedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

        // 診斷用：僅第一次產生 embed URL 時輸出，請將結果提供給開發人員
        if (!youtubeDiagnosticLogged) {
            youtubeDiagnosticLogged = true;
            const diagnostic = {
                '【1】頁面資訊（實際載入的網域）': {
                    'location.origin': window.location.origin,
                    'location.hostname': window.location.hostname,
                    'location.href': window.location.href,
                    'document.referrer': document.referrer || '(空)',
                    'document.referrerPolicy': typeof document.referrerPolicy !== 'undefined' ? document.referrerPolicy : '(無法取得)'
                },
                '【2】embed 參數（送給 YouTube 的）': {
                    'currentOrigin': currentOrigin,
                    'productionDomain': productionDomain,
                    'isProduction': isProduction,
                    'origin 是否寫入 URL': originInUrl != null ? originInUrl : '(未設定)',
                    'widget_referrer': currentOrigin
                },
                '【3】完整 embed URL（前 120 字）': fullEmbedUrl.substring(0, 120) + (fullEmbedUrl.length > 120 ? '...' : ''),
                '【4】影片 ID（請到 YouTube Studio 確認嵌入允許的網域）': videoId
            };
            console.log('%c[YouTube Embed 診斷] 請將「下方整段文字」複製給開發人員', 'color:#2196F3; font-weight:bold;');
            console.log(JSON.stringify(diagnostic, null, 2));
            console.log('%c（若為 153 等錯誤，比對 dev 與正式站此處的差異）', 'color:#666;');
        }

        return fullEmbedUrl;
    }

    // 圖片列表陣列 - 可以自行修改圖片路徑
    const imageList = [
        'images/popup/251229-101.png',
        'images/popup/251229-102.png',
        'images/popup/251229-103.png',
        'images/popup/251229-104.png',
        'images/popup/251229-105.png',
        'images/popup/251229-106.png',
        'images/popup/251229-107.png',
        'images/popup/251229-108.png',
        'images/popup/251229-109.png',
        'images/popup/251229-110.png',
        'images/popup/251229-111.png',
        'images/popup/251229-112.png',
        'images/popup/251229-113.png',
        'images/popup/251229-114.png',
        'images/popup/251229-115.png',
        'images/popup/251229-208.png'
    ];

    /**
     * 初始化 YouTube 播放器和圖片列表
     */
    function initImageGallery() {
        const mainIframe = document.getElementById('mainYoutubeIframe');
        const introIframe = document.getElementById('introYoutubeIframe');
        const listContainer = document.getElementById('listYoutube');
        const imagesContainer = listContainer ? listContainer.querySelector('.listYoutube__images') : null;

        if (!mainIframe || !listContainer || !imagesContainer) {
            console.warn('YouTube player or image list elements not found');
            return;
        }

        // 設定 YouTube 影片（不自動播放）
        const mainUrl = getYouTubeEmbedUrl(youtubeVideoId);
        if (mainUrl) {
            mainIframe.src = mainUrl;
        } else {
            console.error('Failed to generate YouTube embed URL for main video');
        }

        // 設定介紹影片的 YouTube iframe（如果存在）
        if (introIframe) {
            const introVideoId = '4CDSnK0kIrs'; // 介紹影片的 ID
            const introUrl = getYouTubeEmbedUrl(introVideoId, false);
            if (introUrl) {
                introIframe.src = introUrl;
            } else {
                console.error('Failed to generate YouTube embed URL for intro video');
            }
        }

        // 生成下方圖片列表
        imageList.forEach((imageSrc, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image';
            imageDiv.setAttribute('data-image-index', index);
            imageDiv.setAttribute('data-image-src', imageSrc);

            // 建立 picture 元素
            const picture = document.createElement('picture');

            // 圖片
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `展場圖片 ${index + 1}`;
            img.loading = 'lazy';
            picture.appendChild(img);

            // 點擊事件 - 開啟 popup
            imageDiv.addEventListener('click', function () {
                openImagePopup(index);
            });

            imageDiv.appendChild(picture);
            imagesContainer.appendChild(imageDiv);
        });
    }

    /**
     * 開啟圖片 Popup
     * @param {number} startIndex - 開始顯示的圖片索引
     */
    function openImagePopup(startIndex) {
        const popup = document.getElementById('imagePopup');
        const popupWrapper = document.getElementById('imagePopupWrapper');

        if (!popup || !popupWrapper) {
            return;
        }

        // 清空現有內容
        while (popupWrapper.firstChild) {
            popupWrapper.removeChild(popupWrapper.firstChild);
        }

        // 生成 popup 中的圖片
        imageList.forEach((imageSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';

            // 建立 picture 元素
            const picture = document.createElement('picture');

            // 圖片
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `展場圖片 ${index + 1}`;
            picture.appendChild(img);

            slide.appendChild(picture);
            popupWrapper.appendChild(slide);
        });

        // 顯示 popup
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滾動

        // 等待 popup 完全顯示後再初始化 Swiper
        // 使用 requestAnimationFrame 確保 DOM 更新完成
        requestAnimationFrame(() => {
            // 檢查 Swiper 是否已載入
            if (typeof Swiper === 'undefined') {
                console.error('Swiper is not loaded');
                return;
            }

            // 初始化或更新 Swiper
            if (window.imagePopupSwiper && typeof window.imagePopupSwiper.destroy === 'function') {
                try {
                    window.imagePopupSwiper.destroy(true, true); // destroy with cleanup
                } catch (e) {
                    console.warn('Error destroying Swiper:', e);
                }
            }

            window.imagePopupSwiper = new Swiper('#imagePopupSwiper', {
                initialSlide: startIndex,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                keyboard: {
                    enabled: true,
                },
                loop: false,
                observer: true, // 監聽 DOM 變化
                observeParents: true, // 監聽父元素變化
            });

            // 確保 Swiper 正確計算尺寸
            setTimeout(() => {
                if (window.imagePopupSwiper && typeof window.imagePopupSwiper.update === 'function') {
                    window.imagePopupSwiper.update();
                    window.imagePopupSwiper.updateSize();
                }
            }, 100);
        });
    }

    /**
     * 關閉圖片 Popup
     */
    function closeImagePopup() {
        const popup = document.getElementById('imagePopup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = ''; // 恢復背景滾動
        }
    }

    /**
     * 初始化 Popup 關閉功能
     */
    function initImagePopup() {
        const popup = document.getElementById('imagePopup');
        const closeBtn = document.getElementById('imagePopupClose');
        const overlay = popup ? popup.querySelector('.imagePopup__overlay') : null;

        // 關閉按鈕
        if (closeBtn) {
            closeBtn.addEventListener('click', closeImagePopup);
        }

        // 點擊背景關閉
        if (overlay) {
            overlay.addEventListener('click', closeImagePopup);
        }

        // ESC 鍵關閉
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
                closeImagePopup();
            }
        });
    }

    /**
     * 切換影片
     * @param {string} videoId - YouTube 影片 ID
     * @param {number} index - 縮圖索引
     */
    function switchVideo(videoId, index) {
        const mainIframe = document.getElementById('mainYoutubeIframe');
        const allImages = document.querySelectorAll('.listYoutube .image');

        if (!mainIframe) return;

        // 先停止當前播放（如果有的話）
        try {
            // 嘗試通過 iframe API 停止播放
            if (mainIframe.contentWindow) {
                mainIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            }
        } catch (e) {
        }

        // 更新 iframe src（使用時間戳避免快取問題）
        const timestamp = new Date().getTime();
        mainIframe.src = getYouTubeEmbedUrl(videoId) + '&t=' + timestamp;

        // 更新 active 狀態
        allImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // 監聽 iframe 載入錯誤
        mainIframe.onload = function () {
            // 檢查是否載入成功
            setTimeout(function () {
                try {
                    // 如果 iframe 可以訪問，表示載入成功
                    if (mainIframe.contentWindow) {
                    }
                } catch (e) {
                    console.warn('影片可能無法嵌入，請檢查影片設定:', videoId);
                    // 可以顯示提示訊息
                    showEmbedError(videoId);
                }
            }, 1000);
        };

        // 平滑滾動到主播放區（可選）
        const youtubeUnit = document.querySelector('.youtubeUnit');
        if (youtubeUnit) {
            youtubeUnit.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * 顯示嵌入錯誤提示
     * @param {string} videoId - YouTube 影片 ID
     */
    function showEmbedError(videoId) {
        const mainYoutube = document.querySelector('.mainYoutube');
        if (!mainYoutube) return;

        // 創建錯誤提示（如果還沒有）
        let errorMsg = mainYoutube.querySelector('.embed-error');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'embed-error';
            errorMsg.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                z-index: 10;
            `;
            mainYoutube.style.position = 'relative';
            mainYoutube.appendChild(errorMsg);
        }

        // 清空現有內容
        while (errorMsg.firstChild) {
            errorMsg.removeChild(errorMsg.firstChild);
        }

        // 創建錯誤訊息段落
        const errorText = document.createElement('p');
        errorText.style.margin = '0 0 10px 0';
        errorText.textContent = '此影片無法在網站上播放';
        errorMsg.appendChild(errorText);

        // 創建 YouTube 連結
        const youtubeLink = document.createElement('a');
        youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        youtubeLink.target = '_blank';
        youtubeLink.rel = 'noopener noreferrer';
        youtubeLink.style.color = '#4CAF50';
        youtubeLink.style.textDecoration = 'underline';
        youtubeLink.textContent = '在 YouTube 上觀看';
        errorMsg.appendChild(youtubeLink);

        // 3秒後自動隱藏
        setTimeout(function () {
            if (errorMsg) {
                errorMsg.style.opacity = '0';
                errorMsg.style.transition = 'opacity 0.3s';
                setTimeout(function () {
                    if (errorMsg.parentNode) {
                        errorMsg.parentNode.removeChild(errorMsg);
                    }
                }, 300);
            }
        }, 3000);
    }

    /**
     * 停止所有正在播放的媒體
     */
    function stopAllMedia() {
        // 停止 YouTube 影片
        const youtubeIframe = document.getElementById('mainYoutubeIframe');
        if (youtubeIframe) {
            // 如果 iframe 有 src，儲存它以便之後恢復
            if (youtubeIframe.src && !youtubeIframeOriginalSrc) {
                youtubeIframeOriginalSrc = youtubeIframe.src;
            }
            // 移除 src 來停止 YouTube 影片播放
            // 將 src 設為空字串會停止播放
            youtubeIframe.src = '';
        }

        // 停止介紹影片的 YouTube iframe
        const introIframe = document.getElementById('introYoutubeIframe');
        if (introIframe && introIframe.src) {
            // 使用 YouTube API 停止播放
            try {
                if (introIframe.contentWindow) {
                    introIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                }
            } catch (e) {
                // 如果無法使用 API，移除 src
                introIframe.src = '';
            }
        }

        // 停止 Video.js 音訊播放器（語音導覽區域的）
        if (window.audioVideoPlayer && typeof window.audioVideoPlayer.pause === 'function') {
            try {
                window.audioVideoPlayer.pause();
            } catch (e) {
                console.warn('Error pausing audio player:', e);
            }
        }

        // 停止所有作品播放器
        stopAllWorkPlayers();
    }

    /**
     * 恢復 YouTube 影片（當切換回展覽簡介時）
     */
    function restoreYouTubeVideo() {
        const youtubeIframe = document.getElementById('mainYoutubeIframe');
        if (youtubeIframe && youtubeIframeOriginalSrc) {
            youtubeIframe.src = youtubeIframeOriginalSrc;
        } else if (youtubeIframe && !youtubeIframeOriginalSrc) {
            // 如果沒有儲存的 src，重新設定
            youtubeIframe.src = getYouTubeEmbedUrl(youtubeVideoId);
        }
    }

    /**
     * 控制手機版 headerBody 的顯示/隱藏
     * @param {boolean} show - 是否顯示
     */
    function toggleHeaderBody(show) {
        const headerBody = document.querySelector('header .headerBody');
        const headerMobile = document.querySelector('header .headerMobile');

        if (!headerBody) {
            return;
        }

        // 只在手機版（寬度 <= 960px）時執行
        if (window.innerWidth <= 960) {
            if (show) {
                headerBody.classList.remove('hide-mobile');
                // 隱藏 headerMobile
                if (headerMobile) {
                    headerMobile.classList.remove('show');
                }
            } else {
                headerBody.classList.add('hide-mobile');
                // 顯示 headerMobile
                if (headerMobile) {
                    headerMobile.classList.add('show');
                }
            }
        } else {
            // 桌面版始終顯示 headerBody，隱藏 headerMobile
            headerBody.classList.remove('hide-mobile');
            if (headerMobile) {
                headerMobile.classList.remove('show');
            }
        }
    }

    /**
     * 切換 Tab 內容
     * @param {string} targetTab - 目標 tab 名稱
     * @param {boolean} updateHash - 是否更新 URL hash
     */
    function switchTab(targetTab, shouldUpdateHash = true) {
        const tabButtons = document.querySelectorAll('nav ul li[data-tab]');
        const tabContainers = document.querySelectorAll('div[data-content]');

        if (tabButtons.length === 0 || tabContainers.length === 0) {
            return;
        }

        // 停止所有正在播放的媒體
        stopAllMedia();

        // 如果切換離開作品詳情，歸零所有作品（方案 A：歸零）
        if (targetTab !== 'workDetail') {
            resetAllWorks();
        }

        // 如果切換到語音導覽頁面，歸零語音導覽播放器
        if (targetTab === 'audio' && window.audioVideoPlayer) {
            try {
                const player = window.audioVideoPlayer;
                if (player && typeof player.currentTime === 'function') {
                    player.currentTime(0);
                    console.log('[AudioGuide] 切換到語音導覽頁面，重置播放時間為 0');
                }
            } catch (e) {
                console.warn('[AudioGuide] 重置播放時間失敗:', e);
            }
        }

        // 如果切換離開語音導覽頁面，歸零語音導覽播放器
        if (targetTab !== 'audio' && window.audioVideoPlayer) {
            try {
                const player = window.audioVideoPlayer;
                if (player && typeof player.currentTime === 'function') {
                    player.currentTime(0);
                    console.log('[AudioGuide] 切換離開語音導覽頁面，重置播放時間為 0');
                }
            } catch (e) {
                console.warn('[AudioGuide] 重置播放時間失敗:', e);
            }
        }

        // 更新按鈕 active 狀態
        tabButtons.forEach(btn => {
            const btnTab = btn.getAttribute('data-tab');
            if (btnTab === targetTab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 切換內容區塊（外層 div）
        tabContainers.forEach(container => {
            const containerTab = container.getAttribute('data-content');
            if (containerTab === targetTab) {
                container.style.display = 'block';

                // 如果切換到展覽簡介，恢復 YouTube 影片
                if (targetTab === 'exhibition') {
                    setTimeout(() => {
                        restoreYouTubeVideo();
                    }, 100);
                }

                // 如果切換到語音導覽頁面，依開關決定是否自動播放
                if (targetTab === 'audio' && AUDIO_AUTOPLAY_ENABLED) {
                    let playerReadyState = 'N/A';
                    if (window.audioVideoPlayer && typeof window.audioVideoPlayer.readyState === 'function') {
                        try {
                            playerReadyState = window.audioVideoPlayer.readyState();
                        } catch (e) {
                            playerReadyState = 'Error: ' + e.message;
                        }
                    }

                    console.log('[AudioGuide] 切換到語音導覽頁面，準備自動播放', {
                        playerExists: !!window.audioVideoPlayer,
                        playerReadyState: playerReadyState
                    });

                    // 如果播放器還沒初始化，等待初始化完成
                    const tryAutoPlay = () => {
                        const player = window.audioVideoPlayer || videojs.getPlayer('audioVideoPlayer');
                        if (!player) {
                            console.log('[AudioGuide] 播放器尚未初始化，延遲重試...');
                            setTimeout(tryAutoPlay, 200);
                            return;
                        }

                        console.log('[AudioGuide] 播放器已找到，準備播放', {
                            readyState: player.readyState(),
                            paused: player.paused(),
                            currentTime: player.currentTime()
                        });

                        // 確保播放時間已重置為 0
                        try {
                            if (player.currentTime() > 0) {
                                player.currentTime(0);
                                console.log('[AudioGuide] 重置播放時間為 0');
                            }
                        } catch (e) {
                            console.warn('[AudioGuide] 重置播放時間失敗:', e);
                        }

                        // 確保圖示已設置
                        setupAudioPlayerIcon(player);

                        // 確保播放器已準備好
                        const tryPlay = () => {
                            if (player.readyState() >= 2) {
                                // 音訊已載入，直接播放
                                console.log('[AudioGuide] 音訊已載入，開始播放');
                                player.play().then(() => {
                                    console.log('[AudioGuide] 播放成功');
                                    // 播放成功後更新圖示
                                    setupAudioPlayerIcon(player);
                                }).catch(function (err) {
                                    handleAutoplayError(err, 'AudioGuide', function () {
                                        // 播放失敗後也要更新圖示
                                        setupAudioPlayerIcon(player);
                                    });
                                });
                            } else {
                                console.log('[AudioGuide] 音訊尚未載入，等待載入...', {
                                    readyState: player.readyState()
                                });
                                // 等待音訊載入
                                const onCanPlay = () => {
                                    // 再次確保播放時間為 0
                                    try {
                                        if (player.currentTime() > 0) {
                                            player.currentTime(0);
                                        }
                                    } catch (e) {
                                        // 忽略錯誤
                                    }

                                    console.log('[AudioGuide] 音訊載入完成，開始播放');
                                    player.play().then(() => {
                                        console.log('[AudioGuide] 播放成功');
                                        // 播放成功後更新圖示
                                        setupAudioPlayerIcon(player);
                                    }).catch(function (err) {
                                        handleAutoplayError(err, 'AudioGuide', function () {
                                            // 播放失敗後也要更新圖示
                                            setupAudioPlayerIcon(player);
                                        });
                                    });
                                    player.off('canplay', onCanPlay);
                                    player.off('loadedmetadata', onCanPlay);
                                };
                                player.on('canplay', onCanPlay);
                                player.on('loadedmetadata', onCanPlay);
                            }
                        };

                        tryPlay();
                    };

                    setTimeout(tryAutoPlay, 500);
                }

                // 平滑滾動到頂部
                setTimeout(() => {
                    const section = container.querySelector('.section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                container.style.display = 'none';
            }
        });

        // 控制手機版 headerBody 的顯示/隱藏
        // 只在「展覽簡介」時顯示，其他 tab 隱藏
        const wrapper = document.querySelector('.wrapper');
        if (targetTab === 'exhibition') {
            toggleHeaderBody(true);
            // 移除 height-auto-mobile class，恢復 min-height
            if (wrapper) {
                wrapper.classList.remove('height-auto-mobile');
            }
            // 確保滾動到頂部
            const main = document.querySelector('.main');
            if (main) {
                main.scrollTop = 0;
            }
        } else {
            toggleHeaderBody(false);
            // 手機版時添加 height-auto-mobile class
            if (wrapper && window.innerWidth <= 960) {
                wrapper.classList.add('height-auto-mobile');
            } else if (wrapper) {
                wrapper.classList.remove('height-auto-mobile');
            }
        }

        // 更新 URL hash（使用 pushState 建立歷史記錄）
        if (shouldUpdateHash) {
            console.log('[History] switchTab: 準備更新 hash', {
                targetTab: targetTab,
                currentHash: window.location.hash,
                currentLang: currentLang
            });

            if (targetTab === 'exhibition') {
                // 展覽簡介：根據當前語言決定 hash（使用 currentLang，而不是 getTabFromHash）
                const hashValue = currentLang === 'en' ? 'en' : '';
                console.log('[History] switchTab: 更新展覽簡介 hash', {
                    hashValue: hashValue,
                    currentLang: currentLang
                });
                updateHash(hashValue);
            } else if (targetTab === 'audio') {
                // 語音導覽：根據當前語言決定 hash（使用 currentLang，而不是 getTabFromHash）
                const hashValue = currentLang === 'en' ? 'en/audio' : 'audio';
                console.log('[History] switchTab: 更新語音導覽 hash', {
                    hashValue: hashValue,
                    currentLang: currentLang
                });
                updateHash(hashValue);
            } else if (targetTab === 'workDetail') {
                // 作品詳情：hash 應該已經在點擊作品時設置了，這裡不更新
                // 但如果沒有 hash，可能需要設置一個預設值
                // 實際上，workDetail 的 hash 應該在點擊作品時已經設置
                console.log('[History] switchTab: 作品詳情，不更新 hash（應已在點擊時設置）');
            } else {
                // 其他 tab：根據當前語言決定 hash（使用 currentLang，而不是 getTabFromHash）
                const hashValue = currentLang === 'en' ? 'en/' + targetTab : targetTab;
                console.log('[History] switchTab: 更新其他 tab hash', {
                    hashValue: hashValue,
                    targetTab: targetTab,
                    currentLang: currentLang
                });
                updateHash(hashValue);
            }
        } else {
            console.log('[History] switchTab: shouldUpdateHash 為 false，跳過更新 hash');
        }
    }

    /**
     * 從 URL hash 獲取 tab 名稱或作品名稱
     * @returns {object} {tab: string, workName: string|null, lang: string}
     */
    function getTabFromHash() {
        let hash = window.location.hash.replace('#', '');
        let lang = 'zh'; // 預設語言為中文

        // 處理語言前綴（格式：en/Work_1 或 en/audio）
        if (hash.startsWith('en/')) {
            lang = 'en';
            hash = hash.replace('en/', '');
        } else if (hash === 'en') {
            lang = 'en';
            hash = '';
        }

        // 如果是純語言 hash，返回預設 tab
        if (hash === '' || hash === 'en' || hash === 'zh') {
            return { tab: 'exhibition', workName: null, lang: lang };
        }

        // 檢查是否是基本 tab
        const validTabs = ['exhibition', 'audio'];
        if (validTabs.includes(hash)) {
            return { tab: hash, workName: null, lang: lang };
        }

        // 檢查是否是作品名稱
        if (workNames.includes(hash)) {
            return { tab: 'workDetail', workName: hash, lang: lang };
        }

        // 預設返回展覽簡介
        return { tab: 'exhibition', workName: null, lang: lang };
    }

    /**
     * 根據作品編號獲取作品名稱
     * @param {number} workId - 作品編號 (0=引言, 1-8=作品1～8)
     * @returns {string} 作品英文名稱
     */
    function getWorkName(workId) {
        const index = parseInt(workId, 10);
        if (index >= 0 && index < workNames.length) {
            return workNames[index];
        }
        return null;
    }

    /**
     * 根據作品名稱獲取作品編號
     * @param {string} workName - 作品英文名稱
     * @returns {number} 作品編號 (0=引言, 1-8=作品1～8)
     */
    function getWorkIdFromName(workName) {
        const index = workNames.indexOf(workName);
        if (index >= 0) {
            return index;
        }
        return null;
    }

    /**
     * 初始化作品播放器
     * @param {number} workId - 作品編號 (1-9)
     */
    function initWorkPlayer(workId) {
        console.log('[AudioSync] initWorkPlayer 被調用', { workId });

        // 查找該作品的所有播放器（可能有多個，例如在 Swiper 中）
        const workContent = document.querySelector('.workDetailContent[data-work="' + workId + '"]');
        if (!workContent) {
            console.warn('[AudioSync] 找不到作品內容', workId);
            return;
        }

        console.log('[AudioSync] 找到作品內容', {
            workId,
            workContentExists: !!workContent,
            display: workContent.style.display,
            isVisible: workContent.offsetParent !== null
        });

        // 先查找所有 video 元素（包括 _html5_api）
        const allVideoElements = workContent.querySelectorAll('video');
        console.log('[AudioSync] 所有 video 元素', {
            workId,
            count: allVideoElements.length,
            ids: Array.from(allVideoElements).map(el => el.id)
        });

        // 查找所有該作品的播放器元素（只選擇原始的 video 元素，排除 Video.js 自動創建的 _html5_api 元素）
        const playerElements = workContent.querySelectorAll('video[id^="workAudioPlayer' + workId + '"]:not([id$="_html5_api"])');
        console.log('[AudioSync] 找到播放器元素', {
            workId,
            count: playerElements.length,
            ids: Array.from(playerElements).map(el => el.id)
        });

        // 如果找不到，嘗試更寬鬆的選擇器
        if (playerElements.length === 0) {
            // 嘗試直接通過 ID 查找
            const directPlayer = document.getElementById('workAudioPlayer' + workId);
            if (directPlayer) {
                console.log('[AudioSync] 通過直接 ID 找到播放器', {
                    workId,
                    playerId: directPlayer.id,
                    parent: directPlayer.parentElement?.className
                });
                initSingleWorkPlayer('workAudioPlayer' + workId, workId);
                return;
            }
            console.warn('[AudioSync] 沒有找到播放器元素', workId);
            return;
        }

        // 為每個播放器初始化
        playerElements.forEach((playerElement) => {
            const playerId = playerElement.id; // 使用原始 ID，例如 'workAudioPlayer2'
            console.log('[AudioSync] 初始化播放器', { playerId, workId });
            initSingleWorkPlayer(playerId, workId);
        });
    }

    /**
     * 初始化單個作品播放器
     * @param {string} playerId - 播放器 ID
     * @param {number} workId - 作品編號 (1-9)
     */
    function initSingleWorkPlayer(playerId, workId) {
        console.log('[AudioSync] initSingleWorkPlayer 被調用', { playerId, workId });

        const playerElement = document.getElementById(playerId);

        if (!playerElement) {
            console.warn('[AudioSync] 找不到播放器元素', playerId);
            return;
        }

        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            console.warn('[AudioSync] Video.js is not loaded');
            return;
        }

        // 檢查播放器是否已經初始化
        let player = videojs.getPlayer(playerId);
        console.log('[AudioSync] 播放器狀態檢查', { playerId, workId, playerExists: !!player });

        if (!player) {
            // 初始化播放器
            player = videojs(playerId, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: false,
                responsive: false,
                width: '100%',
                height: 'auto',
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                userActions: {
                    hotkeys: false
                },
                controlBar: {
                    playToggle: true,
                    currentTimeDisplay: true,
                    timeDivider: false,
                    durationDisplay: true,
                    progressControl: {
                        seekBar: true
                    },
                    volumePanel: false,
                    fullscreenToggle: false
                }
            });

            // 確保控制欄永遠顯示
            player.ready(function () {
                const controlBar = player.controlBar;
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                    player.on('userinactive', function () {
                        player.userActive(true);
                    });
                }

                // 設置自定義播放按鈕圖示
                setupWorkPlayerIcon(player);

                // 延遲再次設置，確保圖示顯示
                setTimeout(function () {
                    setupWorkPlayerIcon(player);
                }, 200);
                setTimeout(function () {
                    setupWorkPlayerIcon(player);
                }, 500);

                // 設置音訊同步（如果該作品需要）
                // 延遲更長時間，確保 Swiper 已完全初始化
                setTimeout(function () {
                    console.log('[AudioSync] 準備設置同步功能', { playerId, workId });
                    setupWorkAudioSync(playerId, workId);
                }, 800);
            });
        } else {
            // 播放器已存在，直接設置圖示
            setupWorkPlayerIcon(player);
            setTimeout(function () {
                setupWorkPlayerIcon(player);
            }, 100);

            // 播放器已存在，也需要設置音訊同步
            setTimeout(function () {
                console.log('[AudioSync] 播放器已存在，準備設置同步功能', { playerId, workId });
                setupWorkAudioSync(playerId, workId);
            }, 800);

            // 播放器已存在，依開關決定是否自動播放
            if (AUDIO_AUTOPLAY_ENABLED) {
                setTimeout(function () {
                    if (player.readyState() >= 2) {
                        player.play().catch(function (err) {
                            handleAutoplayError(err, 'WorkPlayer');
                        });
                    } else {
                        player.on('loadedmetadata', function () {
                            player.play().catch(function (err) {
                                handleAutoplayError(err, 'WorkPlayer');
                            });
                        });
                    }
                }, 500);
            }
        }

        // 確保 player 變數存在
        if (!player) {
            player = videojs.getPlayer(playerId);
        }

        // 載入對應的音訊檔案（根據當前語言）
        if (player) {
            // 使用新的音訊檔案管理函數，根據當前語言取得檔案路徑
            const audioFile = getWorkAudioFile(currentLang, workId);

            if (audioFile) {
                player.src({
                    type: 'audio/mpeg',
                    src: audioFile
                });

                // 監聽音訊載入完成後，確保圖示顯示，依開關決定是否自動播放
                player.on('loadedmetadata', function () {
                    setupWorkPlayerIcon(player);
                    if (AUDIO_AUTOPLAY_ENABLED) {
                        player.play().catch(function (err) {
                            handleAutoplayError(err, 'WorkPlayer');
                        });
                    }
                });

                // 如果音訊已經載入，依開關決定是否立即播放
                if (player.readyState() >= 2 && AUDIO_AUTOPLAY_ENABLED) {
                    player.play().catch(function (err) {
                        handleAutoplayError(err, 'WorkPlayer');
                    });
                }

                // 監聽錯誤事件
                player.on('error', function () {
                    const error = player.error();
                    console.error('作品播放器載入錯誤:', {
                        workId: workId,
                        audioFile: audioFile,
                        error: error
                    });
                });
            } else {
                console.warn('找不到對應的音訊檔案:', workId);
            }
        }
    }

    /**
     * 設置作品音訊與 Swiper 同步功能
     * @param {string} playerId - 播放器 ID（例如 'workAudioPlayer1'）
     * @param {number} workId - 作品編號 (1-9)
     */
    function setupWorkAudioSync(playerId, workId) {
        console.log('[AudioSync] 開始設置同步功能', { playerId, workId });

        // 檢查該作品是否需要同步
        if (!workSyncConfig[workId]) {
            console.log('[AudioSync] 作品', workId, '不需要同步功能');
            return; // 作品 5、7、8 不需要同步
        }

        // 作品 1 特殊處理：只在手機版啟用同步功能
        if (workId === 1) {
            const isMobile = window.innerWidth <= 960;
            console.log('[AudioSync] 作品1設備檢查', { isMobile, width: window.innerWidth });
            if (!isMobile) {
                // 桌機版：不需要同步，整支音檔播完
                console.log('[AudioSync] 作品1桌機版，跳過同步');
                return;
            }
            // 手機版：繼續執行同步功能
            console.log('[AudioSync] 作品1手機版，啟用同步');
        }

        const player = videojs.getPlayer(playerId);
        if (!player) {
            console.warn('[AudioSync] 播放器不存在', playerId);
            return;
        }
        console.log('[AudioSync] 播放器已找到', playerId);

        // 獲取 Swiper 實例（可能需要等待 Swiper 初始化）
        const getSwiper = () => {
            // 作品 1 在手機版使用 Mobile key
            if (workId === 1) {
                const swiper = window.workSwipers && window.workSwipers[workId + 'Mobile'];
                if (!swiper) {
                    console.log('[AudioSync] Swiper 未找到 (作品1 Mobile)', workId + 'Mobile', '可用的 keys:', Object.keys(window.workSwipers || {}));
                }
                return swiper;
            }
            // 其他作品使用標準 key
            const swiper = window.workSwipers && window.workSwipers[workId];
            if (!swiper) {
                console.log('[AudioSync] Swiper 未找到', workId, '可用的 keys:', Object.keys(window.workSwipers || {}));
            }
            return swiper;
        };

        // 獲取當前語言的時間點配置
        const lang = currentLang; // 'zh' 或 'en'
        const timePoints = workSyncConfig[workId][lang] || workSyncConfig[workId]['zh'];

        if (!timePoints || timePoints.length === 0) {
            console.warn('[AudioSync] 時間點配置不存在', { workId, lang });
            return;
        }

        console.log('[AudioSync] 配置載入成功', { workId, lang, timePoints });

        // 追蹤已觸發的時間點，避免重複切換
        const triggeredPoints = new Set();

        // 標記是否為用戶手動切換（避免循環觸發）
        let isUserSlideChange = false;
        let isAutoSlideChange = false;

        // ========== 功能 1：音訊播放到時間點 → 自動切換 slide ==========
        // 監聽播放時間更新
        let lastLoggedTime = -1; // 用於減少日誌輸出
        player.on('timeupdate', function () {
            // 如果正在手動切換 slide，跳過自動切換
            if (isUserSlideChange) {
                return;
            }

            const swiper = getSwiper();
            if (!swiper) {
                return;
            }

            const currentTime = player.currentTime();

            // 快速檢查：是否在任何時間點的 ±5 秒範圍內（性能優化）
            const isNearAnyPoint = timePoints.some(point =>
                Math.abs(currentTime - point.time) < 5
            );

            // 每 10 秒記錄一次時間（用於調試）
            if (Math.floor(currentTime) % 10 === 0 && Math.floor(currentTime) !== lastLoggedTime) {
                lastLoggedTime = Math.floor(currentTime);
                console.log('[AudioSync] timeupdate', {
                    workId,
                    currentTime: currentTime.toFixed(2),
                    isNearAnyPoint,
                    activeSlide: swiper.activeIndex
                });
            }

            if (!isNearAnyPoint) {
                return; // 跳過檢查，節省 CPU
            }

            // 檢查每個時間點
            for (let i = 0; i < timePoints.length; i++) {
                const point = timePoints[i];
                const pointKey = `${workId}-${lang}-${i}`;

                // 檢查是否到達時間點（允許 0.5 秒誤差）
                if (currentTime >= point.time - 0.5 && currentTime < point.time + 0.5) {
                    // 檢查是否已經觸發過
                    if (!triggeredPoints.has(pointKey)) {
                        // 檢查當前 slide 是否已經是目標
                        if (swiper.activeIndex !== point.slideIndex) {
                            console.log('[AudioSync] 自動切換 Slide', {
                                workId,
                                currentTime: currentTime.toFixed(2),
                                targetTime: point.time,
                                fromSlide: swiper.activeIndex,
                                toSlide: point.slideIndex
                            });
                            isAutoSlideChange = true;
                            swiper.slideTo(point.slideIndex);
                            isAutoSlideChange = false;
                        }
                        triggeredPoints.add(pointKey);
                    }
                    break; // 只處理第一個匹配的時間點
                }
            }
        });

        console.log('[AudioSync] timeupdate 事件監聽器已綁定');

        // ========== 功能 2：用戶手動切換 slide → 音訊跳轉到對應時間點 ==========
        // 監聽 Swiper slide 切換事件（需要延遲綁定，確保 Swiper 已初始化）
        const bindSwiperEvents = () => {
            const swiper = getSwiper();
            if (!swiper) {
                console.log('[AudioSync] Swiper 尚未初始化，延遲重試...', workId);
                // 如果 Swiper 還沒初始化，延遲重試
                setTimeout(bindSwiperEvents, 100);
                return;
            }

            console.log('[AudioSync] Swiper 已找到，綁定 slideChange 事件', {
                workId,
                swiperKey: workId === 1 ? workId + 'Mobile' : workId,
                activeIndex: swiper.activeIndex,
                slidesCount: swiper.slides ? swiper.slides.length : 0
            });

            // 移除舊的事件監聽器（如果有的話）
            // 注意：Swiper 的 off 方法需要傳入相同的函數引用
            // 但我們每次都是新函數，所以使用命名空間或直接綁定
            swiper.off('slideChange', handleSlideChange);

            // 綁定新的事件監聽器
            // 使用 once: false 確保事件持續監聽
            swiper.on('slideChange', handleSlideChange);

            // 測試：手動觸發一次以確認綁定成功
            console.log('[AudioSync] slideChange 事件監聽器已綁定，當前 slide:', swiper.activeIndex);

            // 驗證事件監聽器是否正確綁定
            const events = swiper._events && swiper._events.slideChange;
            if (events) {
                console.log('[AudioSync] 確認：slideChange 事件監聽器數量:', events.length);
            }
        };

        const handleSlideChange = function () {
            console.log('[AudioSync] ========== slideChange 事件觸發 ==========', {
                workId,
                isAutoSlideChange,
                isUserSlideChange,
                timestamp: new Date().toISOString()
            });

            // 如果是自動切換觸發的，不處理
            if (isAutoSlideChange) {
                console.log('[AudioSync] 自動切換觸發，跳過處理');
                return;
            }

            // 標記為用戶手動切換
            isUserSlideChange = true;

            const swiper = getSwiper();
            if (!swiper) {
                console.warn('[AudioSync] Swiper 不存在，無法處理 slideChange');
                return;
            }

            const currentSlideIndex = swiper.activeIndex;
            console.log('[AudioSync] 當前 Slide 索引', currentSlideIndex);

            // 找到對應的時間點
            let targetTime = 0;
            for (let i = 0; i < timePoints.length; i++) {
                if (timePoints[i].slideIndex === currentSlideIndex) {
                    targetTime = timePoints[i].time;
                    break;
                }
            }

            // 如果找不到對應的時間點，使用 slide 索引 × 60 秒（預設值）
            if (targetTime === 0 && currentSlideIndex > 0) {
                targetTime = currentSlideIndex * 60;
                console.log('[AudioSync] 使用預設時間計算', targetTime);
            }

            console.log('[AudioSync] 手動切換 Slide，跳轉音訊', {
                workId,
                slideIndex: currentSlideIndex,
                targetTime: targetTime.toFixed(2),
                currentTime: player.currentTime().toFixed(2)
            });

            // 跳轉音訊到對應時間點
            if (player) {
                player.currentTime(targetTime);
            }

            // 重置觸發記錄，因為時間點改變了
            triggeredPoints.clear();

            // 延遲重置標記，避免立即觸發自動切換
            setTimeout(function () {
                isUserSlideChange = false;
            }, 500);
        };

        // 延遲綁定 Swiper 事件（確保 Swiper 已初始化）
        // 增加重試次數，確保 Swiper 已完全初始化
        let retryCount = 0;
        const maxRetries = 20; // 最多重試 20 次（2 秒）

        const tryBindSwiperEvents = () => {
            const swiper = getSwiper();
            if (!swiper && retryCount < maxRetries) {
                retryCount++;
                console.log('[AudioSync] 重試綁定 Swiper 事件', { workId, retryCount });
                setTimeout(tryBindSwiperEvents, 100);
                return;
            }

            if (swiper) {
                bindSwiperEvents();
            } else {
                console.error('[AudioSync] Swiper 初始化失敗，無法綁定事件', {
                    workId,
                    availableSwipers: Object.keys(window.workSwipers || {})
                });
            }
        };

        setTimeout(tryBindSwiperEvents, 300);

        // ========== 功能 3：重置功能 ==========
        // 當播放重新開始時，重置觸發記錄
        player.on('play', function () {
            // 如果從頭開始播放，重置觸發記錄和 slide
            if (player.currentTime() < 1) {
                triggeredPoints.clear();
                const swiper = getSwiper();
                if (swiper && swiper.activeIndex !== 0) {
                    isAutoSlideChange = true;
                    swiper.slideTo(0);
                    isAutoSlideChange = false;
                }
            }
        });

        // 當用戶手動跳轉時，重置觸發記錄
        player.on('seeked', function () {
            triggeredPoints.clear();
            const swiper = getSwiper();
            if (!swiper) {
                return;
            }

            // 根據當前時間找到對應的 slide
            const currentTime = player.currentTime();
            let targetSlideIndex = 0;

            // 找到最接近的時間點對應的 slide
            for (let i = timePoints.length - 1; i >= 0; i--) {
                if (currentTime >= timePoints[i].time - 0.5) {
                    targetSlideIndex = timePoints[i].slideIndex;
                    break;
                }
            }

            if (swiper.activeIndex !== targetSlideIndex) {
                isAutoSlideChange = true;
                swiper.slideTo(targetSlideIndex);
                isAutoSlideChange = false;
            }
        });
    }

    /**
     * 設置作品播放器的自定義圖示
     * @param {object} player - Video.js 播放器實例
     */
    function setupWorkPlayerIcon(player) {
        if (!player || !player.controlBar) return;

        const playButton = player.controlBar.playToggle.el();
        if (!playButton) return;

        // 確保按鈕可以點擊
        playButton.style.cursor = 'pointer';
        playButton.style.pointerEvents = 'auto';

        // 只在第一次設置時清空內容
        let playIcon = playButton.querySelector('.custom-play-icon');
        if (!playIcon) {
            // 移除所有預設內容和樣式
            playButton.innerHTML = '';

            // 隱藏所有預設的 Video.js 元素
            const placeholder = playButton.querySelector('.vjs-icon-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            const controlText = playButton.querySelector('.vjs-control-text');
            if (controlText) {
                controlText.style.display = 'none';
            }

            // 創建自定義圖示
            playIcon = document.createElement('img');
            playIcon.className = 'custom-play-icon';
            playButton.appendChild(playIcon);
        }

        // 更新圖示屬性
        playIcon.src = player.paused() ? 'images/icon-play.svg' : 'images/icon-stop.svg';
        playIcon.alt = player.paused() ? '播放' : '暫停';
        playIcon.style.width = '50px';
        playIcon.style.height = '50px';
        playIcon.style.display = 'block';
        playIcon.style.visibility = 'visible';
        playIcon.style.opacity = '1';
        playIcon.style.pointerEvents = 'none';

        // 監聽播放狀態變化（避免重複綁定）
        player.off('play', updateWorkPlayerIcon);
        player.off('pause', updateWorkPlayerIcon);

        function updateWorkPlayerIcon() {
            if (playIcon) {
                playIcon.src = player.paused() ? 'images/icon-play.svg' : 'images/icon-stop.svg';
                playIcon.alt = player.paused() ? '播放' : '暫停';
            }
        }

        player.on('play', updateWorkPlayerIcon);
        player.on('pause', updateWorkPlayerIcon);

        // 使用事件委派處理點擊
        const controlBarEl = player.controlBar.el();
        if (controlBarEl && !controlBarEl.hasAttribute('data-click-handled')) {
            controlBarEl.setAttribute('data-click-handled', 'true');
            controlBarEl.addEventListener('click', function (e) {
                const playBtn = player.controlBar.playToggle.el();
                // 檢查 e.target 是否為有效的 DOM 節點
                const target = e.target && e.target.nodeType === 1 ? e.target : null;
                if (playBtn && target && (playBtn.contains(target) || target.closest('.vjs-play-control'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (player.paused()) {
                        player.play().catch(function (err) {
                            console.error('播放錯誤:', err);
                        });
                    } else {
                        player.pause();
                    }
                }
            }, true);
        }
    }

    /**
     * 重置所有作品（歸零功能 - 方案 A）
     * 將所有作品的音訊時間重置為 0:00，Swiper 切換到第一個 slide
     */
    function resetAllWorks() {
        for (let i = 0; i <= 8; i++) {
            const playerId = 'workAudioPlayer' + i;
            try {
                const player = videojs.getPlayer(playerId);
                if (player) {
                    player.pause();
                    player.currentTime(0); // 歸零
                }
            } catch (e) {
                // 播放器可能尚未初始化，忽略錯誤
            }

            // 重置 Swiper 到第一個 slide
            // 先嘗試標準 key
            if (window.workSwipers && window.workSwipers[i]) {
                try {
                    window.workSwipers[i].slideTo(0);
                } catch (e) {
                    console.warn('重置 Swiper 失敗:', e);
                }
            }
            // 如果是作品 1，也嘗試 mobile key（作品 0 無 Swiper）
            if (i === 1 && window.workSwipers && window.workSwipers[i + 'Mobile']) {
                try {
                    window.workSwipers[i + 'Mobile'].slideTo(0);
                } catch (e) {
                    console.warn('重置 Swiper Mobile 失敗:', e);
                }
            }
        }
    }

    /**
     * 停止所有作品播放器
     */
    function stopAllWorkPlayers() {
        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            return;
        }

        for (let i = 0; i <= 8; i++) {
            const playerId = 'workAudioPlayer' + i;
            try {
                const player = videojs.getPlayer(playerId);
                if (player) {
                    player.pause();
                }
            } catch (e) {
                // 播放器可能尚未初始化，忽略錯誤
            }
        }
    }

    /**
     * 初始化作品 Swiper 輪播
     * @param {number} workId - 作品編號 (1-9)
     */
    function initWorkSwiper(workId) {
        // 檢查 Swiper 是否已載入
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper is not loaded');
            return;
        }

        // 先嘗試標準的 Swiper ID
        let swiperId = 'workSwiper' + workId;
        let swiperElement = document.getElementById(swiperId);

        // 如果找不到，嘗試手機版的 Swiper ID（作品 1 的特殊情況）
        if (!swiperElement && workId === 1) {
            swiperId = 'workSwiper' + workId + 'Mobile';
            swiperElement = document.getElementById(swiperId);
        }

        if (!swiperElement) {
            return; // 該作品沒有 Swiper
        }

        // 如果已經初始化，先銷毀
        if (window.workSwipers && window.workSwipers[workId]) {
            try {
                window.workSwipers[workId].destroy(true, true);
            } catch (e) {
                console.warn('Error destroying work Swiper:', e);
            }
        }

        // 初始化 Swiper
        if (!window.workSwipers) {
            window.workSwipers = {};
        }

        // 確保在初始化前，所有 slides 都已經存在
        const slides = swiperElement.querySelectorAll('.swiper-slide');
        if (slides.length < 2) {
            console.warn('Swiper needs at least 2 slides, found:', slides.length);
        }

        // 如果是手機版的 Swiper（作品 1），使用不同的 key
        const swiperKey = (swiperId === 'workSwiper1Mobile') ? workId + 'Mobile' : workId;

        window.workSwipers[swiperKey] = new Swiper('#' + swiperId, {
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '#' + swiperId + ' .swiper-pagination',
                clickable: true,
                dynamicBullets: false,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },
            keyboard: {
                enabled: true,
            },
            loop: false,
            observer: true,
            observeParents: true,
            on: {
                init: function () {
                    updateSwiperCounter(workId, swiperId);
                },
                slideChange: function () {
                    updateSwiperCounter(workId, swiperId);
                }
            }
        });

        // 更新 Swiper 尺寸和 pagination
        setTimeout(() => {
            if (window.workSwipers[swiperKey]) {
                const swiper = window.workSwipers[swiperKey];
                swiper.update();
                swiper.updateSize();

                // 確保 pagination 正確渲染
                if (swiper.pagination) {
                    // 檢查 bullet 數量
                    const bullets = swiper.pagination.bullets;
                    const slidesCount = swiper.slides.length;


                    // 如果 bullet 數量不對，強制重新渲染
                    if (!bullets || bullets.length !== slidesCount) {
                        swiper.pagination.render();
                        swiper.pagination.update();
                    }
                }

                // 更新編號顯示
                updateSwiperCounter(workId);
            }
        }, 300);
    }

    /**
     * 更新 Swiper 編號顯示
     * @param {number} workId - 作品編號 (1-9)
     * @param {string} swiperId - Swiper 元素的 ID（可選）
     */
    function updateSwiperCounter(workId, swiperId) {
        // 如果提供了 swiperId，直接使用
        let actualSwiperId = swiperId;
        let swiperKey = workId;

        if (!actualSwiperId) {
            // 先嘗試標準的 Swiper ID
            actualSwiperId = 'workSwiper' + workId;

            // 如果找不到，嘗試手機版的 Swiper ID（作品 1 的特殊情況）
            if (workId === 1 && !document.getElementById(actualSwiperId)) {
                actualSwiperId = 'workSwiper' + workId + 'Mobile';
                swiperKey = workId + 'Mobile';
            }
        } else {
            // 如果提供了 swiperId，判斷是標準版還是手機版
            if (actualSwiperId === 'workSwiper1Mobile') {
                swiperKey = workId + 'Mobile';
            }
        }

        if (!window.workSwipers || !window.workSwipers[swiperKey]) {
            return;
        }

        const swiper = window.workSwipers[swiperKey];
        const counterElement = document.querySelector('#' + actualSwiperId + ' .swiper-counter');

        if (counterElement && swiper.slides && swiper.slides.length > 0) {
            const currentIndex = swiper.activeIndex + 1; // Swiper 索引從 0 開始，顯示從 1 開始
            const totalSlides = swiper.slides.length;
            counterElement.textContent = currentIndex + '/' + totalSlides;
        }
    }

    /**
     * 銷毀作品 Swiper 輪播
     * @param {number} workId - 作品編號 (1-9)
     */
    function destroyWorkSwiper(workId) {
        if (window.workSwipers && window.workSwipers[workId]) {
            try {
                window.workSwipers[workId].destroy(true, true);
                delete window.workSwipers[workId];
            } catch (e) {
                console.warn('Error destroying work Swiper:', e);
            }
        }

        // 如果是作品 1，也需要銷毀手機版的 Swiper
        if (workId === 1) {
            const mobileSwiperKey = workId + 'Mobile';
            if (window.workSwipers && window.workSwipers[mobileSwiperKey]) {
                try {
                    window.workSwipers[mobileSwiperKey].destroy(true, true);
                    delete window.workSwipers[mobileSwiperKey];
                } catch (e) {
                    console.warn('Error destroying mobile work Swiper:', e);
                }
            }
        }
    }

    /**
     * 顯示指定作品內容
     * @param {number} workId - 作品編號 (1-9)
     */
    function showWorkDetail(workId) {
        const workDetailContents = document.querySelectorAll('.workDetailContent');
        const wrapper = document.querySelector('.wrapper');

        // 停止語音導覽播放器（如果正在播放）
        if (window.audioVideoPlayer && typeof window.audioVideoPlayer.pause === 'function') {
            try {
                window.audioVideoPlayer.pause();
                console.log('[AudioGuide] 切換到作品時，停止語音導覽播放器');
            } catch (e) {
                console.warn('[AudioGuide] 停止語音導覽播放器失敗:', e);
            }
        }

        // 顯示作品詳情時，隱藏手機版 headerBody
        toggleHeaderBody(false);

        // 手機版時添加 height-auto-mobile class
        if (wrapper && window.innerWidth <= 960) {
            wrapper.classList.add('height-auto-mobile');
        } else if (wrapper) {
            wrapper.classList.remove('height-auto-mobile');
        }

        workDetailContents.forEach(content => {
            const contentWorkId = content.getAttribute('data-work');
            if (contentWorkId === workId.toString()) {
                // content.style.display = 'block';
                content.style.display = 'flex';
                content.classList.add('active');

                // 先停止並歸零其他作品（0=引言, 1～8=作品1～8）
                for (let i = 0; i <= 8; i++) {
                    if (i !== Number(workId)) {
                        const playerId = 'workAudioPlayer' + i;
                        try {
                            const player = videojs.getPlayer(playerId);
                            if (player) {
                                player.pause();
                                player.currentTime(0); // 歸零
                            }
                        } catch (e) {
                            // 忽略錯誤
                        }

                        // 重置其他作品的 Swiper
                        if (window.workSwipers && window.workSwipers[i]) {
                            try {
                                window.workSwipers[i].slideTo(0);
                            } catch (e) {
                                // 忽略錯誤
                            }
                        }
                        if (i === 1 && window.workSwipers && window.workSwipers[i + 'Mobile']) {
                            try {
                                window.workSwipers[i + 'Mobile'].slideTo(0);
                            } catch (e) {
                                // 忽略錯誤
                            }
                        }
                    }
                }

                // 初始化該作品的播放器
                // 使用更長的延遲，確保 DOM 完全渲染且元素已顯示
                setTimeout(() => {
                    // 再次確認元素已顯示
                    if (content.style.display === 'flex' || content.style.display === 'block') {
                        initWorkPlayer(workId);
                    } else {
                        // 如果還沒顯示，再等一會兒
                        setTimeout(() => {
                            initWorkPlayer(workId);
                        }, 200);
                    }
                }, 300);

                // 初始化該作品的 Swiper（如果有）
                // 使用 requestAnimationFrame 確保 DOM 完全渲染
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        initWorkSwiper(workId);

                        // 確保當前作品也是從頭開始（歸零），依開關決定是否自動播放
                        const playerId = 'workAudioPlayer' + workId;
                        try {
                            const player = videojs.getPlayer(playerId);
                            if (player) {
                                player.currentTime(0);
                                if (AUDIO_AUTOPLAY_ENABLED) {
                                    setTimeout(function () {
                                        if (player.readyState() >= 2) {
                                            player.play().catch(function (err) {
                                                handleAutoplayError(err, 'WorkPlayer');
                                            });
                                        } else {
                                            player.on('loadedmetadata', function () {
                                                player.play().catch(function (err) {
                                                    handleAutoplayError(err, 'WorkPlayer');
                                                });
                                            });
                                        }
                                    }, 100);
                                }
                            }
                        } catch (e) {
                            // 忽略錯誤
                        }

                        // 確保 Swiper 在第一個 slide
                        const swiperKey = (workId === 1 && document.getElementById('workSwiper1Mobile')) ? workId + 'Mobile' : workId;
                        if (window.workSwipers && window.workSwipers[swiperKey]) {
                            try {
                                window.workSwipers[swiperKey].slideTo(0);
                            } catch (e) {
                                // 忽略錯誤
                            }
                        }
                    }, 200);
                });

                // 平滑滾動到內容
                setTimeout(() => {
                    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                content.style.display = 'none';
                content.classList.remove('active');

                // 銷毀其他作品的 Swiper
                const otherWorkId = parseInt(contentWorkId);
                destroyWorkSwiper(otherWorkId);
            }
        });
    }

    /**
     * 初始化地圖頁籤切換功能（手機版）
     */
    function initMapTabs() {
        const mapTabs = document.querySelectorAll('.mapTab');
        const mapFloors = document.querySelectorAll('.mapFloor');

        if (mapTabs.length === 0 || mapFloors.length === 0) {
            return;
        }

        mapTabs.forEach(tab => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                const targetFloor = this.getAttribute('data-floor');

                // 更新頁籤 active 狀態
                mapTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 更新樓層顯示
                mapFloors.forEach(floor => {
                    const floorId = floor.getAttribute('data-floor');
                    if (floorId === targetFloor) {
                        floor.classList.add('active');
                    } else {
                        floor.classList.remove('active');
                    }
                });
            });
        });
    }

    /**
     * 初始化 Logo 點擊事件（切換回展覽簡介）
     */
    function initLogoClick() {
        // 桌面版 logo
        const desktopLogo = document.querySelector('.headerBody .logo');
        // 手機版 logo
        const mobileLogo = document.querySelector('.headerMobile .logo a');

        // 桌面版 logo 點擊事件
        if (desktopLogo) {
            desktopLogo.addEventListener('click', function (e) {
                e.preventDefault();
                switchTab('exhibition', true);
            });
            // 添加 cursor pointer 樣式提示
            desktopLogo.style.cursor = 'pointer';
        }

        // 手機版 logo 點擊事件
        if (mobileLogo) {
            mobileLogo.addEventListener('click', function (e) {
                e.preventDefault();
                switchTab('exhibition', true);
            });
        }
    }

    /**
     * 初始化 Tab 切換功能
     */
    function initTabSwitcher() {
        // 桌面版：nav ul li[data-tab]
        const tabButtons = document.querySelectorAll('nav ul li[data-tab]');
        // 手機版：nav a[data-tab]（headerMobile 內的）
        const mobileTabButtons = document.querySelectorAll('.headerMobile nav a[data-tab]');

        // 點擊事件處理（桌面版）
        tabButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const targetTab = this.getAttribute('data-tab');
                console.log('點擊 tab 按鈕:', targetTab); // 調試信息
                switchTab(targetTab, true);
            });
        });

        // 點擊事件處理（手機版）
        mobileTabButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab, true);
            });
        });

        /**
         * 處理路由變化（用於 hashchange 和 popstate 事件）
         */
        function handleRouteChange() {
            const hashInfo = getTabFromHash();
            const wrapper = document.querySelector('.wrapper');

            console.log('[History] handleRouteChange 開始', {
                hashInfo: hashInfo,
                currentHash: window.location.hash,
                currentLang: currentLang,
                targetLang: hashInfo.lang,
                targetTab: hashInfo.tab
            });

            // 更新語言（如果 hash 中有語言資訊，且與當前語言不同）
            // 注意：這裡只更新語言變數和 UI，不更新 hash，因為 hash 已經改變了
            // hash 的更新應該由 switchLanguage 函數處理（通過 hashchange 事件監聽器）
            if (hashInfo.lang !== currentLang) {
                console.log('[History] handleRouteChange: 語言變化', {
                    from: currentLang,
                    to: hashInfo.lang,
                    note: '只更新語言變數和 UI，不更新 hash'
                });
                // 只更新語言，不更新 hash（因為 hash 已經改變了）
                currentLang = hashInfo.lang;
                applyTranslations(hashInfo.lang);
                document.documentElement.setAttribute('data-lang', hashInfo.lang);
                // 重新載入音訊檔案（根據新語言）
                reloadAudioForLanguage(hashInfo.lang);
            } else {
                console.log('[History] handleRouteChange: 語言無變化', {
                    currentLang: currentLang,
                    hashLang: hashInfo.lang
                });
            }

            console.log('[History] handleRouteChange: 切換 tab', {
                targetTab: hashInfo.tab,
                currentHash: window.location.hash
            });
            switchTab(hashInfo.tab, false); // 不更新 hash，因為已經改變了

            // 如果是作品詳情，顯示對應作品（workId 可能為 0=引言，不可用 if(workId)）
            if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
                const workId = getWorkIdFromName(hashInfo.workName);
                if (workId != null) {
                    setTimeout(() => {
                        showWorkDetail(workId);
                    }, 200);
                }
            } else {
                // 如果不是作品詳情，確保 headerBody 狀態正確
                if (hashInfo.tab === 'exhibition') {
                    toggleHeaderBody(true);
                    if (wrapper) {
                        wrapper.classList.remove('height-auto-mobile');
                    }
                } else if (hashInfo.tab === 'audio') {
                    toggleHeaderBody(false);
                    if (wrapper && window.innerWidth <= 960) {
                        wrapper.classList.add('height-auto-mobile');
                    } else if (wrapper) {
                        wrapper.classList.remove('height-auto-mobile');
                    }
                }
            }
        }

        // 監聽 hash 變化（瀏覽器前進/後退按鈕 - hashchange 事件）
        // 注意：這個監聽器在 capture phase 之後執行（因為沒有指定 capture: true）
        window.addEventListener('hashchange', function (e) {
            console.log('[History] hashchange 事件觸發 (路由處理)', {
                oldURL: e.oldURL,
                newURL: e.newURL,
                currentHash: window.location.hash,
                isUpdatingHash: window._isUpdatingHash,
                isPopstateEvent: window._isPopstateEvent,
                stackTrace: new Error().stack
            });

            // 如果是由 updateHash 觸發的，不處理（避免重複處理）
            if (window._isUpdatingHash) {
                console.log('[History] hashchange (路由處理): 由 updateHash 觸發，跳過處理');
                return;
            }

            // 如果是 popstate 事件觸發的，也不處理（因為 popstate 會自己處理）
            if (window._isPopstateEvent) {
                console.log('[History] hashchange (路由處理): 由 popstate 觸發，跳過處理');
                return;
            }

            console.log('[History] hashchange (路由處理): 處理路由變化');
            handleRouteChange();
        });

        // 監聽 popstate 事件（當使用 pushState 時，瀏覽器前進/後退會觸發此事件）
        window.addEventListener('popstate', function (e) {
            console.log('[History] popstate 事件觸發', {
                state: e.state,
                currentHash: window.location.hash,
                currentUrl: window.location.href,
                historyLength: history.length
            });

            // 標記這是 popstate 事件，避免在 updateHash 中重複觸發 hashchange
            window._isPopstateEvent = true;

            // 從歷史記錄恢復狀態
            // 注意：當使用 pushState 更新 hash 時，瀏覽器會自動更新 window.location.hash
            // 但 popstate 事件可能在 hash 更新之前觸發，所以我們需要延遲處理
            setTimeout(function () {
                console.log('[History] popstate: 處理路由變化', {
                    hash: window.location.hash,
                    state: history.state
                });
                handleRouteChange();
                // 清除標記
                window._isPopstateEvent = false;
            }, 50); // 增加延遲時間，確保 hash 已更新
        });

        // 頁面載入時根據 hash 切換 tab
        const hashInfo = getTabFromHash();
        switchTab(hashInfo.tab, false); // 不更新 hash，使用現有的

        // 如果是作品詳情，顯示對應作品（workId 可能為 0=引言，不可用 if(workId)）
        if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
            const workId = getWorkIdFromName(hashInfo.workName);
            if (workId != null) {
                setTimeout(() => {
                    showWorkDetail(workId);
                }, 300);
            }
        }

        // 監聽視窗大小變化，更新 headerBody 顯示狀態和 wrapper 高度
        window.addEventListener('resize', function () {
            const hashInfo = getTabFromHash();
            const wrapper = document.querySelector('.wrapper');

            if (hashInfo.tab === 'exhibition') {
                toggleHeaderBody(true);
                if (wrapper) {
                    wrapper.classList.remove('height-auto-mobile');
                }
            } else if (hashInfo.tab === 'audio') {
                toggleHeaderBody(false);
                if (wrapper && window.innerWidth <= 960) {
                    wrapper.classList.add('height-auto-mobile');
                } else if (wrapper) {
                    wrapper.classList.remove('height-auto-mobile');
                }
            } else if (hashInfo.tab === 'workDetail') {
                toggleHeaderBody(false);
                if (wrapper && window.innerWidth <= 960) {
                    wrapper.classList.add('height-auto-mobile');
                } else if (wrapper) {
                    wrapper.classList.remove('height-auto-mobile');
                }
            }
        });
    }

    /**
     * 初始化作品閃爍動畫
     */
    function initWorkBlink() {
        const workLinks = document.querySelectorAll('.mapUnit a[class^="work"]');

        // 等待一小段時間後再啟動動畫，確保頁面已完全載入
        setTimeout(function () {
            workLinks.forEach((link, index) => {
                // 為每個作品生成隨機的動畫延遲（0-2秒之間）
                const randomDelay = Math.random() * 2;
                // 為每個作品生成隨機的動畫持續時間（2.5-3.5秒之間）
                const randomDuration = 2.5 + Math.random() * 1;

                // 使用 CSS 變數設置動畫延遲和持續時間（這些變數會被 ::after 偽元素使用）
                link.style.setProperty('--blink-delay', randomDelay + 's');
                link.style.setProperty('--blink-duration', randomDuration + 's');

                // 添加 .blinking 類名來啟動動畫（::after 偽元素會響應這個類名）
                link.classList.add('blinking');
            });
        }, 300); // 300ms 後啟動動畫，確保頁面已穩定
    }

    /**
     * 初始化作品點擊功能
     */
    function initWorkClick() {
        const workLinks = document.querySelectorAll('.mapUnit a[class^="work"]');
        const workDetailContainer = document.querySelector('div[data-content="workDetail"]');

        if (workLinks.length === 0 || !workDetailContainer) {
            return;
        }

        workLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // 從 class 名稱提取作品編號（work1 -> 1, work2 -> 2, ...）
                const className = this.className;
                const workNumber = className.match(/work(\d+)/);

                if (!workNumber || workNumber.length < 2) {
                    return;
                }

                const workId = parseInt(workNumber[1]);

                // 獲取作品英文名稱
                const workName = getWorkName(workId);
                if (!workName) {
                    return;
                }

                // 先更新 URL hash 為作品英文名稱（使用 pushState 建立歷史記錄）
                // 這樣可以確保歷史記錄正確建立
                const hashInfo = getTabFromHash();
                if (hashInfo.lang === 'en') {
                    updateHash('en/' + workName);
                } else {
                    updateHash(workName);
                }

                // 然後切換到作品詳情 tab（不更新 hash，因為已經更新了）
                switchTab('workDetail', false);

                // 顯示對應的作品內容
                setTimeout(() => {
                    showWorkDetail(workId);
                }, 200); // 等待 tab 切換動畫完成
            });
        });
    }

    /**
     * 初始化作品關閉按鈕
     */
    function initWorkCloseButton() {
        const closeButtons = document.querySelectorAll('.closeWorkSwiper');

        closeButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                // 切換回語音導覽頁面
                switchTab('audio', true);
            });
        });
    }

    /**
     * 初始化 Video.js 播放器
     */
    /**
     * 設置音訊播放器的自定義播放圖示
     * @param {Object} player - Video.js 播放器實例
     */
    function setupAudioPlayerIcon(player) {
        console.log('[Icon] setupAudioPlayerIcon 被調用', {
            playerExists: !!player,
            controlBarExists: !!(player && player.controlBar),
            paused: player ? player.paused() : 'N/A'
        });

        if (!player || !player.controlBar) {
            console.warn('[Icon] 播放器或控制欄不存在');
            return;
        }

        const playButton = player.controlBar.playToggle.el();
        if (!playButton) {
            console.warn('[Icon] 播放按鈕不存在');
            return;
        }

        console.log('[Icon] 播放按鈕已找到', {
            playButtonExists: !!playButton,
            innerHTML: playButton.innerHTML.substring(0, 100)
        });

        // 確保按鈕可以點擊
        playButton.style.cursor = 'pointer';
        playButton.style.pointerEvents = 'auto';

        // 檢查是否需要更新圖示
        let playIcon = playButton.querySelector('.custom-play-icon');
        const isPaused = player.paused();
        // 邏輯：暫停時顯示播放圖示（讓用戶點擊播放），播放時顯示暫停圖示（讓用戶點擊暫停）
        const iconSrc = isPaused ? 'images/icon-play.svg' : 'images/icon-stop.svg';
        console.log('[Icon] 圖示邏輯檢查', {
            isPaused: isPaused,
            iconSrc: iconSrc,
            expectedBehavior: isPaused ? '顯示播放圖示（三角形，讓用戶點擊播放）' : '顯示暫停圖示（兩條線，讓用戶點擊暫停）'
        });
        const needsReplace = playIcon && playIcon.src && !playIcon.src.includes(iconSrc.split('/').pop());

        if (!playIcon || needsReplace) {
            console.log('[Icon] 創建/替換圖示元素', {
                playIconExists: !!playIcon,
                needsReplace: needsReplace,
                currentSrc: playIcon ? playIcon.src : 'N/A',
                newSrc: iconSrc
            });

            // 如果存在舊圖示，先移除
            if (playIcon) {
                playIcon.remove();
            }

            // 移除所有預設內容和樣式（只在第一次設置時）
            if (!playButton.querySelector('.custom-play-icon')) {
                playButton.innerHTML = '';

                // 隱藏所有預設的 Video.js 元素
                const placeholder = playButton.querySelector('.vjs-icon-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
                const controlText = playButton.querySelector('.vjs-control-text');
                if (controlText) {
                    controlText.style.display = 'none';
                }
            }

            // 創建新的圖示元素
            playIcon = document.createElement('img');
            playIcon.className = 'custom-play-icon';
            playButton.appendChild(playIcon);
            console.log('[Icon] 圖示元素已創建/替換並添加到按鈕');
        } else {
            console.log('[Icon] 使用現有的圖示元素', {
                currentSrc: playIcon.src
            });
        }

        // 更新圖示屬性（iconSrc 已在上面定義）
        console.log('[Icon] 更新圖示', {
            paused: isPaused,
            iconSrc: iconSrc,
            playIconExists: !!playIcon,
            currentSrc: playIcon ? playIcon.src : 'N/A',
            willChange: playIcon && playIcon.src && !playIcon.src.includes(iconSrc.split('/').pop())
        });

        if (playIcon) {
            const oldSrc = playIcon.src;
            // 獲取當前 URL 的基礎路徑
            const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
            const oldSrcRelative = oldSrc.replace(baseUrl, '').replace(/^\/+/, '');

            // 檢查是否需要更新
            const needsUpdate = !oldSrc.includes(iconSrc.split('/').pop());

            if (needsUpdate) {
                console.log('[Icon] 需要更新圖示，強制刷新', {
                    oldSrc: oldSrc,
                    newSrc: iconSrc
                });

                // 方法1: 先移除圖示，強制瀏覽器重新載入
                playIcon.style.display = 'none';
                playIcon.src = ''; // 先清空

                // 使用 requestAnimationFrame 確保 DOM 更新
                requestAnimationFrame(() => {
                    // 設置新的圖示路徑（添加時間戳避免緩存）
                    const timestamp = new Date().getTime();
                    playIcon.src = iconSrc + '?v=' + timestamp;
                    playIcon.setAttribute('src', iconSrc + '?v=' + timestamp);

                    // 強制重新顯示
                    playIcon.style.display = 'block';
                    playIcon.style.visibility = 'visible';
                    playIcon.style.opacity = '1';

                    console.log('[Icon] 圖示已強制刷新', {
                        newSrc: iconSrc + '?v=' + timestamp,
                        display: playIcon.style.display,
                        visibility: playIcon.style.visibility
                    });
                });
            } else {
                // 如果不需要更新，只設置屬性
                playIcon.src = iconSrc;
                playIcon.setAttribute('src', iconSrc);
            }

            // 驗證圖示是否正確設置
            setTimeout(() => {
                const actualSrc = playIcon.src;
                const actualSrcRelative = actualSrc.replace(baseUrl, '').replace(/^\/+/, '');
                console.log('[Icon] 圖示更新驗證', {
                    oldSrc: oldSrc,
                    oldSrcRelative: oldSrcRelative,
                    newSrc: iconSrc,
                    actualSrc: actualSrc,
                    actualSrcRelative: actualSrcRelative,
                    expectedFileName: iconSrc.split('/').pop(),
                    actuallyChanged: oldSrcRelative !== iconSrc,
                    isCorrect: actualSrcRelative === iconSrc || actualSrc.includes(iconSrc.split('/').pop()),
                    imgComplete: playIcon.complete,
                    imgNaturalWidth: playIcon.naturalWidth,
                    imgNaturalHeight: playIcon.naturalHeight
                });
            }, 50);
        }
        if (playIcon) {
            // 與圖示邏輯保持一致
            playIcon.alt = player.paused() ? '播放' : '暫停';
        }
        playIcon.style.width = '50px';
        playIcon.style.height = '50px';
        playIcon.style.display = 'block';
        playIcon.style.visibility = 'visible';
        playIcon.style.opacity = '1';
        playIcon.style.pointerEvents = 'none'; // 讓點擊事件穿透到按鈕
        playIcon.style.position = 'relative';
        playIcon.style.zIndex = '10';

        // 確保按鈕容器也正確設置
        playButton.style.display = 'flex';
        playButton.style.alignItems = 'center';
        playButton.style.justifyContent = 'center';
        playButton.style.width = '50px';
        playButton.style.height = '50px';
        playButton.style.position = 'relative';
        playButton.style.zIndex = '10';

        // 驗證圖示是否正確設置
        setTimeout(() => {
            const verifyIcon = playButton.querySelector('.custom-play-icon');
            const playButtonStyle = window.getComputedStyle(playButton);
            const iconStyle = verifyIcon ? window.getComputedStyle(verifyIcon) : null;

            console.log('[Icon] 驗證圖示設置', {
                iconFound: !!verifyIcon,
                iconSrc: verifyIcon ? verifyIcon.src : 'N/A',
                iconDisplay: iconStyle ? iconStyle.display : 'N/A',
                iconVisibility: iconStyle ? iconStyle.visibility : 'N/A',
                iconOpacity: iconStyle ? iconStyle.opacity : 'N/A',
                iconWidth: iconStyle ? iconStyle.width : 'N/A',
                iconHeight: iconStyle ? iconStyle.height : 'N/A',
                playButtonDisplay: playButtonStyle.display,
                playButtonVisibility: playButtonStyle.visibility,
                playButtonOpacity: playButtonStyle.opacity,
                playButtonWidth: playButtonStyle.width,
                playButtonHeight: playButtonStyle.height,
                playButtonPosition: playButtonStyle.position,
                playButtonZIndex: playButtonStyle.zIndex,
                playButtonParent: playButton.parentElement ? playButton.parentElement.className : 'N/A'
            });

            // 檢查是否有其他元素遮擋
            if (verifyIcon) {
                const rect = verifyIcon.getBoundingClientRect();
                console.log('[Icon] 圖示位置信息', {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    visible: rect.width > 0 && rect.height > 0
                });
            }
        }, 100);
    }

    function initVideoPlayer() {
        console.log('[AudioGuide] initVideoPlayer 開始執行');

        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            console.warn('[AudioGuide] Video.js is not loaded');
            return;
        }

        const playerElement = document.getElementById('audioVideoPlayer');
        if (!playerElement) {
            console.warn('[AudioGuide] 找不到 audioVideoPlayer 元素');
            return;
        }

        console.log('[AudioGuide] audioVideoPlayer 元素已找到');

        // 檢查 Video.js 是否已經初始化了這個元素
        const existingPlayer = videojs.getPlayer('audioVideoPlayer');
        console.log('[AudioGuide] 檢查播放器是否已存在', {
            existingPlayer: !!existingPlayer,
            windowAudioVideoPlayer: !!window.audioVideoPlayer,
            hash: window.location.hash
        });

        if (existingPlayer) {
            console.log('[AudioGuide] 播放器已存在，使用現有播放器');
            // 播放器已經存在，直接使用並設置圖示
            window.audioVideoPlayer = existingPlayer;

            // 確保音訊來源已設置（根據當前語言）
            const mainAudioSrc = getMainAudioFile(currentLang);
            const currentSrc = existingPlayer.src();
            const currentSrcString = typeof currentSrc === 'string' ? currentSrc : (currentSrc && currentSrc.src ? currentSrc.src : '');

            console.log('[AudioGuide] 播放器已存在，檢查音訊來源', {
                currentSrc: currentSrcString,
                targetSrc: mainAudioSrc,
                needsReload: currentSrcString !== mainAudioSrc
            });

            // 如果音訊來源不正確，重新設置
            if (currentSrcString !== mainAudioSrc && currentSrcString !== mainAudioSrc.replace(/^images\//, '')) {
                console.log('[AudioGuide] 重新設置音訊來源', mainAudioSrc);
                existingPlayer.src({
                    type: 'audio/mpeg',
                    src: mainAudioSrc
                });
            }

            // 確保自定義圖示已設置和事件監聽器已綁定
            const setupIconAndEvents = function (player) {
                setupAudioPlayerIcon(player);

                // 綁定播放狀態變化事件監聽器（參考正常初始化流程）
                player.off('play', updateAudioPlayerIcon);
                player.off('pause', updateAudioPlayerIcon);

                function updateAudioPlayerIcon(event) {
                    const paused = player.paused();
                    console.log('[AudioGuide] ========== 播放狀態變化事件觸發（播放器已存在）==========', {
                        eventType: event ? event.type : 'unknown',
                        paused: paused,
                        readyState: player.readyState(),
                        timestamp: new Date().toISOString()
                    });

                    // 直接更新圖示（參考作品播放器的實現方式）
                    const playButton = player.controlBar.playToggle.el();
                    if (playButton) {
                        const playIcon = playButton.querySelector('.custom-play-icon');
                        if (playIcon) {
                            // 邏輯：暫停時顯示播放圖示，播放時顯示暫停圖示
                            const iconSrc = paused ? 'images/icon-play.svg' : 'images/icon-stop.svg';
                            const oldSrc = playIcon.src;

                            console.log('[AudioGuide] 直接更新圖示（播放器已存在）', {
                                paused: paused,
                                oldSrc: oldSrc,
                                newSrc: iconSrc,
                                willChange: !oldSrc.includes(iconSrc.split('/').pop())
                            });

                            // 強制更新圖示（使用時間戳避免緩存）
                            if (!oldSrc.includes(iconSrc.split('/').pop())) {
                                const timestamp = new Date().getTime();
                                playIcon.src = iconSrc + '?v=' + timestamp;
                                playIcon.setAttribute('src', iconSrc + '?v=' + timestamp);
                                playIcon.alt = paused ? '播放' : '暫停';

                                console.log('[AudioGuide] 圖示已更新（播放器已存在）', {
                                    newSrc: iconSrc + '?v=' + timestamp,
                                    alt: playIcon.alt,
                                    paused: paused
                                });
                            }
                        } else {
                            console.warn('[AudioGuide] 找不到圖示元素，調用 setupAudioPlayerIcon');
                            setupAudioPlayerIcon(player);
                        }
                    } else {
                        console.warn('[AudioGuide] 找不到播放按鈕，調用 setupAudioPlayerIcon');
                        setupAudioPlayerIcon(player);
                    }
                }

                player.on('play', updateAudioPlayerIcon);
                player.on('pause', updateAudioPlayerIcon);

                console.log('[AudioGuide] ========== 播放狀態事件監聽器已綁定（播放器已存在）==========', {
                    hasPlayListener: true,
                    hasPauseListener: true,
                    playerId: player.id(),
                    playerReady: player.readyState(),
                    currentPaused: player.paused()
                });
            };

            if (existingPlayer.readyState() >= 1) {
                // 播放器已就緒，立即設置
                setupIconAndEvents(existingPlayer);
            } else {
                // 播放器尚未就緒，等待就緒後設置
                existingPlayer.ready(function () {
                    setupIconAndEvents(existingPlayer);
                });
            }

            // 檢查是否在語音導覽頁面，如果是則自動播放
            const isAudioTab = function () {
                const hash = window.location.hash;
                if (hash.includes('audio')) {
                    return true;
                }
                const audioContainer = document.querySelector('div[data-content="audio"]');
                return audioContainer && audioContainer.style.display !== 'none';
            };

            if (isAudioTab()) {
                // 確保播放時間為 0
                try {
                    if (existingPlayer.currentTime() > 0) {
                        existingPlayer.currentTime(0);
                        console.log('[AudioGuide] 播放器已存在，重置播放時間為 0');
                    }
                } catch (e) {
                    console.warn('[AudioGuide] 重置播放時間失敗:', e);
                }

                // 延遲播放，確保頁面已切換
                setTimeout(function () {
                    // 確保圖示已設置
                    setupAudioPlayerIcon(existingPlayer);

                    const tryPlay = () => {
                        console.log('[AudioGuide] 嘗試播放（播放器已存在）', {
                            readyState: existingPlayer.readyState(),
                            paused: existingPlayer.paused(),
                            src: existingPlayer.src(),
                            currentTime: existingPlayer.currentTime()
                        });

                        // 再次確保播放時間為 0
                        try {
                            if (existingPlayer.currentTime() > 0) {
                                existingPlayer.currentTime(0);
                            }
                        } catch (e) {
                            // 忽略錯誤
                        }

                        if (AUDIO_AUTOPLAY_ENABLED && existingPlayer.readyState() >= 2) {
                            // 音訊已載入且開關開啟，直接播放
                            existingPlayer.play().then(() => {
                                console.log('[AudioGuide] 播放成功（播放器已存在）');
                                // 播放成功後更新圖示
                                setupAudioPlayerIcon(existingPlayer);
                            }).catch(function (err) {
                                handleAutoplayError(err, 'AudioGuide', function () {
                                    // 播放失敗後也要更新圖示
                                    setupAudioPlayerIcon(existingPlayer);
                                });
                            });
                        } else if (AUDIO_AUTOPLAY_ENABLED) {
                            console.log('[AudioGuide] 音訊尚未載入，等待載入（播放器已存在）', {
                                readyState: existingPlayer.readyState()
                            });
                            const onCanPlay = () => {
                                try {
                                    if (existingPlayer.currentTime() > 0) {
                                        existingPlayer.currentTime(0);
                                    }
                                } catch (e) {
                                    // 忽略錯誤
                                }
                                console.log('[AudioGuide] 音訊載入完成，開始播放（播放器已存在）');
                                existingPlayer.play().then(() => {
                                    console.log('[AudioGuide] 播放成功（播放器已存在）');
                                    // 播放成功後更新圖示
                                    setupAudioPlayerIcon(existingPlayer);
                                }).catch(function (err) {
                                    handleAutoplayError(err, 'AudioGuide', function () {
                                        // 播放失敗後也要更新圖示
                                        setupAudioPlayerIcon(existingPlayer);
                                    });
                                });
                                existingPlayer.off('canplay', onCanPlay);
                                existingPlayer.off('loadedmetadata', onCanPlay);
                            };
                            existingPlayer.on('canplay', onCanPlay);
                            existingPlayer.on('loadedmetadata', onCanPlay);
                        }
                    };
                    tryPlay();
                }, 500);
            }

            // 頁面載入時，如果直接進入 audio tab，確保播放器已初始化，依開關決定是否自動播放
            setTimeout(() => {
                const hashInfo = getTabFromHash();
                if (hashInfo.tab === 'audio' && isAudioTab()) {
                    console.log('[AudioGuide] 頁面載入時檢測到 audio tab（播放器已存在）');
                    try {
                        if (existingPlayer.currentTime() > 0) {
                            existingPlayer.currentTime(0);
                            console.log('[AudioGuide] 頁面載入時重置播放時間為 0（播放器已存在）');
                        }
                    } catch (e) {
                        // 忽略錯誤
                    }
                    setupAudioPlayerIcon(existingPlayer);
                    if (AUDIO_AUTOPLAY_ENABLED) {
                        if (existingPlayer.readyState() >= 2) {
                            existingPlayer.play().then(() => {
                                console.log('[AudioGuide] 頁面載入時播放成功（播放器已存在）');
                                setupAudioPlayerIcon(existingPlayer);
                            }).catch(function (err) {
                                handleAutoplayError(err, 'AudioGuide', function () {
                                    setupAudioPlayerIcon(existingPlayer);
                                });
                            });
                        } else {
                            existingPlayer.on('canplay', function () {
                                existingPlayer.play().then(() => {
                                    console.log('[AudioGuide] 頁面載入時播放成功（播放器已存在，等待載入）');
                                    setupAudioPlayerIcon(existingPlayer);
                                }).catch(function (err) {
                                    handleAutoplayError(err, 'AudioGuide', function () {
                                        setupAudioPlayerIcon(existingPlayer);
                                    });
                                });
                            });
                        }
                    }
                }
            }, 1500);

            return;
        }

        // 檢查播放器是否已經初始化，避免重複初始化
        if (window.audioVideoPlayer) {
            // 播放器已經初始化，確保圖示已設置
            if (typeof window.audioVideoPlayer.readyState === 'function' && window.audioVideoPlayer.readyState() >= 1) {
                setupAudioPlayerIcon(window.audioVideoPlayer);
            } else if (typeof window.audioVideoPlayer.ready === 'function') {
                window.audioVideoPlayer.ready(function () {
                    setupAudioPlayerIcon(window.audioVideoPlayer);
                });
            }
            return;
        }

        // 初始化 Video.js 播放器
        const player = videojs('audioVideoPlayer', {
            controls: true,
            autoplay: false,
            preload: 'auto',
            fluid: false,
            responsive: false,
            width: '100%',
            height: 'auto',
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            // 禁用控制欄自動隱藏
            userActions: {
                hotkeys: false
            },
            // 自定義控制欄
            controlBar: {
                playToggle: true,
                currentTimeDisplay: true,
                timeDivider: false, // 禁用時間分隔符
                durationDisplay: true,
                progressControl: {
                    seekBar: true
                },
                volumePanel: false, // 移除音量控制
                fullscreenToggle: false
            }
        });

        // 儲存播放器實例供後續使用
        window.audioVideoPlayer = player;

        // 預設載入音訊檔案（00.mp3）
        // 監聽播放器就緒事件
        player.ready(function () {

            // 確保控制欄永遠顯示
            const controlBar = player.controlBar;
            if (controlBar) {
                controlBar.el().style.display = 'flex';
                controlBar.el().style.opacity = '1';
                controlBar.el().style.visibility = 'visible';

                // 禁用自動隱藏（使用 CSS 和 userActive）
                player.userActive(true);
                // 監聽 userinactive 事件，立即恢復為 active
                player.on('userinactive', function () {
                    player.userActive(true);
                });
            }

            // 設定預設音訊來源（根據當前語言）
            const mainAudioSrc = getMainAudioFile(currentLang);
            console.log('[AudioGuide] 設置音訊來源', {
                lang: currentLang,
                audioSrc: mainAudioSrc
            });
            player.src({
                type: 'audio/mpeg',
                src: mainAudioSrc
            });

            // 監聽音訊載入事件
            player.on('loadstart', function () {
                console.log('[AudioGuide] 開始載入音訊', mainAudioSrc);
            });
            player.on('loadeddata', function () {
                console.log('[AudioGuide] 音訊資料已載入', {
                    readyState: player.readyState(),
                    duration: player.duration()
                });
            });
            player.on('loadedmetadata', function () {
                console.log('[AudioGuide] 音訊 metadata 已載入', {
                    readyState: player.readyState(),
                    duration: player.duration()
                });
            });
            player.on('canplay', function () {
                console.log('[AudioGuide] 音訊可以播放', {
                    readyState: player.readyState(),
                    duration: player.duration()
                });
            });
            player.on('canplaythrough', function () {
                console.log('[AudioGuide] 音訊可以完整播放', {
                    readyState: player.readyState(),
                    duration: player.duration()
                });
            });

            // 檢查是否在語音導覽頁面（通過檢查 hash 或 tab 顯示狀態）
            const isAudioTab = function () {
                const hash = window.location.hash;
                if (hash.includes('audio')) {
                    return true;
                }
                const audioContainer = document.querySelector('div[data-content="audio"]');
                return audioContainer && audioContainer.style.display !== 'none';
            };

            // 監聽音訊載入完成後，依開關決定是否自動播放（僅在語音導覽頁面）
            const tryAutoPlay = () => {
                const isAudio = isAudioTab();
                console.log('[AudioGuide] initVideoPlayer: 嘗試自動播放', {
                    isAudioTab: isAudio,
                    autoplayEnabled: AUDIO_AUTOPLAY_ENABLED,
                    readyState: player.readyState(),
                    paused: player.paused()
                });

                if (isAudio) {
                    // 確保圖示已設置
                    setupAudioPlayerIcon(player);

                    if (AUDIO_AUTOPLAY_ENABLED && player.readyState() >= 2) {
                        // 音訊已載入且開關開啟，直接播放
                        console.log('[AudioGuide] initVideoPlayer: 音訊已載入，開始播放');
                        player.play().then(() => {
                            console.log('[AudioGuide] initVideoPlayer: 播放成功');
                            setupAudioPlayerIcon(player);
                        }).catch(function (err) {
                            handleAutoplayError(err, 'AudioGuide', function () {
                                setupAudioPlayerIcon(player);
                            });
                        });
                    } else if (AUDIO_AUTOPLAY_ENABLED) {
                        console.log('[AudioGuide] initVideoPlayer: 音訊尚未載入，等待載入...', {
                            readyState: player.readyState()
                        });
                        // 等待音訊載入
                        const onCanPlay = () => {
                            if (isAudioTab() && AUDIO_AUTOPLAY_ENABLED) {
                                console.log('[AudioGuide] initVideoPlayer: 音訊載入完成，開始播放');
                                player.play().then(() => {
                                    console.log('[AudioGuide] initVideoPlayer: 播放成功');
                                    setupAudioPlayerIcon(player);
                                }).catch(function (err) {
                                    handleAutoplayError(err, 'AudioGuide', function () {
                                        setupAudioPlayerIcon(player);
                                    });
                                });
                            }
                            player.off('canplay', onCanPlay);
                            player.off('loadedmetadata', onCanPlay);
                        };
                        player.on('canplay', onCanPlay);
                        player.on('loadedmetadata', onCanPlay);
                    }
                }
            };

            player.on('loadedmetadata', tryAutoPlay);
            player.on('canplay', tryAutoPlay);

            // 如果音訊已經載入，立即播放（僅在語音導覽頁面）
            // 延遲更長時間，確保頁面切換已完成
            setTimeout(tryAutoPlay, 500);

            // 頁面載入時，如果直接進入 audio tab，確保播放器已初始化並自動播放
            // 這個檢查會在 initTabSwitcher 之後執行
            setTimeout(() => {
                const hashInfo = getTabFromHash();
                if (hashInfo.tab === 'audio') {
                    console.log('[AudioGuide] 頁面載入時檢測到 audio tab，確保播放器已初始化');
                    // 確保播放時間為 0
                    try {
                        if (player.currentTime() > 0) {
                            player.currentTime(0);
                            console.log('[AudioGuide] 頁面載入時重置播放時間為 0');
                        }
                    } catch (e) {
                        // 忽略錯誤
                    }
                    // 再次嘗試自動播放
                    tryAutoPlay();
                }
            }, 1000);

            // 監聽錯誤事件
            player.on('error', function () {
                const error = player.error();
                console.error('主要音訊播放器載入錯誤:', {
                    audioFile: mainAudioSrc,
                    error: error
                });
            });

            // 移除音量控制元素（確保完全隱藏）
            const volumePanel = player.controlBar.volumePanel;
            if (volumePanel) {
                volumePanel.hide();
                volumePanel.el().style.display = 'none';
            }

            // 使用全局的設置圖示函數

            // 使用事件委派，在控制欄上監聽點擊事件
            const controlBarEl = player.controlBar.el();
            console.log('[AudioGuide] 準備綁定控制欄點擊事件', {
                controlBarElExists: !!controlBarEl,
                controlBarEl: controlBarEl
            });

            if (controlBarEl) {
                // 移除舊的事件監聽器（如果有的話）
                controlBarEl.removeEventListener('click', arguments.callee);

                const clickHandler = function (e) {
                    console.log('[AudioGuide] 控制欄點擊事件觸發', {
                        target: e.target,
                        targetClass: e.target.className,
                        targetTag: e.target.tagName,
                        targetId: e.target.id,
                        timestamp: new Date().toISOString()
                    });

                    const playButton = player.controlBar.playToggle.el();
                    // 檢查 e.target 是否為有效的 DOM 節點
                    const target = e.target && e.target.nodeType === 1 ? e.target : null;

                    // 檢查是否點擊了播放按鈕或圖示
                    const isPlayButtonClick = playButton && target && (
                        playButton.contains(target) ||
                        target.closest('.vjs-play-control') ||
                        target.classList.contains('custom-play-icon') ||
                        target.closest('.custom-play-icon')
                    );

                    console.log('[AudioGuide] 點擊檢查', {
                        isPlayButtonClick: isPlayButtonClick,
                        playButtonExists: !!playButton,
                        targetExists: !!target,
                        paused: player.paused(),
                        readyState: player.readyState()
                    });

                    if (isPlayButtonClick) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('[AudioGuide] 處理播放按鈕點擊', {
                            paused: player.paused(),
                            readyState: player.readyState()
                        });

                        const wasPaused = player.paused();
                        console.log('[AudioGuide] 處理播放按鈕點擊 - 狀態', {
                            wasPaused: wasPaused,
                            readyState: player.readyState()
                        });

                        if (wasPaused) {
                            if (player.readyState() >= 2) {
                                player.play().then(() => {
                                    console.log('[AudioGuide] 手動播放成功，等待事件觸發圖示更新');
                                    // 延遲更新，確保 play 事件已觸發
                                    setTimeout(() => {
                                        console.log('[AudioGuide] 手動更新圖示（播放後）');
                                        setupAudioPlayerIcon(player);
                                    }, 50);
                                }).catch(function (err) {
                                    console.error('[AudioGuide] 播放錯誤:', err);
                                    setupAudioPlayerIcon(player);
                                });
                            } else {
                                console.warn('[AudioGuide] 音訊尚未載入，無法播放', {
                                    readyState: player.readyState()
                                });
                            }
                        } else {
                            player.pause();
                            console.log('[AudioGuide] 已暫停，等待事件觸發圖示更新');
                            // 延遲更新，確保 pause 事件已觸發
                            setTimeout(() => {
                                console.log('[AudioGuide] 手動更新圖示（暫停後）');
                                setupAudioPlayerIcon(player);
                            }, 50);
                        }
                    }
                };

                controlBarEl.addEventListener('click', clickHandler, true); // 使用 capture 階段確保優先執行
                console.log('[AudioGuide] 控制欄點擊事件監聽器已綁定', {
                    hasCapture: true,
                    handlerFunction: 'clickHandler'
                });

                // 也直接在播放按鈕上綁定事件
                const playButton = player.controlBar.playToggle.el();
                console.log('[AudioGuide] 準備綁定播放按鈕直接點擊事件', {
                    playButtonExists: !!playButton,
                    playButton: playButton
                });

                if (playButton) {
                    const directClickHandler = function (e) {
                        console.log('[AudioGuide] 播放按鈕直接點擊事件觸發', {
                            target: e.target,
                            timestamp: new Date().toISOString()
                        });
                        e.preventDefault();
                        e.stopPropagation();
                        const wasPaused = player.paused();
                        console.log('[AudioGuide] 處理播放按鈕點擊（直接點擊）- 狀態', {
                            wasPaused: wasPaused,
                            readyState: player.readyState()
                        });

                        if (wasPaused) {
                            if (player.readyState() >= 2) {
                                player.play().then(() => {
                                    console.log('[AudioGuide] 手動播放成功（直接點擊），等待事件觸發圖示更新');
                                    // 延遲更新，確保 play 事件已觸發
                                    setTimeout(() => {
                                        console.log('[AudioGuide] 手動更新圖示（直接點擊，播放後）');
                                        setupAudioPlayerIcon(player);
                                    }, 50);
                                }).catch(function (err) {
                                    console.error('[AudioGuide] 播放錯誤（直接點擊）:', err);
                                    setupAudioPlayerIcon(player);
                                });
                            } else {
                                console.warn('[AudioGuide] 音訊尚未載入，無法播放（直接點擊）', {
                                    readyState: player.readyState()
                                });
                            }
                        } else {
                            player.pause();
                            console.log('[AudioGuide] 已暫停（直接點擊），等待事件觸發圖示更新');
                            // 延遲更新，確保 pause 事件已觸發
                            setTimeout(() => {
                                console.log('[AudioGuide] 手動更新圖示（直接點擊，暫停後）');
                                setupAudioPlayerIcon(player);
                            }, 50);
                        }
                    };

                    playButton.addEventListener('click', directClickHandler, true);
                    console.log('[AudioGuide] 播放按鈕直接點擊事件監聽器已綁定', {
                        hasCapture: true,
                        handlerFunction: 'directClickHandler'
                    });
                } else {
                    console.warn('[AudioGuide] 播放按鈕不存在，無法綁定直接點擊事件');
                }
            } else {
                console.warn('[AudioGuide] 控制欄元素不存在，無法綁定點擊事件');
            }

            // 立即設置圖示
            setupAudioPlayerIcon(player);

            // 延遲再次設置，確保 Video.js 完全初始化
            setTimeout(function () {
                setupAudioPlayerIcon(player);
            }, 200);
            setTimeout(function () {
                setupAudioPlayerIcon(player);
            }, 500);

            // 監聽播放狀態變化，切換圖示
            // 先移除舊的事件監聽器，避免重複綁定
            player.off('play', updateAudioPlayerIcon);
            player.off('pause', updateAudioPlayerIcon);

            function updateAudioPlayerIcon(event) {
                const paused = player.paused();
                console.log('[AudioGuide] ========== 播放狀態變化事件觸發 ==========', {
                    eventType: event ? event.type : 'unknown',
                    paused: paused,
                    readyState: player.readyState(),
                    timestamp: new Date().toISOString()
                });

                // 直接更新圖示（參考作品播放器的實現方式）
                const playButton = player.controlBar.playToggle.el();
                if (playButton) {
                    const playIcon = playButton.querySelector('.custom-play-icon');
                    if (playIcon) {
                        // 邏輯：暫停時顯示播放圖示，播放時顯示暫停圖示
                        const iconSrc = paused ? 'images/icon-play.svg' : 'images/icon-stop.svg';
                        const oldSrc = playIcon.src;

                        console.log('[AudioGuide] 直接更新圖示', {
                            paused: paused,
                            oldSrc: oldSrc,
                            newSrc: iconSrc,
                            willChange: !oldSrc.includes(iconSrc.split('/').pop())
                        });

                        // 強制更新圖示（使用時間戳避免緩存）
                        if (!oldSrc.includes(iconSrc.split('/').pop())) {
                            const timestamp = new Date().getTime();
                            playIcon.src = iconSrc + '?v=' + timestamp;
                            playIcon.setAttribute('src', iconSrc + '?v=' + timestamp);
                            playIcon.alt = paused ? '播放' : '暫停';

                            console.log('[AudioGuide] 圖示已更新', {
                                newSrc: iconSrc + '?v=' + timestamp,
                                alt: playIcon.alt,
                                paused: paused
                            });
                        } else {
                            console.log('[AudioGuide] 圖示無需更新（已正確）', {
                                currentSrc: oldSrc,
                                expectedSrc: iconSrc
                            });
                        }
                    } else {
                        console.warn('[AudioGuide] 找不到圖示元素，調用 setupAudioPlayerIcon');
                        setupAudioPlayerIcon(player);
                    }
                } else {
                    console.warn('[AudioGuide] 找不到播放按鈕，調用 setupAudioPlayerIcon');
                    setupAudioPlayerIcon(player);
                }

                // 確保控制欄永遠顯示
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                }

                // 驗證圖示是否正確更新
                setTimeout(() => {
                    const verifyButton = player.controlBar.playToggle.el();
                    const verifyIcon = verifyButton ? verifyButton.querySelector('.custom-play-icon') : null;
                    // 邏輯：暫停時顯示播放圖示，播放時顯示暫停圖示
                    const expectedSrc = paused ? 'images/icon-play.svg' : 'images/icon-stop.svg';
                    console.log('[AudioGuide] 圖示更新驗證（事件觸發後）', {
                        paused: paused,
                        playIconExists: !!verifyIcon,
                        currentSrc: verifyIcon ? verifyIcon.src : 'N/A',
                        expectedSrc: expectedSrc,
                        expectedFileName: expectedSrc.split('/').pop(),
                        isCorrect: verifyIcon && verifyIcon.src.includes(expectedSrc.split('/').pop())
                    });
                }, 50);
            }

            // 綁定事件監聽器
            player.on('play', updateAudioPlayerIcon);
            player.on('pause', updateAudioPlayerIcon);

            console.log('[AudioGuide] ========== 播放狀態事件監聽器已綁定 ==========', {
                hasPlayListener: true,
                hasPauseListener: true,
                playerId: player.id(),
                playerReady: player.readyState(),
                currentPaused: player.paused()
            });

            // 測試：手動觸發一次更新，確保函數可以正常調用
            setTimeout(() => {
                console.log('[AudioGuide] 測試：手動調用 updateAudioPlayerIcon');
                updateAudioPlayerIcon({ type: 'test' });
            }, 1000);

            // 監聽所有事件，確保控制欄永遠顯示（但不更新圖示，避免頻繁更新）
            player.on(['timeupdate', 'loadedmetadata'], function () {
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                }
            });

            // 頁面載入時，如果直接進入 audio tab，確保播放器已初始化並自動播放
            // 這個檢查會在 initTabSwitcher 之後執行（延遲更長時間）
            const checkAndAutoPlayOnLoad = () => {
                const hashInfo = getTabFromHash();
                const isAudio = hashInfo.tab === 'audio';
                console.log('[AudioGuide] 頁面載入時檢查 audio tab', {
                    hashInfo: hashInfo,
                    isAudio: isAudio,
                    readyState: player.readyState(),
                    paused: player.paused()
                });

                if (isAudio) {
                    console.log('[AudioGuide] 頁面載入時檢測到 audio tab，確保播放器已初始化並自動播放');
                    // 確保播放時間為 0
                    try {
                        if (player.currentTime() > 0) {
                            player.currentTime(0);
                            console.log('[AudioGuide] 頁面載入時重置播放時間為 0');
                        }
                    } catch (e) {
                        console.warn('[AudioGuide] 重置播放時間失敗:', e);
                    }
                    // 確保圖示已設置
                    setupAudioPlayerIcon(player);
                    // 再次嘗試自動播放
                    tryAutoPlay();
                }
            };

            // 立即檢查一次
            setTimeout(checkAndAutoPlayOnLoad, 1500);
            // 再檢查一次，確保播放器已完全初始化
            setTimeout(checkAndAutoPlayOnLoad, 2500);

            // 監聽音訊載入完成事件，如果頁面載入時就在 audio tab，依開關決定是否自動播放
            player.on('canplaythrough', function () {
                const hashInfo = getTabFromHash();
                if (hashInfo.tab === 'audio' && AUDIO_AUTOPLAY_ENABLED) {
                    console.log('[AudioGuide] 音訊載入完成，頁面載入時在 audio tab，嘗試自動播放');
                    try {
                        if (player.currentTime() > 0) {
                            player.currentTime(0);
                        }
                        player.play().then(() => {
                            console.log('[AudioGuide] 頁面載入時自動播放成功（canplaythrough）');
                            setupAudioPlayerIcon(player);
                        }).catch(function (err) {
                            handleAutoplayError(err, 'AudioGuide', function () {
                                setupAudioPlayerIcon(player);
                            });
                        });
                    } catch (e) {
                        console.warn('[AudioGuide] 頁面載入時自動播放錯誤（canplaythrough）:', e);
                    }
                }
            });
        });

        // 監聽錯誤事件
        player.on('error', function () {
            console.error('Video.js player error:', player.error());
        });
    }

    /**
     * 設定播放器來源
     * @param {string} src - 媒體檔案路徑
     * @param {string} type - 媒體類型 ('video' 或 'audio')，預設為 'audio'
     * @param {string} mimeType - MIME 類型，如果未提供則根據檔案副檔名自動判斷
     */
    function setPlayerSource(src, type = 'audio', mimeType = null) {
        if (!window.audioVideoPlayer || typeof window.audioVideoPlayer.pause !== 'function') {
            console.warn('Player not initialized or not ready');
            return;
        }

        // 如果未提供 MIME 類型，根據檔案副檔名自動判斷
        if (!mimeType) {
            const extension = src.split('.').pop().toLowerCase();
            if (type === 'audio') {
                if (extension === 'mp3') {
                    mimeType = 'audio/mpeg';
                } else if (extension === 'm4a') {
                    mimeType = 'audio/mp4';
                } else {
                    mimeType = 'audio/mpeg'; // 預設為 mp3
                }
            } else if (type === 'video') {
                if (extension === 'mp4') {
                    mimeType = 'video/mp4';
                } else if (extension === 'webm') {
                    mimeType = 'video/webm';
                } else {
                    mimeType = 'video/mp4'; // 預設為 mp4
                }
            }
        }

        window.audioVideoPlayer.src({
            type: mimeType,
            src: src
        });
    }

    /**
     * 設定播放器標題
     * @param {string} title - 標題文字
     */
    function setPlayerTitle(title) {
        const titleElement = document.getElementById('audioPlayTitle');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    /**
     * 初始化手機版滾動按鈕功能
     */
    function initScrollDown() {
        const scrollDownBtn = document.querySelector('.scrolldown.mobile');
        const mainElement = document.querySelector('main.main');
        const headerBody = document.querySelector('.headerBody');
        const headerMobile = document.querySelector('.headerMobile');

        if (!scrollDownBtn || !mainElement) {
            return;
        }

        // 初始化全局標記（如果不存在）
        if (typeof window.isScrollingToMain === 'undefined') {
            window.isScrollingToMain = false;
        }

        scrollDownBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // 只在手機版時執行
            if (window.innerWidth > 960) {
                return;
            }

            // 檢查元素是否存在
            if (!headerMobile) {
                console.warn('headerMobile 元素不存在');
                return;
            }

            // 標記正在滾動
            window.isScrollingToMain = true;

            // 先滾動到 main 元素
            mainElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // 立即顯示 headerMobile
            headerMobile.classList.add('show');

            // 滾動過程中持續確保 headerMobile 顯示
            let checkCount = 0;
            const maxChecks = 30; // 最多檢查 30 次（約 1.5 秒）

            let scrollCheckInterval = setInterval(function () {
                checkCount++;

                // 持續確保 headerMobile 顯示
                if (headerMobile && window.innerWidth <= 960) {
                    headerMobile.classList.add('show');
                }

                // 如果檢查次數超過最大值，清除間隔
                if (checkCount >= maxChecks) {
                    clearInterval(scrollCheckInterval);
                }
            }, 50); // 每 50ms 檢查一次

            // 滾動完成後（約 800ms）進行最終確認
            setTimeout(function () {
                clearInterval(scrollCheckInterval);

                // 最終強制顯示 headerMobile
                if (headerMobile && window.innerWidth <= 960) {
                    headerMobile.classList.add('show');
                }

                // 再延遲一下，確保滾動完全停止後再次顯示
                setTimeout(function () {
                    if (headerMobile && window.innerWidth <= 960) {
                        headerMobile.classList.add('show');
                    }
                    // 取消滾動標記
                    window.isScrollingToMain = false;
                }, 200);
            }, 800);
        });

        // 監聽滾動事件，在滾動到 main 期間持續確保 headerMobile 顯示
        if (headerMobile) {
            let scrollTicking = false;
            window.addEventListener('scroll', function () {
                if (!scrollTicking) {
                    window.requestAnimationFrame(function () {
                        // 如果正在執行滾動按鈕的滾動，持續確保 headerMobile 顯示
                        if (window.isScrollingToMain && window.innerWidth <= 960) {
                            headerMobile.classList.add('show');
                        }
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            }, { passive: true });
        }
    }

    /**
     * 初始化手機版 headerMobile 顯示/隱藏功能
     */
    function initMobileHeader() {
        const headerBody = document.querySelector('.headerBody');
        const headerMobile = document.querySelector('.headerMobile');

        if (!headerBody || !headerMobile) {
            return;
        }

        // 用於標記是否正在執行滾動按鈕的滾動（與 initScrollDown 共享）
        window.isScrollingToMain = false;

        function checkHeaderVisibility() {
            // 只在手機版（寬度 <= 960px）時執行
            if (window.innerWidth > 960) {
                headerMobile.classList.remove('show');
                return;
            }

            // 如果正在執行滾動按鈕的滾動，不執行自動隱藏邏輯
            if (window.isScrollingToMain) {
                headerMobile.classList.add('show');
                return;
            }

            // 如果 headerBody 被 hide-mobile class 隱藏，直接顯示 headerMobile
            if (headerBody.classList.contains('hide-mobile')) {
                headerMobile.classList.add('show');
                return;
            }

            // 檢查 headerBody 是否完全在視窗外
            try {
                const headerBodyRect = headerBody.getBoundingClientRect();
                const isHeaderBodyOutOfView = headerBodyRect.bottom < 0;

                if (isHeaderBodyOutOfView) {
                    // headerBody 完全移除畫面外，顯示 headerMobile
                    headerMobile.classList.add('show');
                } else {
                    // headerBody 還在畫面內，隱藏 headerMobile
                    headerMobile.classList.remove('show');
                }
            } catch (e) {
                // 如果無法取得位置（例如被隱藏），根據 hide-mobile class 判斷
                if (headerBody.classList.contains('hide-mobile')) {
                    headerMobile.classList.add('show');
                } else {
                    headerMobile.classList.remove('show');
                }
            }
        }

        // 監聽滾動事件
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    checkHeaderVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // 監聽視窗大小變化
        window.addEventListener('resize', function () {
            checkHeaderVisibility();
        });

        // 初始檢查
        checkHeaderVisibility();
    }

    // 頁面載入完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initLanguage(); // 初始化語言系統（必須最先執行）
            initImageGallery();
            initImagePopup();
            initTabSwitcher();
            initLogoClick(); // 初始化 logo 點擊事件
            initMapTabs(); // 初始化地圖頁籤切換
            initWorkClick();
            initWorkCloseButton(); // 初始化作品關閉按鈕
            initWorkBlink(); // 初始化作品閃爍動畫
            initMobileHeader(); // 初始化手機版 header
            initScrollDown(); // 初始化手機版滾動按鈕
            // 延遲初始化 Video.js，確保 Video.js 已載入
            setTimeout(initVideoPlayer, 100);
        });
    } else {
        initLanguage(); // 初始化語言系統（必須最先執行）
        initImageGallery();
        initImagePopup();
        initTabSwitcher();
        initLogoClick(); // 初始化 logo 點擊事件
        initMapTabs(); // 初始化地圖頁籤切換
        initWorkClick();
        initWorkCloseButton(); // 初始化作品關閉按鈕
        initWorkBlink(); // 初始化作品閃爍動畫
        initMobileHeader(); // 初始化手機版 header
        initScrollDown(); // 初始化手機版滾動按鈕
        // 延遲初始化 Video.js，確保 Video.js 已載入
        setTimeout(initVideoPlayer, 100);
    }

    // 監聽 hash 變化（處理語言切換）
    // 注意：這個監聽器會在現有的 hashchange 監聽器之前執行（capture phase）
    window.addEventListener('hashchange', function (e) {
        console.log('[History] hashchange 事件觸發 (語言切換 - capture)', {
            oldURL: e.oldURL,
            newURL: e.newURL,
            currentHash: window.location.hash,
            isUpdatingHash: window._isUpdatingHash,
            isPopstateEvent: window._isPopstateEvent
        });

        // 如果是由 updateHash 觸發的，不處理（避免重複處理）
        if (window._isUpdatingHash) {
            console.log('[History] hashchange (語言切換): 由 updateHash 觸發，跳過處理');
            return;
        }

        // 如果是 popstate 事件觸發的，也不處理（因為 popstate 會自己處理）
        if (window._isPopstateEvent) {
            console.log('[History] hashchange (語言切換): 由 popstate 觸發，跳過處理');
            return;
        }

        const hashInfo = getTabFromHash();
        console.log('[History] hashchange (語言切換): 檢查語言', {
            hashInfo: hashInfo,
            currentLang: currentLang,
            hashLang: hashInfo.lang,
            needsSwitch: (hashInfo.lang === 'en' && currentLang !== 'en') || (hashInfo.lang === 'zh' && currentLang !== 'zh')
        });

        // 如果 hash 中的語言與當前語言不同，切換語言
        // 使用 replace 模式，不建立新的歷史記錄
        if (hashInfo.lang === 'en' && currentLang !== 'en') {
            console.log('[History] hashchange (語言切換): 切換到英文');
            switchLanguage('en', true); // 會使用 replace 模式
        } else if (hashInfo.lang === 'zh' && currentLang !== 'zh') {
            console.log('[History] hashchange (語言切換): 切換到中文');
            switchLanguage('zh', true); // 會使用 replace 模式
        } else {
            console.log('[History] hashchange (語言切換): 語言已匹配，無需切換', {
                hashLang: hashInfo.lang,
                currentLang: currentLang
            });
        }
    }, true); // 使用 capture phase 確保先執行

    // 匯出函數供外部使用
    window.setPlayerSource = setPlayerSource;
    window.setPlayerTitle = setPlayerTitle;

})();
