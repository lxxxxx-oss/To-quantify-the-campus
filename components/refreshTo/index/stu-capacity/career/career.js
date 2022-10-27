// components/refreshTo/index/stu-capacity/career/career.js
Page({


    data: {
         // 成绩类别
         category: "",
         time: "",
    },

    onLoad(options) {
        // 获奖信息点击提交后，直接跳转到该页面，并将页面切换到综测查询组件
        this.setData({
            category: options.category
        })
    },

    // 选择查询成绩的类别
    scoreQuery() {
        var that = this
        wx.showActionSheet({
            itemList: ['期末成绩', '综测成绩'],
            success (res) {
                that.setData({
                    category: res.tapIndex ? '综测成绩' : '期末成绩'
                })
            },
            fail (res) {
                console.log(res.errMsg)
            }
        })
        // console.log(this.data.category);
    },
    // 选择要查询的时间
    timeQuery() {
        var that = this
        wx.showActionSheet({
            itemList: ['2021-2022学年第二学期','2021-2022学年第一学期','2020-2021学年第二学期', '2020-2021学年第一学期'],
            success (res) {
                console.log(res.tapIndex);
                
                if(res.tapIndex == 0) {
                    that.setData({
                        time: '2021-2022学年第二学期'
                    })
                }else if(res.tapIndex == 1) {
                    that.setData({
                        time: '2021-2022学年第一学期'
                    })
                }else if(res.tapIndex == 2) {
                    that.setData({
                        time: '2020-2021学年第二学期'
                    })
                }else if(res.tapIndex == 3) {
                    that.setData({
                        time: '2020-2021学年第一学期'
                    })
                }
            },
            fail (res) {
                console.log(res.errMsg)
            }
        })
        console.log(this.data.time);
    }
})
