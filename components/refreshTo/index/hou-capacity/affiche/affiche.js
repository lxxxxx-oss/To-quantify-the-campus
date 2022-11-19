// 引入获取数据的请求
const {getInfo} = require("../../cou-capacity/inform/getInfo")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 数据的ID
        infoId: [],
        // 通知列表的数据
        publishList: "",
        // 单独存储图片数据、
        imgList: [],
        // 几种活动类型
        allTag: ["学校通知", "活动通知", "比赛通知", "考试通知", "宿管通知"],
        publishTag: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        // 从数据库获取数据
        getInfo().then((res) => {
            console.log(res.data.infoList);           
            res.data.infoList.records.forEach(e => {
                // 将数据库里的图片遍历出来
                that.data.imgList.push(e.imgSrc)
                // 获取活动类型
                that.data.publishTag.push(e.publishTag)
                // 所有数据的ID
                that.data.infoId.push(e.id)
            })
            
            console.log(that.data.infoId);
            this.setData({
                publishList: res.data.infoList.records,
                imgList: that.data.imgList,
                publishTag: that.data.publishTag,
                infoId: that.data.infoId,
                show: true
            })
        }).catch((err) => {
            console.log(err);
        })

        setTimeout(() => {
          console.log(this.data.publishTag);
        },2000)
    },

    // 跳转到发布通知的操作页
    publishInform() {
        wx.navigateTo({
          url: '../houPublish/houPublish',
        })
    },

    // 跳转到通知详情页
    publishDetail(e) {
        // 拿到点击的那条通知的索引
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
          url: '/components/refreshTo/index/stu-capacity/publishDetail/publishDetail?index='+index,
        })
    },

    // 删除按钮
    DelImg(e) {
        var that = this
        wx.showModal({
            title: '删除通知',
            content: '确定要删除吗？',
            cancelText: '取消',
            confirmText: '确定',
            success: res => {
                if (res.confirm) {
                    // console.log(e.currentTarget.dataset.index);
                    // 存储索引
                    let index = e.currentTarget.dataset.index
                    // console.log(that.data.infoId[index]);
                    let num = that.data.infoId[index]
                    let arr = []
                    arr.push(num)
                    wx.request({
                        url: 'https://alaskaboo.cn/api/info',
                        method: 'DELETE',
                        header: {                
                           "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            "ids": arr
                        },
                        success(res) {                            
                            // console.log(res.data);                            
                            // 清空本地的数据，再调取一遍数据库数据
                            that.data.infoId = []
                            that.data.imgList = []
                            // 刷新页面
                            that.onLoad()
                            // console.log(that.data.infoId);

                            // 提示用户
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                        }
                    })
                }
            }
        })
    },
})