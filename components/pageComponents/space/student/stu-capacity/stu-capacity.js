// components/pageComponents/space/student/stu-capacity/stu-capacity.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 未到时间暂不开放
        gotoDorm() {
            wx.showModal({
                title: '提示',
                content: '还未到开放时间',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
            })
        },
        gotoPayment() {
            wx.showModal({
                title: '提示',
                content: '还未到开放时间',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
            })
        },
        gotoAmmeter() {
            wx.navigateTo({
              url: '/components/refreshTo/space/stu-capacity/ammeter/ammeter',
            })
        },
        gotoCard() {
            wx.navigateTo({
              url: '/components/refreshTo/space/stu-capacity/card/card',
            })
        },
        gotoUp() {
            wx.navigateTo({
              url: '/components/refreshTo/space/stu-capacity/up/up',
            })
        },
    }
})
