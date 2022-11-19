Component({
    options: {
      styleIsolation: 'apply-shared'
    },
    lifetimes: {
        attached(options) {
            this.getFileInfo()
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        // 学生上传的文件列表
        fileInfo: [],
        // 图片列表
        imgList: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 获取学生上传的文件信息
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
                    // console.log(res.data.data.clazzList);
                    res.data.data.clazzList.forEach(e => {
                        that.data.fileInfo = e.fileUploadList
                    })
                    that.setData({
                        fileInfo: that.data.fileInfo,
                        imgList: that.data.imgList
                    })
                    console.log(that.data.fileInfo);
                },
                fail(err) {
                    console.log(err);
                }
            });
        },

        // 预览图片
        viewImg(e) {
            let that = this
            that.data.fileInfo.forEach(e => {
              that.data.imgList.push(e.path)
            })
            // console.log(that.data.imgList);
            wx.previewImage({
                urls: that.data.imgList,
                current: that.data.imgList[e.currentTarget.dataset.index],
            })
        }
    }
})
