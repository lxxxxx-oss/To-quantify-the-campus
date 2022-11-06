// pages/index/index.js
Page({

    // 在最开始将所有身份的功能卡全部隐藏
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: '/assets/img/index/swiper.jpg'
          }, {
            id: 1,
              type: 'image',
              url: '/assets/img/index/swiper.jpg',
          }
        ],
        mainText: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        //#region 
        //根据登录时携带的ID信息,选择要展示的功能选项卡
       const app =getApp();
       // 普通学生
       if(app.globalData.isStu){
           this.setData({
               isStu: true
           })
       };
       // 宿管
       if(app.globalData.isHou){
            this.setData({
                isHou: true
            })
        };
        // 辅导员
        if(app.globalData.isCou){
            this.setData({
                isCou: true
            })
        };
        // 班委
        if(app.globalData.isCom){
            this.setData({
                isCom: true
            })
        }
        // console.log(app.globalData);
        //#endregion
        // 拿到通知的主要内容
        wx.getStorage({
            key: 'mainText',
            success(res) {
                console.log(res.data.length);
                // console.log(res.data.split("",208));
                // 将内容切割成数组
                let splited = res.data.split("",208)
                // 过滤掉数组中的空格和换行
                let newArr = splited.filter((item) => {
                    return item != " " && item != "\n"
                })
                // 将数组转换成字符串，不用分隔符
                let strText = newArr.join("")
                // console.log(strText);
                that.setData({
                    mainText: strText
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
             this.getTabBar().setData({
                selected: 0 //这个数是，tabBar从左到右的下标，从0开始
             })
        }
    },

    // 点击查看详细通知内容
    detailText() {
        wx.showModal({
            title: '全部内容',
            content: this.data.mainText,
            success (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

})