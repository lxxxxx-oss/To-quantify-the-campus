Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    lifetimes: {
        attached(options) {
            console.log(options);
            let that = this
            this.getFileInfo()
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        // 学生上传的文件列表
        fileInfo: []
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
                    "school": "重庆移通学院",
	                "clazzNum": "02132208"
                },

                success(res) {
                    console.log(res.data.data.clazzList);
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
    }
})
