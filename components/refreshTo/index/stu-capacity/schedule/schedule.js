//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    courseList: [
      { "whatDay": 1, "which": 1, "length": 2, "course": "高等数学2301" },
      { "whatDay": 2, "which": 3, "length": 2, "course": "高等数学2301" },
      { "whatDay": 2, "which": 5, "length": 2, "course": "高等数学2301" },
      { "whatDay": 3, "which": 7, "length": 2, "course": "高等数学2301" },
      { "whatDay": 3, "which": 1, "length": 2, "course": "高等数学2301" },
      { "whatDay": 4, "which": 9, "length": 2, "course": "高等数学23011" },
      { "whatDay": 4, "which": 3, "length": 2, "course": "高等数学2301" },
      { "whatDay": 4, "which": 1, "length": 2, "course": "高等数学2301" },
      { "whatDay": 5, "which": 5, "length": 2, "course": "高等数学2301" },
      { "whatDay": 5, "which": 7, "length": 2, "course": "高等数学2301" },
    ],
    isShow: false,
    current: {},
  },
  onLoad: function () {
    console.log('onLoad')
  },
  getDetail(e) {

    console.log(e)
    this.setData({
      current: "",
      isShow: true
    })
  },
  close() {
    this.setData({
      isShow: false
    })
  }
})
