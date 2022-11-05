// components/refreshTo/index/stu-capacity/uploadAwards/uploadAwards.js
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
        var that = this
        // 读取缓存中的获奖信息数组,如果有数据则拿出来,如果没有则为空
        wx.getStorage({
            key: 'infoList',
            success(res) {
                that.setData({
                    infoList: res.data
                })
            }
        }) || []

        // 修改填写的信息
        // console.log(options.currentInfo);
        // 如果是修改数据，则进行下面的操作，如果是填写获奖信息，则不进行下面的操作
        if(options.currentInfo) {
            // 将JSON格式的数据转换为JS对象
            var currentInfo = JSON.parse(options.currentInfo)
            let index = options.index
            // console.log(currentInfo);
            this.data.currentInfo = currentInfo
            this.data.infoIndex = index
            this.setData({
                currentInfo: this.data.currentInfo,
                infoIndex: this.data.infoIndex
            })
            // console.log(this.data.infoIndex);
        }
    },

    // 奖项名称的获取
    userInput(e) {
        // 如果是修改信息
        if(this.data.currentInfo) {
            this.data.currentInfo.awardsName = e.detail.value
        }
        console.log(e.detail.value);
        this.setData({
            awardsName: e.detail.value,
            currentInfo: this.data.currentInfo
            
        })
        console.log(e.detail.value);
    },
    // 奖项级别的选择
    categoryChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardsCate = this.data.category[e.detail.value] || ""
        }
        this.setData({
            awardsCate: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },
    // 获奖等级的选择
    levelChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.awardsLevel = this.data.level[e.detail.value] || ""
        }
        this.setData({
            awardsLevel: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },
    // 获奖时间的选择
    DateChange(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.date = e.detail.value || ""
        }
        this.setData({
            date: e.detail.value,
            currentInfo: this.data.currentInfo
        })
    },

    // 奖项得分的获取
    inputMarks(e) {
        if(this.data.currentInfo) {
            this.data.currentInfo.marks = e.detail.value
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
            } else{
              this.setData({
                imgList: res.tempFilePaths
              })
            }
            // 当修改信息的时候
            if(this.data.currentInfo.imgSrc != 0) {
                this.data.currentInfo.imgSrc = this.data.currentInfo.imgSrc.concat(res.tempFilePaths)
                this.setData({
                    currentInfo: this.data.currentInfo
                })
            }else if(this.data.currentInfo.imgSrc == 0){
                this.data.currentInfo.imgSrc = res.tempFilePaths
                this.setData({
                    currentInfo: this.data.currentInfo
                })
            }
          }
        });
      },
    // 预览图片 
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.currentInfo ? this.data.currentInfo.imgSrc : this.data.imgList,
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
    //  提交信息
    submit() {
        var that = this
        // 创建一个对象，存储用户填入的信息
        let info = {
            awardsName: this.data.awardsName,
            awardsCate: this.data.category[this.data.awardsCate],
            awardsLevel: this.data.level[this.data.awardsLevel],
            date: this.data.date,
            marks: this.data.marks,
            imgSrc: this.data.imgList
        }
        // console.log(info);
        // 进行表单验证，不允许有未填项
        // if(that.data.marks == "" || that.data.awardsName == "" || that.data.awardsCate == "" ||that.data.awardsLevel == "" || that.data.imgSrc == "") {
        //     wx.showToast({
        //         title: '有信息未填',
        //         icon: 'error',
        //         duration: 2000
        //     })
        // }
        // 判断是新填写信息还是修改信息
        if(this.data.currentInfo == 0) {
            // 如果所有信息填写完毕，则将其存入缓存， 再显示提示信息，再跳转页面
            // 将新添加的数据放入缓存的奖项数组里
            that.data.infoList.push(info)
            // console.log(that.data.infoList);
            that.setData({
                infoList: that.data.infoList
            })
            // console.log(that.data.infoList);
            // 将信息存入缓存
            wx.setStorage({
                key: "infoList",
                data: that.data.infoList,
            })
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
            })
            // 进行页面跳转
            wx.navigateTo({
                url: '/components/refreshTo/index/stu-capacity/career/career?category='+"综测成绩",
            })
        }else {
            // 修改信息后，点击提交
            var that = this
            wx.getStorage({
                key: 'infoList',
                success(res) {
                    // console.log(res);
                    that.data.infoList = res.data
                    // 将缓存中该条信息替换成，修改后的信息
                    that.data.infoList[that.data.infoIndex] = that.data.currentInfo 
                    // 进行数据更新
                    that.setData({
                        infoList: that.data.infoList
                    })
                }
            })
            // console.log(this.data.infoList);
            // 再重新设置缓存
            wx.setStorage({
                key: "infoList",
                data: that.data.infoList,
            })
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
            })
        }
    }
})