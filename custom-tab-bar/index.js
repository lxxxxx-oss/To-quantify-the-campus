const app =getApp();
Component({
  data: {
    selectedColor: "#468AFB",
    selected: 0,
    list: []
  },
    //组件的生命周期函数
    attached() {
     this.setData({
      list: app.globalData.list
     })
    },
  methods: {
    switchTab(event) {
        // data为接受到的参数
        const data = event.currentTarget.dataset;
        // 取出参数中的path作为路由跳转的目标地址
        wx.switchTab({url: data.path});
    },
  },
})