// app.js
App({
  onLaunch() {
    // 检查同声传译插件是否可用
    if (typeof wx === 'undefined') {
      console.warn('请在微信开发者工具或真机中运行');
    }
  },
  globalData: {}
});
