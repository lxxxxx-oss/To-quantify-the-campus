// 使用请求方法的封装
const {request} = require("../../../../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否展示专业列表
        isShow: false,
        // 选择的专业信息
        changeMajor:"",
        // 是否展示班级信息
        isShowclass: false,
        major: [
            {
                "classify": "工学",
                "sub": ["电气工程及其自动化", "人工智能", "自动化", "信息安全", "软件工程"]
            },
            {
                "classify": "管理学",
                "sub": ["供应链管理", "工商管理", "财务管理", "工程管理", "大数据管理与应用"]
            },
            {
                "classify": "艺术性",
                "sub": ["动画", "广播电视编导", "数字媒体技术", "戏剧影视文学"]
            },
            {
                "classify": "文学",
                "sub": ["汉语", "英语", "德语"]
            },
            {
                "classify": "经济学",
                "sub": ["数字经济", "互联网金融"]
            }

        ],
        // 班级信息
        classInform: ["一班", "二班", "三班", "四班", "五班", "六班", "七班", "八班", "九班", "十班", "十一班", ],
        num: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //异步获取缓存,如果该用户信息已存在，则直接显示该用户信息，避免重复弹窗
        wx.getStorage({
            key:"userInfo",//本地缓存中指定的 key
            success:(res)=>{ 
            console.log('获取缓存成功',res.data)      
                this.setData({
                    userInfo:res.data, //将得到的缓存给key             
                }) 
                fail:(err)=>{
                    console.log("获取失败",err);
                }                 
            }
        })

        // 使用封装的请求方法，请求数据
        console.log(request('/user/leagueList', 'post'));
    },

    // 展示列表
    spread() {
        this.setData({
            isShow: !this.data.isShow
        })
        // console.log(this.data.isShow);
    },

    // 点击选择专业
    changeMajor(e) {
        // 存储索引值
        let index = e.currentTarget.dataset.index
        // 匹配数组中的数据
        let major = e.target.dataset.text[index]

        // 更新数据,并渲染
        this.setData({
            changeMajor: major
        })
    },

    // 点击添加班级，展示班级列表
    addClass() {
        // 匹配数组中的数据
        // let classNum = e.target.dataset.text[index]
        // 更改班级列表的状态
        this.setData({
            isShowclass: !this.data.isShowclass,
            // num: classNum
        })
    },

    // 选择班级信息并展示
    changeClass(e) {
        //  匹配数组中的数据
         let classNum = e.target.dataset.text
        //  console.log(classNum);
         // 更改班级列表的状态
         this.setData({
             num: classNum
         })
    },

    // 进入班级学生动向的详细页面,并传递数据
    gotoDetail() {
        wx.navigateTo({
          url: '/components/refreshTo/index/cou-capacity/des-item/des-item?major='+this.data.changeMajor+"&num="+this.data.num,
        })
    }
})