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
        gotoBed() {
            wx.navigateTo({
              url: '/components/refreshTo/index/hou-capacity/bed/bed',
            })
        },
        gotoAffiche() {
            wx.navigateTo({
              url: '/components/refreshTo/index/hou-capacity/affiche/affiche',
            })
        },
        gotoState() {
            wx.navigateTo({
              url: '/components/refreshTo/index/hou-capacity/state/state',
            })
        },
        gotoPunch() {
            wx.navigateTo({
              url: '/components/refreshTo/index/hou-capacity/punch/punch',
            })
        }
    }
})
