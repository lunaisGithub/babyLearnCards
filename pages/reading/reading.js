// pages/reading/reading.js
const API_KEY = 'SpMUHUSfoG0o7VRwIHjaIxzX';
const SECRET_KEY = 'tbXJ0PZnMxq5xQwDEDNNjiKKn1PMCHhJ';
let accessToken = '';
let tokenExpireTime = 0;

Page({
  _getAccessToken() {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      if (accessToken && now < tokenExpireTime - 60000) {
        resolve(accessToken);
        return;
      }
      wx.request({
        url: 'https://aip.baidubce.com/oauth/2.0/token',
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          grant_type: 'client_credentials',
          client_id: API_KEY,
          client_secret: SECRET_KEY
        },
        success: (res) => {
          if (res.data.access_token) {
            accessToken = res.data.access_token;
            tokenExpireTime = now + (res.data.expires_in - 3600) * 1000;
            resolve(accessToken);
          } else {
            reject(new Error('获取 access_token 失败'));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  _baiduTTS(text, lang = 'zh', spd = '5', per = '4') {
    return this._getAccessToken().then((token) => {
      return new Promise((resolve, reject) => {
        console.log('Calling TTS API with text:', text, 'lang:', lang);
        wx.request({
          url: 'https://tsn.baidu.com/text2audio',
          method: 'POST',
          data: {
            tex: text, tok: token, ctp: 1, lan: lang, spd, per, cuid: 'mini_program', vol: 5,
          },
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          responseType: 'arraybuffer',
          success(res) {
            console.log('TTS response status:', res.statusCode, 'data type:', typeof res.data, 'data length:', res.data ? res.data.byteLength : 0);
            const fs = wx.getFileSystemManager();
            const filePath = `${wx.env.USER_DATA_PATH}/tts_${Date.now()}.mp3`;
            console.log('Writing to:', filePath);
            fs.writeFile({
              filePath,
              data: res.data,
              success() {
                console.log('File written successfully');
                resolve(filePath);
              },
              fail(err) {
                console.error('File write failed:', err);
                reject(err);
              }
            });
          },
          fail(err) {
            console.error('TTS request fail:', err);
            reject(err);
          }
        });
      });
    });
  },

  data: {
    categories: [
      '全部汉字', '数字类', '人称家人', '身体五官', '日常动物',
      '果蔬食物', '自然天气', '颜色', '方位形状', '基础动词',
      '常用形容词', '时间', '校园生活用品', '交通工具', '基础虚词'
    ],
    charAll: [
      [],
      // 1: 数字类
      [
        {char:"一",pinyin:"yī",english:"one",desc:"基础数字"},
        {char:"二",pinyin:"èr",english:"two",desc:"基础数字"},
        {char:"三",pinyin:"sān",english:"three",desc:"基础数字"},
        {char:"四",pinyin:"sì",english:"four",desc:"基础数字"},
        {char:"五",pinyin:"wǔ",english:"five",desc:"基础数字"},
        {char:"六",pinyin:"liù",english:"six",desc:"基础数字"},
        {char:"七",pinyin:"qī",english:"seven",desc:"基础数字"},
        {char:"八",pinyin:"bā",english:"eight",desc:"基础数字"},
        {char:"九",pinyin:"jiǔ",english:"nine",desc:"基础数字"},
        {char:"十",pinyin:"shí",english:"ten",desc:"基础数字"},
        {char:"百",pinyin:"bǎi",english:"hundred",desc:"数位单位"},
        {char:"千",pinyin:"qiān",english:"thousand",desc:"数位单位"},
        {char:"零",pinyin:"líng",english:"zero",desc:"数字空位"}
      ],
      // 2: 人称家人
      [
        {char:"爸",pinyin:"bà",english:"father",desc:"父亲称呼"},
        {char:"妈",pinyin:"mā",english:"mother",desc:"母亲称呼"},
        {char:"爷",pinyin:"yé",english:"grandfather",desc:"祖父称呼"},
        {char:"奶",pinyin:"nǎi",english:"grandmother",desc:"祖母称呼"},
        {char:"哥",pinyin:"gē",english:"older brother",desc:"年长兄长"},
        {char:"姐",pinyin:"jiě",english:"older sister",desc:"年长姐姐"},
        {char:"弟",pinyin:"dì",english:"younger brother",desc:"年幼弟弟"},
        {char:"妹",pinyin:"mèi",english:"younger sister",desc:"年幼妹妹"},
        {char:"我",pinyin:"wǒ",english:"I",desc:"第一人称"},
        {char:"你",pinyin:"nǐ",english:"you",desc:"第二人称"},
        {char:"他",pinyin:"tā",english:"he",desc:"第三人称男"},
        {char:"她",pinyin:"tā",english:"she",desc:"第三人称女"},
        {char:"人",pinyin:"rén",english:"person",desc:"人类个体"},
        {char:"儿",pinyin:"ér",english:"son",desc:"孩童、子女"},
        {char:"女",pinyin:"nǚ",english:"girl",desc:"女性、女孩"}
      ],
      // 3: 身体五官
      [
        {char:"口",pinyin:"kǒu",english:"mouth",desc:"嘴巴、口腔"},
        {char:"手",pinyin:"shǒu",english:"hand",desc:"手部肢体"},
        {char:"耳",pinyin:"ěr",english:"ear",desc:"耳朵、听觉器官"},
        {char:"目",pinyin:"mù",english:"eye",desc:"眼睛、视觉器官"},
        {char:"头",pinyin:"tóu",english:"head",desc:"头部身体部位"},
        {char:"足",pinyin:"zú",english:"foot",desc:"脚部肢体"},
        {char:"心",pinyin:"xīn",english:"heart",desc:"心脏、内心"},
        {char:"牙",pinyin:"yá",english:"tooth",desc:"牙齿"},
        {char:"脸",pinyin:"liǎn",english:"face",desc:"面部脸庞"},
        {char:"毛",pinyin:"máo",english:"hair",desc:"毛发绒毛"},
        {char:"骨",pinyin:"gǔ",english:"bone",desc:"骨骼骨头"}
      ],
      // 4: 日常动物
      [
        {char:"猫",pinyin:"māo",english:"cat",desc:"家养小动物"},
        {char:"狗",pinyin:"gǒu",english:"dog",desc:"家养小动物"},
        {char:"鸡",pinyin:"jī",english:"chicken",desc:"常见家禽"},
        {char:"鸭",pinyin:"yā",english:"duck",desc:"常见家禽"},
        {char:"鱼",pinyin:"yú",english:"fish",desc:"水生动物"},
        {char:"鸟",pinyin:"niǎo",english:"bird",desc:"飞行动物"},
        {char:"虫",pinyin:"chóng",english:"insect",desc:"昆虫小虫"},
        {char:"马",pinyin:"mǎ",english:"horse",desc:"家畜动物"},
        {char:"牛",pinyin:"niú",english:"cow",desc:"家畜动物"},
        {char:"羊",pinyin:"yáng",english:"sheep",desc:"家畜动物"},
        {char:"兔",pinyin:"tù",english:"rabbit",desc:"温顺小动物"},
        {char:"虎",pinyin:"hǔ",english:"tiger",desc:"大型猛兽"},
        {char:"熊",pinyin:"xióng",english:"bear",desc:"大型动物"},
        {char:"鹿",pinyin:"lù",english:"deer",desc:"森林动物"},
        {char:"狼",pinyin:"láng",english:"wolf",desc:"野外动物"},
        {char:"猴",pinyin:"hóu",english:"monkey",desc:"灵长类动物"},
        {char:"蛇",pinyin:"shé",english:"snake",desc:"爬行类"},
        {char:"龟",pinyin:"guī",english:"turtle",desc:"爬行动物"},
        {char:"蛙",pinyin:"wā",english:"frog",desc:"两栖动物"},
        {char:"象",pinyin:"xiàng",english:"elephant",desc:"大型陆地动物"},
        {char:"狮",pinyin:"shī",english:"lion",desc:"草原猛兽"},
        {char:"豹",pinyin:"bào",english:"leopard",desc:"斑点猛兽"},
        {char:"长颈鹿",pinyin:"cháng jǐng lù",english:"giraffe",desc:"脖子很长的动物"},
        {char:"斑马",pinyin:"bān mǎ",english:"zebra",desc:"黑白条纹的马"},
        {char:"企鹅",pinyin:"qǐ é",english:"penguin",desc:"南极的鸟"},
        {char:"鹦鹉",pinyin:"yīng wǔ",english:"parrot",desc:"会说话的鸟"},
        {char:"蝴蝶",pinyin:"hú dié",english:"butterfly",desc:"美丽的飞虫"},
        {char:"蜜蜂",pinyin:"mì fēng",english:"bee",desc:"会酿蜜的虫"},
        {char:"蚂蚁",pinyin:"mǎ yǐ",english:"ant",desc:"小小的虫子"},
        {char:"螃蟹",pinyin:"páng xiè",english:"crab",desc:"横着走的动物"},
        {char:"龙虾",pinyin:"lóng xiā",english:"lobster",desc:"红色的海鲜"},
        {char:"海豚",pinyin:"hǎi tún",english:"dolphin",desc:"聪明的海洋动物"},
        {char:"鲸鱼",pinyin:"jīng yú",english:"whale",desc:"最大的海洋动物"},
        {char:"鲨鱼",pinyin:"shā yú",english:"shark",desc:"凶猛的海洋动物"},
        {char:"水母",pinyin:"shuǐ mǔ",english:"jellyfish",desc:"透明的海洋生物"},
        {char:"蜗牛",pinyin:"wō niú",english:"snail",desc:"背着壳的小动物"},
        {char:"老鼠",pinyin:"lǎo shǔ",english:"mouse",desc:"偷吃粮食的小动物"},
        {char:"刺猬",pinyin:"cì wei",english:"hedgehog",desc:"浑身是刺的小动物"},
        {char:"狐狸",pinyin:"hú li",english:"fox",desc:"聪明的小动物"},
        {char:"袋鼠",pinyin:"dài shǔ",english:"kangaroo",desc:"有袋子的动物"},
        {char:"考拉",pinyin:"kǎo lā",english:"koala",desc:"抱着树睡觉的熊"},
        {char:"熊猫",pinyin:"xióng māo",english:"panda",desc:"黑白相间的国宝"},
        {char:"骆驼",pinyin:"luò tuo",english:"camel",desc:"沙漠之舟"},
        {char:"鳄鱼",pinyin:"è yú",english:"crocodile",desc:"凶猛的爬行动物"},
        {char:"恐龙",pinyin:"kǒng lóng",english:"dinosaur",desc:"远古大型动物"},
        {char:"天鹅",pinyin:"tiān é",english:"swan",desc:"优雅的白色水鸟"},
        {char:"猫头鹰",pinyin:"māo tóu yīng",english:"owl",desc:"夜间捕食的猛禽"},
        {char:"鸽子",pinyin:"gē zi",english:"pigeon",desc:"和平的象征"},
        {char:"孔雀",pinyin:"kǒng què",english:"peacock",desc:"开屏的美丽鸟类"},
        {char:"公鸡",pinyin:"gōng jī",english:"rooster",desc:"打鸣的鸡"},
        {char:"母鸡",pinyin:"mǔ jī",english:"hen",desc:"下蛋的鸡"},
        {char:"小猪",pinyin:"xiǎo zhū",english:"piglet",desc:"小的猪"},
        {char:"小牛",pinyin:"xiǎo niú",english:"calf",desc:"小的牛"},
        {char:"小鸡",pinyin:"xiǎo jī",english:"chick",desc:"小的鸡"},
        {char:"小羊",pinyin:"xiǎo yáng",english:"lamb",desc:"小的羊"},
        {char:"小鱼",pinyin:"xiǎo yú",english:"small fish",desc:"小的鱼"},
        {char:"乌龟",pinyin:"wū guī",english:"turtle",desc:"爬行的动物"},
        {char:"大象",pinyin:"dà xiàng",english:"big elephant",desc:"很大的象"}
      ],
      // 5: 果蔬食物
      [
        {char:"米",pinyin:"mǐ",english:"rice",desc:"主食粮食"},
        {char:"饭",pinyin:"fàn",english:"meal",desc:"煮熟主食"},
        {char:"面",pinyin:"miàn",english:"noodles",desc:"面食主食"},
        {char:"水",pinyin:"shuǐ",english:"water",desc:"饮用液体"},
        {char:"火",pinyin:"huǒ",english:"fire",desc:"火焰火种"},
        {char:"瓜",pinyin:"guā",english:"melon",desc:"瓜果蔬果"},
        {char:"果",pinyin:"guǒ",english:"fruit",desc:"水果果实"},
        {char:"菜",pinyin:"cài",english:"vegetable",desc:"蔬菜食材"},
        {char:"豆",pinyin:"dòu",english:"bean",desc:"豆类食材"},
        {char:"茶",pinyin:"chá",english:"tea",desc:"饮品茶水"},
        {char:"肉",pinyin:"ròu",english:"meat",desc:"肉食食材"},
        {char:"奶",pinyin:"nǎi",english:"milk",desc:"乳制品饮品"}
      ],
      // 6: 自然天气
      [
        {char:"日",pinyin:"rì",english:"sun",desc:"太阳、日子"},
        {char:"月",pinyin:"yuè",english:"moon",desc:"月亮、月份"},
        {char:"星",pinyin:"xīng",english:"star",desc:"天上星星"},
        {char:"云",pinyin:"yún",english:"cloud",desc:"天空云朵"},
        {char:"风",pinyin:"fēng",english:"wind",desc:"自然风力"},
        {char:"雨",pinyin:"yǔ",english:"rain",desc:"下雨天气"},
        {char:"雪",pinyin:"xuě",english:"snow",desc:"降雪天气"},
        {char:"山",pinyin:"shān",english:"mountain",desc:"自然山川"},
        {char:"石",pinyin:"shí",english:"stone",desc:"石头石块"},
        {char:"田",pinyin:"tián",english:"field",desc:"农田土地"},
        {char:"土",pinyin:"tǔ",english:"soil",desc:"泥土土壤"},
        {char:"河",pinyin:"hé",english:"river",desc:"自然小河"},
        {char:"江",pinyin:"jiāng",english:"river",desc:"宽阔大江"},
        {char:"海",pinyin:"hǎi",english:"sea",desc:"广阔大海"},
        {char:"天",pinyin:"tiān",english:"sky",desc:"天空天际"},
        {char:"地",pinyin:"dì",english:"earth",desc:"大地地面"}
      ],
      // 7: 颜色
      [
        {char:"红",pinyin:"hóng",english:"red",desc:"红色色彩"},
        {char:"黄",pinyin:"huáng",english:"yellow",desc:"黄色色彩"},
        {char:"蓝",pinyin:"lán",english:"blue",desc:"蓝色色彩"},
        {char:"白",pinyin:"bái",english:"white",desc:"白色色彩"},
        {char:"黑",pinyin:"hēi",english:"black",desc:"黑色色彩"},
        {char:"绿",pinyin:"lǜ",english:"green",desc:"绿色色彩"},
        {char:"灰",pinyin:"huī",english:"grey",desc:"灰色色彩"}
      ],
      // 8: 方位、大小形状
      [
        {char:"上",pinyin:"shàng",english:"up",desc:"上方位置"},
        {char:"下",pinyin:"xià",english:"down",desc:"下方位置"},
        {char:"左",pinyin:"zuǒ",english:"left",desc:"左侧方位"},
        {char:"右",pinyin:"yòu",english:"right",desc:"右侧方位"},
        {char:"前",pinyin:"qián",english:"front",desc:"前面方位"},
        {char:"后",pinyin:"hòu",english:"back",desc:"后面方位"},
        {char:"里",pinyin:"lǐ",english:"inside",desc:"内部里面"},
        {char:"外",pinyin:"wài",english:"outside",desc:"外部外面"},
        {char:"中",pinyin:"zhōng",english:"middle",desc:"中间中心"},
        {char:"大",pinyin:"dà",english:"big",desc:"体积宽阔"},
        {char:"小",pinyin:"xiǎo",english:"small",desc:"体积细小"},
        {char:"多",pinyin:"duō",english:"many",desc:"数量很多"},
        {char:"少",pinyin:"shǎo",english:"few",desc:"数量很少"},
        {char:"方",pinyin:"fāng",english:"square",desc:"方形形状"},
        {char:"圆",pinyin:"yuán",english:"circle",desc:"圆形形状"}
      ],
      // 9: 基础动词
      [
        {char:"走",pinyin:"zǒu",english:"walk",desc:"步行走路"},
        {char:"跑",pinyin:"pǎo",english:"run",desc:"快速奔跑"},
        {char:"跳",pinyin:"tiào",english:"jump",desc:"跳跃动作"},
        {char:"看",pinyin:"kàn",english:"look",desc:"用眼观看"},
        {char:"听",pinyin:"tīng",english:"listen",desc:"用耳聆听"},
        {char:"说",pinyin:"shuō",english:"speak",desc:"开口说话"},
        {char:"吃",pinyin:"chī",english:"eat",desc:"进食吃饭"},
        {char:"喝",pinyin:"hē",english:"drink",desc:"饮用喝水"},
        {char:"开",pinyin:"kāi",english:"open",desc:"打开开启"},
        {char:"关",pinyin:"guān",english:"close",desc:"关闭合上"},
        {char:"来",pinyin:"lái",english:"come",desc:"过来靠近"},
        {char:"去",pinyin:"qù",english:"go",desc:"离开前往"},
        {char:"坐",pinyin:"zuò",english:"sit",desc:"坐下静止"},
        {char:"立",pinyin:"lì",english:"stand",desc:"站立起身"},
        {char:"睡",pinyin:"shuì",english:"sleep",desc:"睡觉休息"},
        {char:"玩",pinyin:"wán",english:"play",desc:"玩耍嬉戏"},
        {char:"学",pinyin:"xué",english:"learn",desc:"学习读书"},
        {char:"画",pinyin:"huà",english:"draw",desc:"画画涂色"}
      ],
      // 10: 常用形容词
      [
        {char:"高",pinyin:"gāo",english:"tall",desc:"高度很高"},
        {char:"矮",pinyin:"ǎi",english:"short",desc:"高度低矮"},
        {char:"长",pinyin:"cháng",english:"long",desc:"长度较长"},
        {char:"短",pinyin:"duǎn",english:"short",desc:"长度短小"},
        {char:"快",pinyin:"kuài",english:"fast",desc:"速度迅速"},
        {char:"慢",pinyin:"màn",english:"slow",desc:"速度迟缓"},
        {char:"好",pinyin:"hǎo",english:"good",desc:"品质优良"},
        {char:"坏",pinyin:"huài",english:"bad",desc:"品质不好"},
        {char:"冷",pinyin:"lěng",english:"cold",desc:"温度寒凉"},
        {char:"热",pinyin:"rè",english:"hot",desc:"温度滚烫"},
        {char:"老",pinyin:"lǎo",english:"old",desc:"年纪年长"},
        {char:"少",pinyin:"shào",english:"young",desc:"年纪幼小"}
      ],
      // 11: 时间
      [
        {char:"早",pinyin:"zǎo",english:"morning",desc:"清晨时段"},
        {char:"晚",pinyin:"wǎn",english:"evening",desc:"傍晚夜里"},
        {char:"今",pinyin:"jīn",english:"today",desc:"当下今天"},
        {char:"明",pinyin:"míng",english:"tomorrow",desc:"次日明天"},
        {char:"昨",pinyin:"zuó",english:"yesterday",desc:"过去昨天"},
        {char:"春",pinyin:"chūn",english:"spring",desc:"春季时节"},
        {char:"夏",pinyin:"xià",english:"summer",desc:"夏季时节"},
        {char:"秋",pinyin:"qiū",english:"autumn",desc:"秋季时节"},
        {char:"冬",pinyin:"dōng",english:"winter",desc:"冬季时节"},
        {char:"年",pinyin:"nián",english:"year",desc:"完整年份"},
        {char:"日",pinyin:"rì",english:"day",desc:"一天日子"},
        {char:"时",pinyin:"shí",english:"hour",desc:"时辰时刻"}
      ],
      // 12: 校园生活用品
      [
        {char:"门",pinyin:"mén",english:"door",desc:"房屋大门"},
        {char:"窗",pinyin:"chuāng",english:"window",desc:"透光窗户"},
        {char:"桌",pinyin:"zhuō",english:"desk",desc:"学习桌子"},
        {char:"椅",pinyin:"yǐ",english:"chair",desc:"坐人椅子"},
        {char:"书",pinyin:"shū",english:"book",desc:"书本读物"},
        {char:"纸",pinyin:"zhǐ",english:"paper",desc:"书写纸张"},
        {char:"笔",pinyin:"bǐ",english:"pen",desc:"写字文具"},
        {char:"灯",pinyin:"dēng",english:"lamp",desc:"照明灯具"},
        {char:"车",pinyin:"chē",english:"car",desc:"代步车辆"},
        {char:"屋",pinyin:"wū",english:"house",desc:"居住房屋"},
        {char:"床",pinyin:"chuáng",english:"bed",desc:"睡觉床铺"},
        {char:"伞",pinyin:"sǎn",english:"umbrella",desc:"防雨伞具"}
      ],
      // 13: 交通工具
      [
        {char:"船",pinyin:"chuán",english:"boat",desc:"水上交通工具"},
        {char:"飞机",pinyin:"fēi jī",english:"airplane",desc:"空中交通工具"},
        {char:"火车",pinyin:"huǒ chē",english:"train",desc:"铁路上跑的列车"},
        {char:"汽车",pinyin:"qì chē",english:"car",desc:"马路上跑的车"},
        {char:"自行车",pinyin:"zì xíng chē",english:"bicycle",desc:"脚踏的两轮车"},
        {char:"地铁",pinyin:"dì tiě",english:"subway",desc:"地下跑的列车"},
        {char:"公交车",pinyin:"gōng jiāo chē",english:"bus",desc:"载人的公共汽车"},
        {char:"卡车",pinyin:"kǎ chē",english:"truck",desc:"运货的大车"},
        {char:"火箭",pinyin:"huǒ jiàn",english:"rocket",desc:"飞向太空的飞行器"},
        {char:"帆船",pinyin:"fān chuán",english:"sailboat",desc:"有帆的船"},
        {char:"坦克",pinyin:"tǎn kè",english:"tank",desc:"军用战车"}
      ],
      // 14: 空（占位）
      [],
      // 15: 基础虚词
      [
        {char:"有",pinyin:"yǒu",english:"have",desc:"拥有存在"},
        {char:"无",pinyin:"wú",english:"none",desc:"没有不存在"},
        {char:"是",pinyin:"shì",english:"is",desc:"判断用词"},
        {char:"不",pinyin:"bù",english:"not",desc:"否定用词"},
        {char:"也",pinyin:"yě",english:"also",desc:"同样、亦是"},
        {char:"和",pinyin:"hé",english:"and",desc:"连接并列"},
        {char:"都",pinyin:"dōu",english:"all",desc:"全部所有"},
        {char:"个",pinyin:"gè",english:"measure word",desc:"通用量词"},
        {char:"只",pinyin:"zhī",english:"measure word for animals",desc:"动物量词"},
        {char:"几",pinyin:"jǐ",english:"how many",desc:"少量数量"}
      ]
    ],
    currentType: 0, currentIndex: 0, showList: [], currentChar: {},
    langMode: 'zh'
  },

  _mergeAllChars() {
    const all = [];
    for (let i = 1; i < this.data.charAll.length; i++) all.push(...this.data.charAll[i]);
    return all;
  },

  _render() {
    const { showList, currentIndex } = this.data;
    if (!showList || showList.length === 0) return;
    if (currentIndex >= showList.length) return;
    this.setData({ currentChar: showList[currentIndex], currentIndex });
  },

  onLoad() {
    const merged = this._mergeAllChars();
    this.setData({ showList: merged });
    this._render();
  },

  onPickerChange(e) {
    const index = parseInt(e.detail.value);
    const showList = index === 0 ? this._mergeAllChars() : this.data.charAll[index];
    this.setData({ currentType: index, showList, currentIndex: 0 });
    this._render();
  },

  onLangToggle() {
    this.setData({
      langMode: this.data.langMode === 'zh' ? 'en' : 'zh'
    });
  },

  onNext() {
    const len = this.data.showList.length;
    if (len === 0) return;
    if (this.data.currentIndex < len - 1) { this.setData({ currentIndex: this.data.currentIndex + 1 }); this._render(); }
  },

  onPrev() {
    const len = this.data.showList.length;
    if (len === 0) return;
    if (this.data.currentIndex > 0) { this.setData({ currentIndex: this.data.currentIndex - 1 }); this._render(); }
  },

  onRandom() {
    const len = this.data.showList.length;
    if (len === 0) return;
    this.setData({ currentIndex: Math.floor(Math.random() * len) });
    this._render();
  },

  onVoice() {
    const char = this.data.currentChar;
    if (!char || !char.char) {
      wx.showToast({ title: '请先选择汉字', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '正在朗读...', mask: true });
    let speakText, lang;
    if (this.data.langMode === 'zh') {
      speakText = char.char;
      lang = 'zh';
    } else {
      // 英文模式：优先用 english 字段，没有则 fallback 到 pinyin
      speakText = char.english || char.pinyin;
      lang = 'en';
    }
    this._baiduTTS(speakText, lang).then((filePath) => {
      console.log('TTS file:', filePath);
      const audio = wx.createInnerAudioContext();
      audio.src = filePath;
      audio.obeyMuteSwitch = false;
      audio.onPlay(() => console.log('Audio playing'));
      audio.onError((err) => console.error('Audio error:', err));
      audio.play();
      audio.onStop(() => { audio.destroy(); try { wx.getFileSystemManager().unlinkSync(filePath); } catch(e){} });
      wx.hideLoading();
    }).catch((err) => {
      console.error('TTS 失败:', err);
      wx.hideLoading();
      wx.showToast({ title: '朗读失败', icon: 'none' });
    });
  },
});
