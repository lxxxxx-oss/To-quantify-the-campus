// components/pageComponents/space/committee/check/check.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      status: false,
      fileInfo: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getFileInfo()
    },

    // ListTouch触摸开始
    ListTouchStart(e) {
    this.setData({
        ListTouchStart: e.touches[0].pageX
    })
    },
    // 触摸事件
    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
          ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
        if (this.data.ListTouchDirection =='left'){
            this.setData({
                modalName: e.currentTarget.dataset.target
            })
    } else {
        this.setData({
            modalName: null
        })
    }
        this.setData({
            ListTouchDirection: null
        })
    },
    // 点击通过
    pass(e) {
        // 拿到页面点击的索引
        // console.log(e.currentTarget.dataset.index);
        // 存储索引值
        let index = e.currentTarget.dataset.index

        // 更改数据
        this.data.img[index].status = true
        this.data.img[index].des = "已审核"

        // 调用setData方法使数据马上生效
        this.setData({
            img: this.data.img,
        })
    },
    // 点击打回
    fail(e) {
         // 拿到页面点击的索引
        //  console.log(e.currentTarget.dataset.index);
         // 存储索引值
         let index = e.currentTarget.dataset.index
 
         this.data.img[index].status = false
         this.data.img[index].des = "未通过"

         console.log(this.data.img[index]);
        // 调用setData方法使数据马上生效
         this.setData({
            img: this.data.img
        })
    },
    
    getFileInfo() {
      let that = this
      wx.request({
          url: 'https://alaskaboo.cn/api/file/clazzName/getClazzHonors',
          method: "GET",
          header: {
              // 当使用get请求,且要传递表单数据的时候,使用该请求头
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
              "school": "重庆移通学院",
              "clazzNum": "02132208"
          },

          success(res) {
              console.log(res);
              that.setData({
                  fileInfo: res.data.data.clazzList
              })
          },
          fail(err) {
              console.log(err);
          }
      });
    },

    // 预览图片
    viewImg(e) {
        let that = this
        console.log(e.currentTarget.dataset.index);
        let imgList = []
        that.data.fileInfo.forEach(e => {
            e.fileUploadList.forEach(img => {
                imgList.push(img.path)
            })
        })
        wx.previewImage({
            urls: imgList,
            current: imgList[e.currentTarget.dataset.index],
        })
    }
    
})

