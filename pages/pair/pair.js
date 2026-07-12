// pages/pair/pair.js
Page({
  data: {
    wordBank: [
      { word: '一', emoji: '➖' },
      { word: '二', emoji: '⚖️' },
      { word: '三', emoji: '🔱' },
      { word: '四', emoji: '🍀' },
      { word: '五', emoji: '🖐️' },
      { word: '六', emoji: '🤙' },
      { word: '七', emoji: '🌈' },
      { word: '八', emoji: '🐙' },
      { word: '九', emoji: '🆎' },
      { word: '十', emoji: '✝️' },
      { word: '百', emoji: '💯' },
      { word: '千', emoji: '🔢' },
      { word: '零', emoji: '⭕' },
      { word: '爸', emoji: '👨' },
      { word: '妈', emoji: '👩' },
      { word: '爷', emoji: '👴' },
      { word: '奶', emoji: '🥛' },
      { word: '哥', emoji: '👦' },
      { word: '姐', emoji: '👧' },
      { word: '弟', emoji: '👦' },
      { word: '妹', emoji: '👧' },
      { word: '我', emoji: '🙋' },
      { word: '你', emoji: '🫵' },
      { word: '他', emoji: '👤' },
      { word: '她', emoji: '👩' },
      { word: '人', emoji: '🧑' },
      { word: '儿', emoji: '👶' },
      { word: '女', emoji: '👩' },
      { word: '口', emoji: '👄' },
      { word: '手', emoji: '🤚' },
      { word: '耳', emoji: '👂' },
      { word: '目', emoji: '👁️' },
      { word: '头', emoji: '🗣️' },
      { word: '足', emoji: '🦶' },
      { word: '心', emoji: '❤️' },
      { word: '牙', emoji: '🦷' },
      { word: '脸', emoji: '😊' },
      { word: '毛', emoji: '🧶' },
      { word: '骨', emoji: '🦴' },
      { word: '猫', emoji: '🐱' },
      { word: '狗', emoji: '🐶' },
      { word: '鸡', emoji: '🐔' },
      { word: '鸭', emoji: '🦆' },
      { word: '鱼', emoji: '🐟' },
      { word: '鸟', emoji: '🐦' },
      { word: '虫', emoji: '🐛' },
      { word: '马', emoji: '🐴' },
      { word: '牛', emoji: '🐮' },
      { word: '羊', emoji: '🐑' },
      { word: '兔', emoji: '🐰' },
      { word: '虎', emoji: '🐯' },
      { word: '熊', emoji: '🐻' },
      { word: '鹿', emoji: '🦌' },
      { word: '狼', emoji: '🐺' },
      { word: '猴', emoji: '🐵' },
      { word: '蛇', emoji: '🐍' },
      { word: '龟', emoji: '🐢' },
      { word: '蛙', emoji: '🐸' },
      { word: '象', emoji: '🐘' },
      { word: '狮', emoji: '🦁' },
      { word: '豹', emoji: '🐆' },
      { word: '长颈鹿', emoji: '🦒' },
      { word: '斑马', emoji: '🦓' },
      { word: '企鹅', emoji: '🐧' },
      { word: '鹦鹉', emoji: '🦜' },
      { word: '蝴蝶', emoji: '🦋' },
      { word: '蜜蜂', emoji: '🐝' },
      { word: '蚂蚁', emoji: '🐜' },
      { word: '蜘蛛', emoji: '🕷️' },
      { word: '螃蟹', emoji: '🦀' },
      { word: '龙虾', emoji: '🦞' },
      { word: '海豚', emoji: '🐬' },
      { word: '鲸鱼', emoji: '🐳' },
      { word: '鲨鱼', emoji: '🦈' },
      { word: '水母', emoji: '🪼' },
      { word: '蜗牛', emoji: '🐌' },
      { word: '老鼠', emoji: '🐭' },
      { word: '刺猬', emoji: '🦔' },
      { word: '狐狸', emoji: '🦊' },
      { word: '袋鼠', emoji: '🦘' },
      { word: '考拉', emoji: '🐨' },
      { word: '熊猫', emoji: '🐼' },
      { word: '骆驼', emoji: '🐫' },
      { word: '鳄鱼', emoji: '🐊' },
      { word: '恐龙', emoji: '🦕' },
      { word: '天鹅', emoji: '🦢' },
      { word: '猫头鹰', emoji: '🦉' },
      { word: '鸽子', emoji: '🕊️' },
      { word: '孔雀', emoji: '🦚' },
      { word: '公鸡', emoji: '🐓' },
      { word: '母鸡', emoji: '🐔' },
      { word: '小猪', emoji: '🐷' },
      { word: '小牛', emoji: '🐮' },
      { word: '小鸡', emoji: '🐥' },
      { word: '小羊', emoji: '🐑' },
      { word: '小鱼', emoji: '🐠' },
      { word: '小虾', emoji: '🦐' },
      { word: '乌龟', emoji: '🐢' },
      { word: '萤火虫', emoji: '🪲' },
      { word: '瓢虫', emoji: '🐞' },
      { word: '蜻蜓', emoji: '🪰' },
      { word: '蟋蟀', emoji: '🦗' },
      { word: '螳螂', emoji: '🦗' },
      { word: '蜥蜴', emoji: '🦎' },
      { word: '壁虎', emoji: '🦎' },
      { word: '河马', emoji: '🦛' },
      { word: '犀牛', emoji: '🦏' },
      { word: '海狮', emoji: '🦭' },
      { word: '海豹', emoji: '🦭' },
      { word: '水獭', emoji: '🦦' },
      { word: '蝙蝠', emoji: '🦇' },
      { word: '啄木鸟', emoji: '🐦' },
      { word: '燕子', emoji: '🐦' },
      { word: '麻雀', emoji: '🐦' },
      { word: '白鹭', emoji: '🦢' },
      { word: '火烈鸟', emoji: '🦩' },
      { word: '变色龙', emoji: '🦎' },
      { word: '章鱼', emoji: '🐙' },
      { word: '海星', emoji: '⭐' },
      { word: '珊瑚', emoji: '🪸' },
      { word: '贝壳', emoji: '🐚' },
      { word: '海螺', emoji: '🐚' },
      { word: '海胆', emoji: '🦔' },
      { word: '海龟', emoji: '🐢' },
      { word: '小丑鱼', emoji: '🐠' },
      { word: '金鱼', emoji: '🐟' },
      { word: '鲤鱼', emoji: '🐟' },
      { word: '水牛', emoji: '🐃' },
      { word: '牦牛', emoji: '🐂' },
      { word: '绵羊', emoji: '🐑' },
      { word: '山羊', emoji: '🐐' },
      { word: '树懒', emoji: '🦥' },
      { word: '穿山甲', emoji: '🦔' },
      { word: '巨蟒', emoji: '🐍' },
      { word: '眼镜蛇', emoji: '🐍' },
      { word: '青蛙', emoji: '🐸' },
      { word: '鸵鸟', emoji: '🐦' },
      { word: '蜂鸟', emoji: '🐦' },
      { word: '海鸥', emoji: '🐦' },
      { word: '秃鹫', emoji: '🦅' },
      { word: '老鹰', emoji: '🦅' },
      { word: '火鸡', emoji: '🦃' },
      { word: '鹅', emoji: '🦢' },
      { word: '雁', emoji: '🦢' },
      { word: '斑鸠', emoji: '🐦' },
      { word: '乌鸦', emoji: '🐦' },
      { word: '喜鹊', emoji: '🐦' },
      { word: '黄鹂', emoji: '🐦' },
      { word: '野鸡', emoji: '🐦' },
      { word: '鹈鹕', emoji: '🐦' },
      { word: '鸬鹚', emoji: '🐦' },
      { word: '鹤', emoji: '🦢' },
      { word: '鹳', emoji: '🦢' },
      { word: '雪鸮', emoji: '🦉' },
      { word: '雕鸮', emoji: '🦉' },
      { word: '角鸮', emoji: '🦉' },
      { word: '褐林鸮', emoji: '🦉' },
      { word: '乌林鸮', emoji: '🦉' },
      { word: '米', emoji: '🍚' },
      { word: '饭', emoji: '🍱' },
      { word: '面', emoji: '🍜' },
      { word: '水', emoji: '💧' },
      { word: '火', emoji: '🔥' },
      { word: '瓜', emoji: '🍉' },
      { word: '果', emoji: '🍎' },
      { word: '菜', emoji: '🥬' },
      { word: '豆', emoji: '🫘' },
      { word: '茶', emoji: '🍵' },
      { word: '肉', emoji: '🥩' },
      { word: '奶', emoji: '🥛' },
      { word: '日', emoji: '☀️' },
      { word: '月', emoji: '🌙' },
      { word: '星', emoji: '⭐' },
      { word: '云', emoji: '☁️' },
      { word: '风', emoji: '🌬️' },
      { word: '雨', emoji: '🌧️' },
      { word: '雪', emoji: '❄️' },
      { word: '山', emoji: '⛰️' },
      { word: '石', emoji: '🪨' },
      { word: '田', emoji: '🌾' },
      { word: '土', emoji: '🟫' },
      { word: '河', emoji: '🏞️' },
      { word: '江', emoji: '🌊' },
      { word: '海', emoji: '🌊' },
      { word: '天', emoji: '🌤️' },
      { word: '地', emoji: '🌍' },
      { word: '红', emoji: '🔴' },
      { word: '黄', emoji: '🟡' },
      { word: '蓝', emoji: '🔵' },
      { word: '白', emoji: '⚪' },
      { word: '黑', emoji: '⚫' },
      { word: '绿', emoji: '🟢' },
      { word: '灰', emoji: '🩶' },
      { word: '上', emoji: '⬆️' },
      { word: '下', emoji: '⬇️' },
      { word: '左', emoji: '⬅️' },
      { word: '右', emoji: '➡️' },
      { word: '前', emoji: '🔜' },
      { word: '后', emoji: '🔙' },
      { word: '里', emoji: '📦' },
      { word: '外', emoji: '🌍' },
      { word: '中', emoji: '🎯' },
      { word: '大', emoji: '🐘' },
      { word: '小', emoji: '🐜' },
      { word: '多', emoji: '📊' },
      { word: '少', emoji: '📉' },
      { word: '方', emoji: '🟦' },
      { word: '圆', emoji: '🔵' },
      { word: '走', emoji: '🚶' },
      { word: '跑', emoji: '🏃' },
      { word: '跳', emoji: '🦘' },
      { word: '看', emoji: '👀' },
      { word: '听', emoji: '👂' },
      { word: '说', emoji: '🗣️' },
      { word: '吃', emoji: '🍽️' },
      { word: '喝', emoji: '🥤' },
      { word: '开', emoji: '📂' },
      { word: '关', emoji: '📁' },
      { word: '来', emoji: '🔜' },
      { word: '去', emoji: '🔙' },
      { word: '坐', emoji: '🪑' },
      { word: '立', emoji: '🧍' },
      { word: '睡', emoji: '😴' },
      { word: '玩', emoji: '🎮' },
      { word: '学', emoji: '📚' },
      { word: '画', emoji: '🎨' },
      { word: '高', emoji: '📏' },
      { word: '矮', emoji: '📏' },
      { word: '长', emoji: '📏' },
      { word: '短', emoji: '✂️' },
      { word: '快', emoji: '⚡' },
      { word: '慢', emoji: '🐢' },
      { word: '好', emoji: '👍' },
      { word: '坏', emoji: '👎' },
      { word: '冷', emoji: '🥶' },
      { word: '热', emoji: '🥵' },
      { word: '老', emoji: '👴' },
      { word: '少', emoji: '👶' },
      { word: '早', emoji: '🌅' },
      { word: '晚', emoji: '🌆' },
      { word: '今', emoji: '📅' },
      { word: '明', emoji: '📆' },
      { word: '昨', emoji: '📅' },
      { word: '春', emoji: '🌸' },
      { word: '夏', emoji: '☀️' },
      { word: '秋', emoji: '🍂' },
      { word: '冬', emoji: '⛄' },
      { word: '年', emoji: '🎂' },
      { word: '日', emoji: '📅' },
      { word: '时', emoji: '🕐' },
      { word: '门', emoji: '🚪' },
      { word: '窗', emoji: '🪟' },
      { word: '桌', emoji: '🪑' },
      { word: '椅', emoji: '🪑' },
      { word: '书', emoji: '📖' },
      { word: '纸', emoji: '📄' },
      { word: '笔', emoji: '✏️' },
      { word: '灯', emoji: '💡' },
      { word: '车', emoji: '🚗' },
      { word: '屋', emoji: '🏠' },
      { word: '床', emoji: '🛏️' },
      { word: '伞', emoji: '☂️' },
      { word: '钟', emoji: '🕐' },
      { word: '包', emoji: '🎒' },
      { word: '镜', emoji: '🪞' },
      { word: '桃', emoji: '🍑' },
      { word: '梨', emoji: '🍐' },
      { word: '葡萄', emoji: '🍇' },
      { word: '香蕉', emoji: '🍌' },
      { word: '草莓', emoji: '🍓' },
      { word: '西瓜', emoji: '🍉' },
      { word: '菠萝', emoji: '🍍' },
      { word: '辣椒', emoji: '🌶️' },
      { word: '玉米', emoji: '🌽' },
      { word: '蘑菇', emoji: '🍄' },
      { word: '土豆', emoji: '🥔' },
      { word: '洋葱', emoji: '🧅' },
      { word: '船', emoji: '🚢' },
      { word: '飞机', emoji: '✈️' },
      { word: '火车', emoji: '🚂' },
      { word: '自行车', emoji: '🚲' },
      { word: '火箭', emoji: '🚀' },
      { word: '地铁', emoji: '🚇' },
      { word: '卡车', emoji: '🚛' },
      { word: '公交', emoji: '🚌' },
      { word: '摩托', emoji: '🏍️' },
      { word: '坦克', emoji: '🛡️' },
      { word: '帆船', emoji: '⛵' }
    ],
    rows: [],
    selectedWord: '',
    mode: 'high',
    resultPanelText: '',
    resultPanelClass: ''
  },

  _shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const rnd = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[rnd]] = [copy[rnd], copy[i]];
    }
    return copy;
  },

  _generateRows() {
    const shuffledAll = this._shuffle(this.data.wordBank);
    const group = shuffledAll.slice(0, 3);
    const charList = this._shuffle([...group]);
    const imgList = this._shuffle([...group]);
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push({
        word: charList[i].word,
        emoji: imgList[i].emoji,
        imgWord: imgList[i].word,
        resultText: '?',
        resultClass: 'q-default',
        highlight: false,
        charHighlight: false
      });
    }
    return rows;
  },

  onLoad() {
    this.setData({ rows: this._generateRows() });
  },

  switchMode() {
    this.setData({
      mode: this.data.mode === 'high' ? 'low' : 'high',
      selectedWord: '',
      resultPanelText: '',
      resultPanelClass: ''
    });
  },

  onCharTap(e) {
    const clickedWord = e.currentTarget.dataset.word;

    if (this.data.mode === 'high') {
      // 高阶：点汉字选中
      this.setData({ selectedWord: clickedWord });
    } else {
      // 低阶：点汉字配对，结果标记在高亮行
      const rows = this.data.rows.map((row, idx) => {
        if (row.charHighlight && row.resultText === '?') {
          if (clickedWord === row.word) {
            return { ...row, resultText: '✅', highlight: false, charHighlight: false };
          } else {
            return { ...row, resultText: '❌', highlight: false, charHighlight: false };
          }
        }
        return row;
      });
      this.setData({ rows });
      this._checkAllComplete(rows);
    }
  },

  onImgTap(e) {
    const rowIdx = parseInt(e.currentTarget.dataset.row);
    const targetWord = e.currentTarget.dataset.match;

    if (this.data.mode === 'high') {
      // 高阶：有汉字选中，点击图片配对，结果标记在汉字行（word 所在行）
      if (this.data.selectedWord) {
        const isMatch = this.data.selectedWord === targetWord;
        // 找到汉字所在行的索引（word === selectedWord 的行）
        const charRowIdx = this.data.rows.findIndex(r => r.word === this.data.selectedWord);
        const rows = this.data.rows.map((row, idx) => {
          if (idx === charRowIdx) {
            return {
              ...row,
              resultText: isMatch ? '✅' : '❌',
              resultClass: isMatch ? 'q-right' : 'q-wrong'
            };
          }
          return row;
        });
        this.setData({ rows, selectedWord: '' });
        this._checkAllComplete(rows);
      }
    } else {
      // 低阶：点图片后，高亮匹配的那个汉字卡片，同时高亮被点击的图片
      const rows = this.data.rows.map((row, idx) => {
        let newRow = { ...row };
        // 只重置错误项
        if (newRow.resultText === '❌') {
          newRow.resultText = '?';
        }
        // 高亮 word（汉字）等于 targetWord（图片文字）的那一行汉字
        if (row.word === targetWord) {
          newRow.charHighlight = true;
        } else {
          newRow.charHighlight = false;
        }
        // 高亮被点击的图片所在行
        if (idx === rowIdx) {
          newRow.highlight = true;
        }
        return newRow;
      });
      this.setData({ rows });
    }
  },

  _checkAllComplete(rows) {
    const allDone = rows.every(r => r.resultText !== '?');
    if (!allDone) return;

    const allRight = rows.every(r => r.resultText === '✅');
    let resultText, resultClass;
    if (allRight) {
      resultText = '🎉全部配对正确，太棒啦！';
      resultClass = 'right';
    } else {
      resultText = '❌有配对错误，重新点击试试吧！';
      resultClass = 'wrong';
    }
    this.setData({ resultPanelText: resultText, resultPanelClass: resultClass });
  },

  onRefresh() {
    this.setData({
      rows: this._generateRows(),
      selectedWord: '',
      resultPanelText: '',
      resultPanelClass: ''
    });
  }
});
