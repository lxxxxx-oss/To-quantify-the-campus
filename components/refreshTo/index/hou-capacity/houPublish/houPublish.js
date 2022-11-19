// 引入formdata,进行文件上传
const FormData = require("../../../../../utils/formdata")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 通知标题
        publishTitle: "",
        // 通知类型
        publishTag: "",
        tag: ['宿管通知'],
        // 详细的通知内容
        textareaValue: "",
        // 时间的选择
        // publishDate: '2022-10-30',
        deadline: '',
        // 通知配图
        imgList: [],
        // 所有信息列表
        publishList: [],
    },

    onLoad(options) {},
    // 通知标题的输入
    publishTitle(e) {
        this.setData({
            publishTitle: e.detail.value
        })
    },
    // 选择通知类型
    tagChange(e) {
        this.setData({
            publishTag: e.detail.value
        })
    },

    deadline(e) {
        this.setData({
            deadline: e.detail.value
        })
    },

    // 发布通知
    publish() {
        var that = this

        // 调用存储数据的方法
        this.postInfo()
        wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
        })
        // 进行页面跳转
        wx.navigateTo({
            url: '../affiche/affiche',
        })
    },

    // 选择配图
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
      ViewImage(e) {
        wx.previewImage({
          urls: this.data.imgList,
          current: e.currentTarget.dataset.url
        });
      },
      DelImg(e) {
        wx.showModal({
          title: '删除图片',
          content: '确定要删除吗',
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
      textareaInput(e) {
        this.setData({
          textareaValue: e.detail.value
        })
      },
    // 将数据存入数据库
    postInfo() {
        var that = this
        //new一个FormData对象
        // 实例化，用它来上传文件和添加字段
        let formData = new FormData();

        //调用它的append()方法来添加字段或者调用appendFile()方法添加文件

        formData.append("publishTitle", that.data.publishTitle);
        formData.append("publishTag", that.data.tag[that.data.publishTag]);
        formData.append("textareaValue", that.data.textareaValue);
        formData.append("deadline", that.data.deadline);
        // 将数组中的图片地址遍历出来
        this.data.imgList.forEach(e => {
            formData.appendFile("multipartFile", e, that.data.publishTitle);
        })

        let data = formData.getData();
        wx.request({
            url: 'https://alaskaboo.cn/api/info',
            method: 'POST',
            header: {
                "Content-Type": data.contentType,
            },
            data: data.buffer,

            success(res) {
              console.log(res);
            },
            fail(err) {
              console.log(err);
            }
        })
    }
})