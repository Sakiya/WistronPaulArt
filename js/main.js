/**
 * In Search of Light - Main JavaScript
 * YouTube 影片播放器功能
 */

(function () {
    'use strict';

    // ==================== 語言切換系統 ====================
    // 當前語言設定（預設為中文）
    let currentLang = 'zh';

    // 翻譯物件
    const translations = {
        zh: {
            // 語言切換
            'lang.switch': 'EN',
            // 導航
            'nav.exhibition': '展覽簡介',
            'nav.audio': '語音導覽',
            'nav.survey': '問卷調查',
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
            // 作品
            'work.1.title': '《台灣山脈》系列',
            'work.1.age': '75歲',
            'work.1.description': '江賢二希望找一處有海的地方居住，有五年間，他和太太常從清晨就從台北開車往東海岸，經過宜蘭、花蓮，最終來到台東金樽，這讓他將對台灣山巒不同時間的光影印象化為《台灣山脈》系列。',
            'work.1.image1': '台灣山脈 17-17, 2017',
            'work.1.image2': '台灣山脈 21-22, 2021',
            'work.1.image3': '台灣山脈 12-01, 2012',
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
            'nav.survey': 'Survey',
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
            // 作品
            'work.1.title': 'Mountain Range of Taiwan series',
            'work.1.age': 'Age 75',
            'work.1.description': 'Paul Chiang longed to live by the sea. For five years, he and his wife often set out from Taipei at daybreak, traveling along Taiwan’s east coast, passing through Yilan and Hualien until they finally settled in Jinzun. These journeys shaped his impressions of shifting mountain light into the Mountain Range of Taiwan series.',
            'work.1.image1': 'Mountain Range of Taiwan 17-17, 2017',
            'work.1.image2': 'Mountain Range of Taiwan 21-22, 2021',
            'work.1.image3': 'Mountain Range of Taiwan 12-01, 2012',
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

        console.log('updateHash: 當前 hash:', currentHash, '新 hash:', newHash, 'replace:', replace); // 調試信息

        // 如果新的 hash 與當前 hash 相同，不執行任何操作
        if (currentHash === newHash || (currentHash === '' && newHash === '')) {
            console.log('updateHash: hash 相同，跳過更新'); // 調試信息
            return;
        }

        // 對於 Hash-based routing，直接使用 window.location.hash 更可靠
        // 但這樣不會建立歷史記錄，所以我們先使用 pushState，然後手動更新 hash
        if (replace) {
            // 使用 replaceState，不建立新的歷史記錄
            // 直接更新 window.location.hash，這樣瀏覽器會立即更新地址欄
            window.location.hash = newHash;
            // 然後使用 replaceState 同步歷史記錄
            history.replaceState({ hash: hash }, '', window.location.href);
            console.log('updateHash: 使用 replaceState，當前 URL:', window.location.href); // 調試信息
        } else {
            // 先使用 pushState 建立歷史記錄
            // 注意：pushState 的 URL 參數如果包含 hash，某些瀏覽器可能不會立即更新地址欄
            // 所以我們先更新 window.location.hash，讓瀏覽器立即更新地址欄
            // 但這樣會觸發 hashchange 事件，所以我們需要標記一下
            window._isUpdatingHash = true;
            window.location.hash = newHash;
            // 然後使用 pushState 同步歷史記錄（使用當前 URL，因為 hash 已經更新了）
            history.pushState({ hash: hash }, '', window.location.href);
            window._isUpdatingHash = false;
            console.log('updateHash: 使用 pushState，當前 URL:', window.location.href); // 調試信息
        }
    }

    /**
     * 切換語言
     * @param {string} lang - 語言代碼 ('zh' 或 'en')
     */
    function switchLanguage(lang) {
        if (lang !== 'zh' && lang !== 'en') {
            lang = 'zh';
        }

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

        // 更新 URL hash
        const currentHash = window.location.hash.replace('#', '');

        // 獲取當前 tab 和作品名稱
        const hashInfo = getTabFromHash();

        // 如果當前 hash 是 'en' 或 'zh'，直接更新語言 hash
        if (currentHash === 'en' || currentHash === 'zh') {
            updateHash(lang === 'en' ? 'en' : '');
        }
        // 如果當前在作品詳情頁面，更新 URL 以包含語言
        else if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
            // 使用組合格式：語言 + 作品名稱（使用 / 分隔，例如 #en/Work_1）
            if (lang === 'en') {
                updateHash('en/' + hashInfo.workName);
            } else {
                updateHash(hashInfo.workName);
            }
        }
        // 如果當前在語音導覽頁面
        else if (hashInfo.tab === 'audio') {
            if (lang === 'en') {
                updateHash('en/audio');
            } else {
                updateHash('audio');
            }
        }
        // 如果沒有 hash 或是在展覽簡介頁面，直接設置語言 hash
        else {
            updateHash(lang === 'en' ? 'en' : '');
        }
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

        // 重新載入所有作品播放器
        for (let i = 1; i <= 9; i++) {
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

    // YouTube 影片 ID - 上方主要播放的影片
    const youtubeVideoId = 'NoDJ_ltS8-k';

    // 儲存 YouTube iframe 的原始 src，用於恢復播放
    let youtubeIframeOriginalSrc = null;

    // 作品英文名稱陣列 - 對應 9 個作品，用於 URL hash
    // 可以自行修改每個作品的英文名稱
    const workNames = [
        'Work_1',  // 作品 1
        'Work_2',  // 作品 2
        'Work_3',  // 作品 3
        'Work_4',  // 作品 4
        'Work_5',  // 作品 5
        'Work_6',  // 作品 6
        'Work_7',  // 作品 7
        'Work_8',  // 作品 8
        'Work_9'   // 作品 9
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
     * @param {number} workId - 作品編號 (1-9)
     * @returns {string} 音訊檔案路徑
     */
    function getWorkAudioFile(lang, workId) {
        return getAudioFile(lang, workId); // 01.mp3, 02.mp3, ..., 09.mp3
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
        const params = new URLSearchParams({
            'autoplay': autoplay ? '1' : '0',
            'rel': '0', // 不顯示相關影片
            'modestbranding': '1', // 減少 YouTube 品牌標識
            'enablejsapi': '1', // 啟用 JavaScript API
            'origin': window.location.origin, // 允許的來源
            'playsinline': '1', // 在 iOS 上內聯播放
            'iv_load_policy': '3', // 不顯示註解
            'fs': '1', // 允許全螢幕
            'cc_load_policy': '0' // 不自動顯示字幕
        });

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    // 圖片列表陣列 - 可以自行修改圖片路徑
    const imageList = [
        'images/popup/images1.png',
        'images/popup/images2.png',
        'images/popup/images3.png',
        'images/popup/images4.png',
        'images/popup/images5.png',
        'images/popup/images6.png',
        'images/popup/images7.png',
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
            console.log('switchTab: 準備更新 hash, targetTab:', targetTab); // 調試信息
            if (targetTab === 'exhibition') {
                // 展覽簡介：根據當前語言決定 hash
                const hashInfo = getTabFromHash();
                const hashValue = hashInfo.lang === 'en' ? 'en' : '';
                console.log('switchTab: 更新展覽簡介 hash:', hashValue); // 調試信息
                updateHash(hashValue);
            } else if (targetTab === 'audio') {
                // 語音導覽：根據當前語言決定 hash
                const hashInfo = getTabFromHash();
                const hashValue = hashInfo.lang === 'en' ? 'en/audio' : 'audio';
                console.log('switchTab: 更新語音導覽 hash:', hashValue); // 調試信息
                updateHash(hashValue);
            } else if (targetTab === 'workDetail') {
                // 作品詳情：hash 應該已經在點擊作品時設置了，這裡不更新
                // 但如果沒有 hash，可能需要設置一個預設值
                // 實際上，workDetail 的 hash 應該在點擊作品時已經設置
            } else {
                // 其他 tab：根據當前語言決定 hash
                const hashInfo = getTabFromHash();
                const hashValue = hashInfo.lang === 'en' ? 'en/' + targetTab : targetTab;
                console.log('switchTab: 更新其他 tab hash:', hashValue); // 調試信息
                updateHash(hashValue);
            }
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
     * @param {number} workId - 作品編號 (1-9)
     * @returns {string} 作品英文名稱
     */
    function getWorkName(workId) {
        const index = parseInt(workId) - 1;
        if (index >= 0 && index < workNames.length) {
            return workNames[index];
        }
        return null;
    }

    /**
     * 根據作品名稱獲取作品編號
     * @param {string} workName - 作品英文名稱
     * @returns {number} 作品編號 (1-9)
     */
    function getWorkIdFromName(workName) {
        const index = workNames.indexOf(workName);
        if (index >= 0) {
            return index + 1; // 轉換為 1-9
        }
        return null;
    }

    /**
     * 初始化作品播放器
     * @param {number} workId - 作品編號 (1-9)
     */
    function initWorkPlayer(workId) {
        // 查找該作品的所有播放器（可能有多個，例如在 Swiper 中）
        const workContent = document.querySelector('.workDetailContent[data-work="' + workId + '"]');
        if (!workContent) {
            return;
        }

        // 查找所有該作品的播放器元素（包括主播放器和 Swiper 中的播放器）
        const playerElements = workContent.querySelectorAll('video[id^="workAudioPlayer' + workId + '"]');

        if (playerElements.length === 0) {
            return;
        }

        // 為每個播放器初始化
        playerElements.forEach((playerElement) => {
            const playerId = playerElement.id;
            initSingleWorkPlayer(playerId, workId);
        });
    }

    /**
     * 初始化單個作品播放器
     * @param {string} playerId - 播放器 ID
     * @param {number} workId - 作品編號 (1-9)
     */
    function initSingleWorkPlayer(playerId, workId) {
        const playerElement = document.getElementById(playerId);

        if (!playerElement) {
            return;
        }

        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            console.warn('Video.js is not loaded');
            return;
        }

        // 檢查播放器是否已經初始化
        let player = videojs.getPlayer(playerId);
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
            });
        } else {
            // 播放器已存在，直接設置圖示
            setupWorkPlayerIcon(player);
            setTimeout(function () {
                setupWorkPlayerIcon(player);
            }, 100);
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

                // 監聽音訊載入完成後，確保圖示顯示
                player.on('loadedmetadata', function () {
                    setupWorkPlayerIcon(player);
                });

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
     * 停止所有作品播放器
     */
    function stopAllWorkPlayers() {
        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            return;
        }

        for (let i = 1; i <= 9; i++) {
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

                // 初始化該作品的播放器
                setTimeout(() => {
                    initWorkPlayer(workId);
                }, 100);

                // 初始化該作品的 Swiper（如果有）
                // 使用 requestAnimationFrame 確保 DOM 完全渲染
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        initWorkSwiper(workId);
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

            // 更新語言（如果 hash 中有語言資訊，且與當前語言不同）
            if (hashInfo.lang !== currentLang) {
                // 只更新語言，不更新 hash（因為 hash 已經改變了）
                currentLang = hashInfo.lang;
                applyTranslations(hashInfo.lang);
                document.documentElement.setAttribute('data-lang', hashInfo.lang);
                // 重新載入音訊檔案（根據新語言）
                reloadAudioForLanguage(hashInfo.lang);
            }

            switchTab(hashInfo.tab, false); // 不更新 hash，因為已經改變了

            // 如果是作品詳情，顯示對應作品
            if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
                const workId = getWorkIdFromName(hashInfo.workName);
                if (workId) {
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
        window.addEventListener('hashchange', function () {
            // 如果是由 updateHash 觸發的，不處理（避免重複處理）
            if (window._isUpdatingHash) {
                return;
            }
            handleRouteChange();
        });

        // 監聽 popstate 事件（當使用 pushState 時，瀏覽器前進/後退會觸發此事件）
        window.addEventListener('popstate', function (e) {
            // 標記這是 popstate 事件，避免在 updateHash 中重複觸發 hashchange
            window._isPopstateEvent = true;

            // 從歷史記錄恢復狀態
            // 注意：當使用 pushState 更新 hash 時，瀏覽器會自動更新 window.location.hash
            // 但 popstate 事件可能在 hash 更新之前觸發，所以我們需要延遲處理
            setTimeout(function () {
                handleRouteChange();
                // 清除標記
                window._isPopstateEvent = false;
            }, 0);
        });

        // 頁面載入時根據 hash 切換 tab
        const hashInfo = getTabFromHash();
        switchTab(hashInfo.tab, false); // 不更新 hash，使用現有的

        // 如果是作品詳情，顯示對應作品
        if (hashInfo.tab === 'workDetail' && hashInfo.workName) {
            const workId = getWorkIdFromName(hashInfo.workName);
            if (workId) {
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

        // 確保所有元素一開始都是可見的
        workLinks.forEach((link) => {
            link.style.opacity = '0.5';
            link.style.transform = 'scale(1)';
        });

        // 等待一小段時間後再啟動動畫，確保頁面已完全載入
        setTimeout(function () {
            workLinks.forEach((link, index) => {
                // 為每個作品生成隨機的動畫延遲（0-2秒之間）
                const randomDelay = Math.random() * 2;
                // 為每個作品生成隨機的動畫持續時間（2.5-3.5秒之間）
                const randomDuration = 2.5 + Math.random() * 1;

                // 設置動畫延遲和持續時間
                link.style.animationDelay = randomDelay + 's';
                link.style.animationDuration = randomDuration + 's';

                // 啟動動畫
                link.style.animationPlayState = 'running';
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
        playIcon.style.pointerEvents = 'none'; // 讓點擊事件穿透到按鈕
    }

    function initVideoPlayer() {
        // 檢查 Video.js 是否已載入
        if (typeof videojs === 'undefined') {
            console.warn('Video.js is not loaded');
            return;
        }

        const playerElement = document.getElementById('audioVideoPlayer');
        if (!playerElement) {
            return;
        }

        // 檢查 Video.js 是否已經初始化了這個元素
        const existingPlayer = videojs.getPlayer('audioVideoPlayer');
        if (existingPlayer) {
            // 播放器已經存在，直接使用並設置圖示
            window.audioVideoPlayer = existingPlayer;
            // 確保自定義圖示已設置
            if (existingPlayer.readyState() >= 1) {
                // 播放器已就緒，立即設置
                setupAudioPlayerIcon(existingPlayer);
            } else {
                // 播放器尚未就緒，等待就緒後設置
                existingPlayer.ready(function () {
                    setupAudioPlayerIcon(existingPlayer);
                });
            }
            return;
        }

        // 檢查播放器是否已經初始化，避免重複初始化
        if (window.audioVideoPlayer) {
            // 播放器已經初始化，確保圖示已設置
            if (window.audioVideoPlayer.readyState() >= 1) {
                setupAudioPlayerIcon(window.audioVideoPlayer);
            } else {
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

        // 預設載入音訊檔案（01.mp3）
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
            player.src({
                type: 'audio/mpeg',
                src: mainAudioSrc
            });

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
            if (controlBarEl) {
                controlBarEl.addEventListener('click', function (e) {
                    const playButton = player.controlBar.playToggle.el();
                    // 檢查 e.target 是否為有效的 DOM 節點
                    const target = e.target && e.target.nodeType === 1 ? e.target : null;
                    if (playButton && target && (playButton.contains(target) || target.closest('.vjs-play-control'))) {
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
                }, true); // 使用 capture 階段確保優先執行
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
            player.on('play', function () {
                setupAudioPlayerIcon(player);

                // 確保控制欄永遠顯示
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                }
            });

            player.on('pause', function () {
                setupAudioPlayerIcon(player);

                // 確保控制欄永遠顯示
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                }
            });

            // 監聽所有事件，確保控制欄永遠顯示和圖示正確
            player.on(['play', 'pause', 'timeupdate', 'loadedmetadata'], function () {
                if (controlBar) {
                    controlBar.el().style.display = 'flex';
                    controlBar.el().style.opacity = '1';
                    controlBar.el().style.visibility = 'visible';
                    player.userActive(true);
                }

                // 確保圖示正確
                setupAudioPlayerIcon(player);
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
    // 注意：這個監聽器會在現有的 hashchange 監聽器之前執行
    window.addEventListener('hashchange', function () {
        const hashInfo = getTabFromHash();
        // 如果 hash 中的語言與當前語言不同，切換語言
        if (hashInfo.lang === 'en' && currentLang !== 'en') {
            switchLanguage('en');
        } else if (hashInfo.lang === 'zh' && currentLang !== 'zh') {
            switchLanguage('zh');
        }
    }, true); // 使用 capture phase 確保先執行

    // 匯出函數供外部使用
    window.setPlayerSource = setPlayerSource;
    window.setPlayerTitle = setPlayerTitle;

})();
