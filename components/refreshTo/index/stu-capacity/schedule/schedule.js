// components/refreshTo/index/stu-capacity/schedule/schedule.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageLifetimes: {
            show: function() {
                wx.request({
                    url: 'http://www.dlutci.edu.cn/info/1391/10004.htm',
                    method: 'GET'
                }),
                console.log(data)
            }
          }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {}
})
