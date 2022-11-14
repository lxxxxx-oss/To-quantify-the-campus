const {requestTwo} = require("../../../../../utils/request")
// 引入formdata,进行文件上传
const FormData = require("../../../../../utils/formdata.js")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 获奖名称
        awardsName: "",
        // 奖项级别
        awardsCate: "",
        category: ["校级", "区级", "市级", "省级", "国家级"],
        // 获奖等级
        awardsLevel: "",
        level: ["一等奖", "二等奖", "三等奖", "优秀奖"],
        // 获奖时间
        date: "2021-09-01",
        // 综测得分
        marks: "",
        // 图片列表
        imgList: [],
        // 所有信息列表
        infoList: [],
        // 点击修改
        // 信息列表总览，可修改
        currentInfo: "",
        // 要修改的信息，在缓存中的索引
        infoIndex: ""
    },

    onLoad(options) {
        // 解析JSON数据
        this.data.currentInfo = JSON.parse(options.currentInfo)
        // 将当前的综测信息存储起来
        this.setData({
            currentInfo: this.data.currentInfo
        })
        console.log(this.data.currentInfo.award);
    },
    //#region 
    // 奖项名称的获取
    userInput(e) {
        // 如果是修改信息
        if(this.data.currentInfo) {
            this.data.currentInfo.award = e.detail.value
        }
        this.setData({
            awardsName: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },
    // 奖项级别的选择
    categoryChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardCategory = this.data.category[e.detail.value] || ""
        }
        this.setData({
            awardsCate: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },
    // 获奖等级的选择
    levelChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardLevel = this.data.level[e.detail.value] || ""
        }
        this.setData({
            awardsLevel: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },
    // 获奖时间的选择
    DateChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardTime = e.detail.value || ""
        }
        this.setData({
            date: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },

    // 奖项得分的获取
    inputMarks(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardScore = e.detail.value
        }
        this.setData({
            marks: e.detail.value,
            currentInfo: this.data.currentInfo
        })
        // console.log(e.detail.value);
    },

    // 图片的上传
    ChooseImage() {
        wx.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            // 当填写信息的时候
            if (this.data.imgList.length != 0) {
                this.setData({
                    imgList: this.data.imgList.concat(res.tempFilePaths)
                })
                console.log(this.data.imgList);
            } else{
                this.setData({
                    imgList: res.tempFilePaths
                })
                console.log(this.data.imgList);
            }
          }
        });
      },
    // 预览图片 
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.currentInfo ? this.data.currentInfo.img : this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    // 删除按钮
    DelImg(e) {
        wx.showModal({
          title: '删除图片',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
                // console.log(this.data.currentInfo.imgSrc);
                // console.log(e.currentTarget.dataset.index);
                
                (this.data.currentInfo ? this.data.currentInfo.imgSrc : this.data.imgList).splice(e.currentTarget.dataset.index, 1);

                this.setData({
                    imgList: this.data.imgList,
                    currentInfo: this.data.currentInfo
                })
                console.log(this.data.currentInfo);
            }
          }
        })
    },
    //#endregion
    //  提交信息
    submit() {
        var that = this
        // 将图片存入数据库
        // this.postMoralImg()
        // 将描述信息存入数据库
        that.postMoralStr()
        wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
        })
        // 进行页面跳转
        wx.navigateTo({
            url: '/components/refreshTo/index/stu-capacity/career/career?category='+"综测成绩",
        })
    },

    // 向数据库提交信息
    // 将图片数据存入数据库
    postMoralImg() {
        var that = this
        //new一个FormData对象
        // 实例化，用它来上传文件和添加字段
        let formData = new FormData();

        //调用它的append()方法来添加字段或者调用appendFile()方法添加文件
        // 将数组中的图片地址遍历出来
        that.data.imgList.forEach(e => {
            formData.appendFile("file", e, that.data.awardsName);
        })
        
        let data = formData.getData();
        wx.request({
            url: 'https://alaskaboo.cn/api/honor/upload/1',
            method: 'POST',
            header: {
                "Content-Type": data.contentType,
                // "Content-Type": 'multipart/form-data'
            },
            data: data.buffer,

            success(res) {
                console.log(res);
            },
            fail(err) {
                console.log(err);
            }
        })
    },
    // 将修改后的字符串信息上传到数据库
    postMoralStr() {
        var that = this
        // console.log(this.data.currentInfo.id);
        wx.request({
            // 3 => 是用户学生的ID
            url: 'https://alaskaboo.cn/api/honor',
            method: 'PUT',
            header: {
                "Content-Type": 'application/json',
            },
            // id => 是该荣誉的ID
            data: {
                id: that.data.currentInfo.id,
                award: that.data.currentInfo.award,
                awardCategory: that.data.category[that.data.currentInfo.awardCategory],
                awardLevel: that.data.level[that.data.currentInfo.awardLevel],
                awardTime: that.data.currentInfo.awardTime,
                awardScore: that.data.currentInfo.awardScore
            },

            success(res) {
                console.log(res);
            },
            fail(err) {
                console.log(err);
            }
        })
    }
})