const FormData = require('../../../../../utils/formdata')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 文件名称
        fileNam: "",
        fileCate: "",
        // 文件类型
        category: ["疫情相关", "青年大学习", "班级作业", "证明材料"],
        // 获奖等级
        level: ["一等奖", "二等奖", "三等奖", "优秀奖"],
        // 上传时间
        date: "2022-09-01",
        imgList: [],
        // 备注信息
        remark: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 获取文件名称
    getInputValue(e) {
      // console.log(e.detail.value);
      this.setData({
        fileName: e.detail.value
      })
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

    // 获取备注信息
    textareaAInput(e) {
      // console.log(e.detail.value);
      this.setData({
        remark: e.detail.value
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
        
        // 将该信息对象上传到数据库
        let formData = new FormData();
        // console.log(that.data.imgList);
        formData.append("fileName", that.data.fileName);
        formData.append("fileType", that.data.category[that.data.fileCate]);
        formData.append("remark", that.data.remark);
        formData.append("clazzName", 42001);
        that.data.imgList.forEach(e => {
          formData.appendFile("file", e, that.data.category[that.data.fileCate]);
        })
        

        let data = formData.getData();
        wx.request({
          url: 'https://alaskaboo.cn/api/file/upload',
          method: 'POST',
          header: {
            'content-type': data.contentType
          },
          data: data.buffer,

          success(res) {
            // console.log(res);
            wx.showToast({
              title: '上传成功',
              icon: 'success'
            })
          }
        });
    }
})