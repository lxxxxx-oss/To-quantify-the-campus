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
        gotoDestinat() {
            wx.navigateTo({
              url: '/components/refreshTo/index/cou-capacity/destination/destination',
            })
        },
        gotoInform() {
            wx.navigateTo({
              url: '/components/refreshTo/index/cou-capacity/inform/inform',
            })
        },
        gotoGather() {
            wx.navigateTo({
              url: '/components/refreshTo/index/cou-capacity/gather/gather',
            })
        },
        
    }
})
