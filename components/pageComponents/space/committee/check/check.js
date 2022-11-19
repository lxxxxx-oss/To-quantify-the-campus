// components/pageComponents/space/committee/check/check.js
const App = getApp()
Component({
    lifetimes: {
      attached() {
        this.getFileInfo()
      }
    },

    data: {
      status: false,
      fileInfo: ""
    },
    methods: {
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
          this.data.fileInfo[index].status = true
          this.setData({
            fileInfo: this.data.fileInfo
          })

      },
      // 点击打回
      fail(e) {
           // 拿到页面点击的索引
          //  console.log(e.currentTarget.dataset.index);
           // 存储索引值
           let index = e.currentTarget.dataset.index
   
           // 更改数据
          this.data.fileInfo[index].status = false
          this.setData({
            fileInfo: this.data.fileInfo
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
                "clazzNum": "42000"
            },
  
            success(res) {
            //   console.log(res.data.data.clazzList[0].fileUploadList);
              that.data.fileInfo = res.data.data.clazzList[0].fileUploadList
              that.data.fileInfo.forEach(e => {
                e.status = false
              })
              that.setData({
                fileInfo: that.data.fileInfo
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
            imgList.push(e.path)
          })
          wx.previewImage({
              urls: imgList,
              current: imgList[e.currentTarget.dataset.index],
          })
      }
    },
    
})

