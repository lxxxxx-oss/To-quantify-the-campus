Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 打卡学生的信息
        studentInfo: [],
        // 是否打卡
        isChecked: [],
        // 下载exl表的地址
        exlUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getPunchInfo()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //添加选中效果,避免自定义tabbar闪烁
         if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1 //这个数是，tabBar从左到右的下标，从0开始
            })
        }
    },
    
    // 拿到学生信息
    getPunchInfo() {
        let that = this
        let i = 0
        wx.request({
            url: 'https://alaskaboo.cn/resident/2020212037',
            method: 'POST',
            header: {
                "Content-Type": 'application/json',
            },
            data: {
                "timestamp":1668348012
            },
            success(res) {
                // console.log(res.data.data);
                let infoList = res.data.data.data[4]
                // 拿到该对象的所有键
                let keys = Object.keys(infoList)
                // console.log(keys);
                keys.forEach(e => {
                    // console.log(infoList[e]);
                    let stuKeys = Object.keys(infoList[e])
                    stuKeys.forEach((stu, index) => {
                        // console.log(infoList[e][stu]);
                        that.data.studentInfo.push(infoList[e][stu].studentInfo)
                        that.data.studentInfo[i].isChecked = infoList[e][stu].isChecked
                        i = i+1
                        that.setData({
                            studentInfo: that.data.studentInfo,
                        })
                    })
                }) 
                // console.log(that.data.studentInfo);
                // console.log(that.data.isChecked);
            }
        });
    },

    // 打印exl表
    print() {
        let that = this
        wx.request({
            url: 'https://alaskaboo.cn/resident/download/2020212037',
            method: 'POST',
            header: {
                "Content-Type": 'application/json',
            },
            data: {
                "timestamp":1668348012
            },

            success(res) {
                // 拿到下载exl的路径
                // console.log(res.data.data.path);
                that.setData({
                    exlUrl: res.data.data.path
                })
                
                wx.showModal({
                    title: '提示',
                    content: '确认前往打印吗',
                    success (res) {
                      if (res.confirm) {
                        // 打开excel文件
                        wx.downloadFile({
                            url: that.data.exlUrl,
                            success: function (res) {
                            const filePath = res.tempFilePath
                            wx.openDocument({
                                filePath: filePath,
                                success: function (res) {
                                console.log('打开文档成功')
                                }
                            })
                            }
                        })
                      } 
                      else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                })
            }
        })
    }
    

})