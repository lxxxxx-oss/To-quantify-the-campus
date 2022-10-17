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
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "2",
                name: "蔡儿",
                date: "10.17",
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "3",
                name: "徐徐",
                date: "10.17",
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "4",
                name: "小咪渣",
                date: "10.17",
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "5",
                name: "小咪渣",
                date: "10.17",
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
                des: "未通过",
                status: false,
                iconPass: "/assets/img/space/com-icon/pass.png",
                iconFail: "/assets/img/space/com-icon/fail.png"
            },
            {
                id: "6",
                name: "小咪渣",
                date: "10.17",
                imgAddress: "https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132",
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

        this.data.img[index].status = true
        this.data.img[index].des = "已审核"
        this.data.img[index].iconFail = this.data.img[index].iconPass
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
         this.data.img[index].iconPass = this.data.img[index].iconFail
        // 调用setData方法使数据马上生效
         this.setData({
            img: this.data.img
        })
    }
})

