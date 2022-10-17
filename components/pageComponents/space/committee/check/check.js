// components/pageComponents/space/committee/check/check.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: false,
        img: [
            {
                id: "1",
                name: "黎鑫",
                date: "10.16",
                imgAddress: "https://ts1.cn.mm.bing.net/th/id/R-C.fe42105888c490565324edbfd2379c9d?rik=%2bYB7q3RNRX5UpA&riu=http%3a%2f%2fimg2.woyaogexing.com%2f2017%2f06%2f12%2f8cbf7f087169e5cd!400x400_big.jpg&ehk=3IUU%2bYzI6Bdi%2f6tkPrkcVXz7XNHSCJ6WQ1%2b%2fUlZ0xhg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "2",
                name: "小黎",
                date: "10.17",
                imgAddress: "https://tse1-mm.cn.bing.net/th/id/OIP-C.O4SuhdbPxEKO3lwPHYGa6wHaHa?pid=ImgDet&rs=1",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "3",
                name: "徐徐",
                date: "10.17",
                imgAddress: "https://img2.woyaogexing.com/2021/07/10/e6b498d9290846ff89d4099cbe58ac23!400x400.jpeg",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "4",
                name: "小咪渣",
                date: "10.17",
                imgAddress: "https://ts1.cn.mm.bing.net/th/id/R-C.5ddba4a46aeec0161d5e9d2cf38c9488?rik=OF563HL%2bHRo%2f9w&riu=http%3a%2f%2fgx8899.com%2fuploads%2fallimg%2f2016062422%2fdzb5yhpc425.jpg&ehk=%2frI8Xr0aCf3OAO5qyShYzakMcr6Jv5zR%2bf4mGW2Sqn8%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "5",
                name: "小小黎",
                date: "10.17",
                imgAddress: "https://tse1-mm.cn.bing.net/th/id/OIP-C.aFj1Ndzyo-Sy893hVnQCggAAAA?pid=ImgDet&rs=1",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "6",
                name: "小小徐",
                date: "10.17",
                imgAddress: "https://ts1.cn.mm.bing.net/th/id/R-C.cc44b97c442b0e6b1d7f4b83a3ec6daa?rik=tnF7uD3S15do1Q&riu=http%3a%2f%2fimage.qianye88.com%2fpic%2fcd32488cc9a34ef731fa810a834dcebd&ehk=MGF4m412XUOtH%2fd%2fWXifY2dMD8y4P9nQRxoTZ8dvANk%3d&risl=&pid=ImgRaw&r=0",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
            
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

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
    
    // 点击实现图片放大
    preview(e) {
        // 存储索引值
        let index = e.currentTarget.dataset.index

        // console.log(event.currentTarget.dataset.src)
        this.data.img[index].imgAddress = e.currentTarget.dataset.src
        let url = this.data.img[index].imgAddress

        // 将数组对象中的图片地址，单独拿出来存到一个新数组
        let arr = [];
        this.data.img.forEach(e => { 
            arr.push(e.imgAddress)
        })
        // 更新数组
        this.setData({
            img: this.data.img
        })

        wx.previewImage({
            current: url,
            urls: arr
        })
      }
})

