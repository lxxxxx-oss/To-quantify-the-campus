const {requestTwo} = require("../../../../../utils/request") 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileCate: "",
        // 文件类型
        category: ["疫情相关", "青年大学习", "证明材料", "其他"],
        // 获奖等级
        level: ["一等奖", "二等奖", "三等奖", "优秀奖"],
        // 上传时间
        date: "2021-09-01",
        imgList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 文件类型的选择
    categoryChange(e) {
        console.log(e);
        this.setData({
            fileCate: e.detail.value
        })
    },
    // 上传时间的选择
    DateChange(e) {
        this.setData({
          date: e.detail.value
        })
    },
    //#region 
    // 图片的上传
    ChooseImage() {
        wx.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.data.imgList.length != 0) {
              this.setData({
                imgList: this.data.imgList.concat(res.tempFilePaths)
              })
            } else {
              this.setData({
                imgList: res.tempFilePaths
              })
            }
          }
        });
      },
    // 预览图片 
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    // 删除按钮
    DelImg(e) {
        wx.showModal({
          title: '同学',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.data.imgList.splice(e.currentTarget.dataset.index, 1);
              this.setData({
                imgList: this.data.imgList
              })
            }
          }
        })
    },
    //#endregion
    //  提交信息
    submit() {
        var that = this
        // 创建一个对象，存储用户填入的信息
        let info = {
            fileCate: this.data.fileCate,
            date: this.data.date,
            imgSrc: this.data.imgList
        }
        
        // 将该信息对象上传到数据库
        // requestTwo({
        //     url: '',
        //     method: 'POST',
        //     data: {

        //     },

        //     success(res) {
        //         console.log(res);
        //         wx.showToast({
        //             title: '提交成功',
        //             icon: 'success',
        //             duration: 2000
        //         })
        //     }
        // })
    }
})