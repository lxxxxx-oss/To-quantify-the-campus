// components/pageComponents/space/counselor/cou-capacity/cou-capacity.js
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
        gotoRecord() {
            wx.navigateTo({
                url:'/components/refreshTo/space/cou-capacity/stuRecord/stuRecord'
            })
        },
        gotoAppoint() {
            wx.navigateTo({
                url:'/components/refreshTo/space/cou-capacity/stuAppoint/stuAppoint'
            })
        },
        gotoGool() {
            wx.navigateTo({
              url: '/components/refreshTo/space/cou-capacity/stuGool/stuGool',
            })
        }
    }   
})
