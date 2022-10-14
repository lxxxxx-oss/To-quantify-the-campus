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
        gotoDorm() {
            wx.navigateTo({
              url: '/components/refreshTo/space/stu-capacity/dorm/dorm',
            })
        },
        gotoPayment() {
            wx.navigateTo({
              url: '/components/refreshTo/space/stu-capacity/payment/payment',
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
