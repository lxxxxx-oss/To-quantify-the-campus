Component({
    //  组件所在页面的生命周期
  pageLifetimes: {
    show: function() {
      // 动态改变盒子之间的间距
      this.setData({
          capacityHeight: wx.getSystemInfoSync().windowHeight / 15
      })
    }
  },

    /**
     * 组件的初始数据
     */
    data: {
        capacityHeight: wx.getSystemInfoSync().windowHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoSchedule() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/schedule/schedule',
            })
        },
        gotoInform() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/inform/inform',
            })
        },
        gotoPunch() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/punch/punch',
            })
        },
        gotoCareer() {
            wx.navigateTo({
              url: '/components/refreshTo/index/stu-capacity/career/career',
            })
        }
    }
})
