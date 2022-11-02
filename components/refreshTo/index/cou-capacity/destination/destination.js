// 使用请求方法的封装
const {requestOne, requestTwo} = require("../../../../../utils/request")
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
        // 学院
        faculty: [],
        // 每个学院的id
        facultyId: [],
        // 专业
        major: [],
        // 班级信息
        classInform: "",
        num: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        //异步获取缓存,如果该用户信息已存在，则直接显示该用户信息，避免重复弹窗
        wx.getStorage({
            key:"userInfo",//本地缓存中指定的 key
            success:(res)=>{ 
            // console.log('获取缓存成功',res.data)      
                this.setData({
                    userInfo:res.data, //将得到的缓存给key             
                }) 
                fail:(err)=>{
                    console.log("获取失败",err);
                }                 
            }
        });

        // 获取全部学院
        this.getList().then((res) => {
            res.data.list.forEach(e => {
                that.data.faculty.push(e.name)
                that.data.facultyId.push(e.id)
                that.setData({
                    faculty: that.data.faculty,
                    facultyId: that.data.facultyId
                })
            })
            console.log(that.data.facultyId);
        }).catch((err) => {
            console.log(err);
        }),

        // 获取学院下属的专业
        this.getMajor().then((res) => {
            res.data.list.forEach(e => {
                that.data.major.push(e.name)
            })
            that.setData({
                major: that.data.major
            })
            console.log(that.data.major);
        }).catch((err) => {
            console.log(err);
        })

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
    },

    // 调取接口，请求数据
    getList() {
        return requestOne({
            url: '/user/leagueList?id=297', 
            method: 'GET'
        })
    },
    getMajor() {
        return requestOne({
            url: '/user/leagueList?id=40772', 
            method: 'GET'
        })
    }
    
})