// pages/index/index.js
const APP_ID = '你的APP_ID';
const API_KEY = 'SpMUHUSfoG0o7VRwIHjaIxzX';
const SECRET_KEY = 'tbXJ0PZnMxq5xQwDEDNNjiKKn1PMCHhJ';
let accessToken = '';
let tokenExpireTime = 0;

Page({
  /**
   * 获取百度 access_token
   */
  _getAccessToken() {
    return new Promise((resolve, reject) => {
      // 检查 token 是否还在有效期内
      const now = Date.now();
      if (accessToken && now < tokenExpireTime) {
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
            // token 有效期 30 天（2592000 秒），提前 1 小时刷新
            tokenExpireTime = Date.now() + (res.data.expires_in - 3600) * 1000;
            resolve(accessToken);
          } else {
            reject(new Error('获取 access_token 失败'));
          }
        },
        fail: (err) => reject(err)
      });
    });
  },

  /**
   * 调用百度 TTS 合成语音
   */
  _baiduTTS(text) {
    return new Promise(async (resolve, reject) => {
      try {
        const tok = await this._getAccessToken();
        // 使用百度 REST API 短文本合成（POST 方式）
        const url = 'https://tsn.baidu.com/text2audio';

        const postData = {
          tex: text,
          tok: tok,
          cuid: 'wechat_miniprogram',
          ctp: 1,
          lan: 'zh',
          spd: '5',
          pit: '5',
          vol: '10',
          per: '4',
          aue: '3'
        };

        wx.request({
          url: url,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'audio/*'
          },
          data: this._urlencode(postData),
          responseType: 'arraybuffer',
          success: (res) => {
            if (res.statusCode === 200 && res.data) {
              // 将 arraybuffer 写入临时文件
              const fs = wx.getFileSystemManager();
              const filePath = `${wx.env.USER_DATA_PATH}/tts_${Date.now()}.mp3`;
              try {
                fs.writeFileSync(filePath, res.data, 'binary');
                resolve(filePath);
              } catch (e) {
                console.error('写文件失败:', e);
                reject(e);
              }
            } else {
              console.error('TTS 响应状态:', res.statusCode);
              reject(new Error(`TTS 合成失败: ${res.statusCode}`));
            }
          },
          fail: (err) => {
            console.error('TTS 请求失败:', err);
            reject(err);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  },

  /**
   * 对象转 URL 编码字符串
   */
  _urlencode(obj) {
    const parts = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
      }
    }
    return parts.join('&');
  },

  /**
   * 13 大类识字字库（汉字、拼音、释义）
   */
  data: {
    categories: [
      '全部汉字',
      '数字类',
      '人称家人',
      '身体五官',
      '日常动物',
      '果蔬食物',
      '自然天气',
      '颜色',
      '方位形状',
      '基础动词',
      '常用形容词',
      '时间',
      '校园生活用品',
      '基础虚词'
    ],
    charAll: [
      // 0: 全部（占位）
      [],
      // 1: 数字类
      [
        { char: '一', pinyin: 'yī', desc: '基础数字' },
        { char: '二', pinyin: 'èr', desc: '基础数字' },
        { char: '三', pinyin: 'sān', desc: '基础数字' },
        { char: '四', pinyin: 'sì', desc: '基础数字' },
        { char: '五', pinyin: 'wǔ', desc: '基础数字' },
        { char: '六', pinyin: 'liù', desc: '基础数字' },
        { char: '七', pinyin: 'qī', desc: '基础数字' },
        { char: '八', pinyin: 'bā', desc: '基础数字' },
        { char: '九', pinyin: 'jiǔ', desc: '基础数字' },
        { char: '十', pinyin: 'shí', desc: '基础数字' },
        { char: '百', pinyin: 'bǎi', desc: '数位单位' },
        { char: '千', pinyin: 'qiān', desc: '数位单位' },
        { char: '零', pinyin: 'líng', desc: '数字空位' }
      ],
      // 2: 人称家人
      [
        { char: '爸', pinyin: 'bà', desc: '父亲称呼' },
        { char: '妈', pinyin: 'mā', desc: '母亲称呼' },
        { char: '爷', pinyin: 'yé', desc: '祖父称呼' },
        { char: '奶', pinyin: 'nǎi', desc: '祖母称呼' },
        { char: '哥', pinyin: 'gē', desc: '年长兄长' },
        { char: '姐', pinyin: 'jiě', desc: '年长姐姐' },
        { char: '弟', pinyin: 'dì', desc: '年幼弟弟' },
        { char: '妹', pinyin: 'mèi', desc: '年幼妹妹' },
        { char: '我', pinyin: 'wǒ', desc: '第一人称' },
        { char: '你', pinyin: 'nǐ', desc: '第二人称' },
        { char: '他', pinyin: 'tā', desc: '第三人称男' },
        { char: '她', pinyin: 'tā', desc: '第三人称女' },
        { char: '人', pinyin: 'rén', desc: '人类个体' },
        { char: '儿', pinyin: 'ér', desc: '孩童、子女' },
        { char: '女', pinyin: 'nǚ', desc: '女性、女孩' }
      ],
      // 3: 身体五官
      [
        { char: '口', pinyin: 'kǒu', desc: '嘴巴、口腔' },
        { char: '手', pinyin: 'shǒu', desc: '手部肢体' },
        { char: '耳', pinyin: 'ěr', desc: '耳朵、听觉器官' },
        { char: '目', pinyin: 'mù', desc: '眼睛、视觉器官' },
        { char: '头', pinyin: 'tóu', desc: '头部身体部位' },
        { char: '足', pinyin: 'zú', desc: '脚部肢体' },
        { char: '心', pinyin: 'xīn', desc: '心脏、内心' },
        { char: '牙', pinyin: 'yá', desc: '牙齿' },
        { char: '脸', pinyin: 'liǎn', desc: '面部脸庞' },
        { char: '毛', pinyin: 'máo', desc: '毛发绒毛' },
        { char: '骨', pinyin: 'gǔ', desc: '骨骼骨头' }
      ],
      // 4: 日常动物
      [
        { char: '猫', pinyin: 'māo', desc: '家养小动物' },
        { char: '狗', pinyin: 'gǒu', desc: '家养小动物' },
        { char: '鸡', pinyin: 'jī', desc: '常见家禽' },
        { char: '鸭', pinyin: 'yā', desc: '常见家禽' },
        { char: '鱼', pinyin: 'yú', desc: '水生动物' },
        { char: '鸟', pinyin: 'niǎo', desc: '飞行动物' },
        { char: '虫', pinyin: 'chóng', desc: '昆虫小虫' },
        { char: '马', pinyin: 'mǎ', desc: '家畜动物' },
        { char: '牛', pinyin: 'niú', desc: '家畜动物' },
        { char: '羊', pinyin: 'yáng', desc: '家畜动物' },
        { char: '兔', pinyin: 'tù', desc: '温顺小动物' },
        { char: '虎', pinyin: 'hǔ', desc: '大型猛兽' },
        { char: '熊', pinyin: 'xióng', desc: '大型动物' }
      ],
      // 5: 蔬菜水果食物
      [
        { char: '米', pinyin: 'mǐ', desc: '主食粮食' },
        { char: '饭', pinyin: 'fàn', desc: '煮熟主食' },
        { char: '面', pinyin: 'miàn', desc: '面食主食' },
        { char: '水', pinyin: 'shuǐ', desc: '饮用液体' },
        { char: '火', pinyin: 'huǒ', desc: '火焰火种' },
        { char: '瓜', pinyin: 'guā', desc: '瓜果蔬果' },
        { char: '果', pinyin: 'guǒ', desc: '水果果实' },
        { char: '菜', pinyin: 'cài', desc: '蔬菜食材' },
        { char: '豆', pinyin: 'dòu', desc: '豆类食材' },
        { char: '茶', pinyin: 'chá', desc: '饮品茶水' },
        { char: '肉', pinyin: 'ròu', desc: '肉食食材' },
        { char: '奶', pinyin: 'nǎi', desc: '乳制品饮品' }
      ],
      // 6: 自然天气
      [
        { char: '日', pinyin: 'rì', desc: '太阳、日子' },
        { char: '月', pinyin: 'yuè', desc: '月亮、月份' },
        { char: '星', pinyin: 'xīng', desc: '天上星星' },
        { char: '云', pinyin: 'yún', desc: '天空云朵' },
        { char: '风', pinyin: 'fēng', desc: '自然风力' },
        { char: '雨', pinyin: 'yǔ', desc: '下雨天气' },
        { char: '雪', pinyin: 'xuě', desc: '降雪天气' },
        { char: '山', pinyin: 'shān', desc: '自然山川' },
        { char: '石', pinyin: 'shí', desc: '石头石块' },
        { char: '田', pinyin: 'tián', desc: '农田土地' },
        { char: '土', pinyin: 'tǔ', desc: '泥土土壤' },
        { char: '河', pinyin: 'hé', desc: '自然小河' },
        { char: '江', pinyin: 'jiāng', desc: '宽阔大江' },
        { char: '海', pinyin: 'hǎi', desc: '广阔大海' },
        { char: '天', pinyin: 'tiān', desc: '天空天际' },
        { char: '地', pinyin: 'dì', desc: '大地地面' }
      ],
      // 7: 颜色
      [
        { char: '红', pinyin: 'hóng', desc: '红色色彩' },
        { char: '黄', pinyin: 'huáng', desc: '黄色色彩' },
        { char: '蓝', pinyin: 'lán', desc: '蓝色色彩' },
        { char: '白', pinyin: 'bái', desc: '白色色彩' },
        { char: '黑', pinyin: 'hēi', desc: '黑色色彩' },
        { char: '绿', pinyin: 'lǜ', desc: '绿色色彩' },
        { char: '灰', pinyin: 'huī', desc: '灰色色彩' }
      ],
      // 8: 方位、大小形状
      [
        { char: '上', pinyin: 'shàng', desc: '上方位置' },
        { char: '下', pinyin: 'xià', desc: '下方位置' },
        { char: '左', pinyin: 'zuǒ', desc: '左侧方位' },
        { char: '右', pinyin: 'yòu', desc: '右侧方位' },
        { char: '前', pinyin: 'qián', desc: '前面方位' },
        { char: '后', pinyin: 'hòu', desc: '后面方位' },
        { char: '里', pinyin: 'lǐ', desc: '内部里面' },
        { char: '外', pinyin: 'wài', desc: '外部外面' },
        { char: '中', pinyin: 'zhōng', desc: '中间中心' },
        { char: '大', pinyin: 'dà', desc: '体积宽阔' },
        { char: '小', pinyin: 'xiǎo', desc: '体积细小' },
        { char: '多', pinyin: 'duō', desc: '数量很多' },
        { char: '少', pinyin: 'shǎo', desc: '数量很少' },
        { char: '方', pinyin: 'fāng', desc: '方形形状' },
        { char: '圆', pinyin: 'yuán', desc: '圆形形状' }
      ],
      // 9: 基础动词（动作）
      [
        { char: '走', pinyin: 'zǒu', desc: '步行走路' },
        { char: '跑', pinyin: 'pǎo', desc: '快速奔跑' },
        { char: '跳', pinyin: 'tiào', desc: '跳跃动作' },
        { char: '看', pinyin: 'kàn', desc: '用眼观看' },
        { char: '听', pinyin: 'tīng', desc: '用耳聆听' },
        { char: '说', pinyin: 'shuō', desc: '开口说话' },
        { char: '吃', pinyin: 'chī', desc: '进食吃饭' },
        { char: '喝', pinyin: 'hē', desc: '饮用喝水' },
        { char: '开', pinyin: 'kāi', desc: '打开开启' },
        { char: '关', pinyin: 'guān', desc: '关闭合上' },
        { char: '来', pinyin: 'lái', desc: '过来靠近' },
        { char: '去', pinyin: 'qù', desc: '离开前往' },
        { char: '坐', pinyin: 'zuò', desc: '坐下静止' },
        { char: '立', pinyin: 'lì', desc: '站立起身' },
        { char: '睡', pinyin: 'shuì', desc: '睡觉休息' },
        { char: '玩', pinyin: 'wán', desc: '玩耍嬉戏' },
        { char: '学', pinyin: 'xué', desc: '学习读书' },
        { char: '画', pinyin: 'huà', desc: '画画涂色' }
      ],
      // 10: 常用形容词
      [
        { char: '高', pinyin: 'gāo', desc: '高度很高' },
        { char: '矮', pinyin: 'ǎi', desc: '高度低矮' },
        { char: '长', pinyin: 'cháng', desc: '长度较长' },
        { char: '短', pinyin: 'duǎn', desc: '长度短小' },
        { char: '快', pinyin: 'kuài', desc: '速度迅速' },
        { char: '慢', pinyin: 'màn', desc: '速度迟缓' },
        { char: '好', pinyin: 'hǎo', desc: '品质优良' },
        { char: '坏', pinyin: 'huài', desc: '品质不好' },
        { char: '冷', pinyin: 'lěng', desc: '温度寒凉' },
        { char: '热', pinyin: 'rè', desc: '温度滚烫' },
        { char: '老', pinyin: 'lǎo', desc: '年纪年长' },
        { char: '少', pinyin: 'shào', desc: '年纪幼小' }
      ],
      // 11: 时间
      [
        { char: '早', pinyin: 'zǎo', desc: '清晨时段' },
        { char: '晚', pinyin: 'wǎn', desc: '傍晚夜里' },
        { char: '今', pinyin: 'jīn', desc: '当下今天' },
        { char: '明', pinyin: 'míng', desc: '次日明天' },
        { char: '昨', pinyin: 'zuó', desc: '过去昨天' },
        { char: '春', pinyin: 'chūn', desc: '春季时节' },
        { char: '夏', pinyin: 'xià', desc: '夏季时节' },
        { char: '秋', pinyin: 'qiū', desc: '秋季时节' },
        { char: '冬', pinyin: 'dōng', desc: '冬季时节' },
        { char: '年', pinyin: 'nián', desc: '完整年份' },
        { char: '日', pinyin: 'rì', desc: '一天日子' },
        { char: '时', pinyin: 'shí', desc: '时辰时刻' }
      ],
      // 12: 校园生活用品
      [
        { char: '门', pinyin: 'mén', desc: '房屋大门' },
        { char: '窗', pinyin: 'chuāng', desc: '透光窗户' },
        { char: '桌', pinyin: 'zhuō', desc: '学习桌子' },
        { char: '椅', pinyin: 'yǐ', desc: '坐人椅子' },
        { char: '书', pinyin: 'shū', desc: '书本读物' },
        { char: '纸', pinyin: 'zhǐ', desc: '书写纸张' },
        { char: '笔', pinyin: 'bǐ', desc: '写字文具' },
        { char: '灯', pinyin: 'dēng', desc: '照明灯具' },
        { char: '车', pinyin: 'chē', desc: '代步车辆' },
        { char: '屋', pinyin: 'wū', desc: '居住房屋' },
        { char: '床', pinyin: 'chuáng', desc: '睡觉床铺' },
        { char: '伞', pinyin: 'sǎn', desc: '防雨伞具' }
      ],
      // 13: 简单虚词
      [
        { char: '有', pinyin: 'yǒu', desc: '拥有存在' },
        { char: '无', pinyin: 'wú', desc: '没有不存在' },
        { char: '是', pinyin: 'shì', desc: '判断用词' },
        { char: '不', pinyin: 'bù', desc: '否定用词' },
        { char: '也', pinyin: 'yě', desc: '同样、亦是' },
        { char: '和', pinyin: 'hé', desc: '连接并列' },
        { char: '都', pinyin: 'dōu', desc: '全部所有' },
        { char: '一', pinyin: 'yī', desc: '量词单个' },
        { char: '个', pinyin: 'gè', desc: '通用量词' },
        { char: '只', pinyin: 'zhī', desc: '动物量词' },
        { char: '几', pinyin: 'jǐ', desc: '少量数量' }
      ]
    ],
    currentType: 0,
    currentIndex: 0,
    showList: [],
    currentChar: {}
  },

  _mergeAllChars() {
    const all = [];
    for (let i = 1; i < this.data.charAll.length; i++) {
      all.push(...this.data.charAll[i]);
    }
    return all;
  },

  _render() {
    const { showList, currentIndex } = this.data;
    if (showList.length === 0) return;
    const item = showList[currentIndex];
    this.setData({
      currentChar: item,
      currentIndex: currentIndex
    });
  },

  onLoad() {
    this.setData({
      showList: this._mergeAllChars()
    });
    this._render();
  },

  onCategoryTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    let showList;
    if (index === 0) {
      showList = this._mergeAllChars();
    } else {
      showList = this.data.charAll[index];
    }
    this.setData({
      currentType: index,
      showList: showList,
      currentIndex: 0
    });
    this._render();
  },

  onPrev() {
    if (this.data.currentIndex > 0) {
      this.setData({
        currentIndex: this.data.currentIndex - 1
      });
      this._render();
    }
  },

  onNext() {
    const len = this.data.showList.length;
    if (this.data.currentIndex < len - 1) {
      this.setData({
        currentIndex: this.data.currentIndex + 1
      });
      this._render();
    }
  },

  /**
   * 跟读发音 - 使用百度 TTS API
   */
  async onVoice() {
    const char = this.data.currentChar.char;
    if (!char) return;

    wx.showLoading({ title: '正在朗读...', mask: true });

    try {
      const filePath = await this._baiduTTS(char);
      const audio = wx.createInnerAudioContext();
      audio.src = filePath;
      audio.obeyMuteSwitch = false; // 静音模式下也能播放
      audio.play();
      audio.onStop(() => {
        audio.destroy();
        // 清理临时文件
        try {
          wx.getFileSystemManager().unlinkSync(filePath);
        } catch (e) {}
      });
      wx.hideLoading();
    } catch (err) {
      console.error('TTS 失败:', err);
      wx.hideLoading();
      wx.showToast({ title: '朗读失败，请重试', icon: 'none' });
    }
  },

  onRandom() {
    const len = this.data.showList.length;
    if (len === 0) return;
    const randomIndex = Math.floor(Math.random() * len);
    this.setData({
      currentIndex: randomIndex
    });
    this._render();
  }
});
