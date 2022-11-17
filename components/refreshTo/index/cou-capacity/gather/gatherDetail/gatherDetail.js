// components/pageComponents/index/counselor/punch-detail/punch-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 显示和隐藏
        isShow: false,
        // 存储传递过来的值
        name: "",
        unfinishName: "",
        status: "",
        classId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        
        // 根据传递过来的值，动态决定页面标题
        wx.setNavigationBarTitle({
            title: options.name
        })

        // 由于传值过来的都是字符串，所以前一个页面的true或false不能直接使用，类型转换过来也不行，只能进行一个判断
        if(options.unfinishName != '无') {
            this.data.status = false
        }else this.data.status = true

        // 将字符串切割为数组，原因如上
        let arr = options.unfinishName.split(",")
        // console.log(arr);

        // 存储传递过来的值
        this.setData({
            name: options.name,
            unfinishName: arr,
            status: this.data.status,
            classId: options.classId
        })
        // console.log(this.data.name);
        // console.log(typeof(this.data.unfinishName));
    },
    // 点击切换功能选项卡
    // 打卡功能
    punchItem() {
        // 点击则显示该选项卡的内容
        
        this.setData({
            isShow:false
        })
    },
    // 文件收集功能
    fileItem() {
        this.setData({
            isShow: true
        })
    }

})