// 使用请求方法的封装
const {requestOne, requestTwo} = require("../../../../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否展示
        isShow: false,
        isShowFaculty: false,
        isShowMajor: false,
        // 选择的专业信息
        changeMajor:"",
        // 是否展示班级信息
        isShowclass: false,
        // 学院信息
        faculty: [],
        // 选择学院信息
        changeFaculty: "",
        // 专业
        major: [],
        // 班级信息
        classInform: "",
        classNum: ""
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
            let that = this
            // console.log(res.data.list);
            res.data.list.forEach(e => {
                that.data.faculty.push(e)
                that.setData({
                    faculty: that.data.faculty,
                })
            })
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
            // console.log(that.data.major);
        }).catch((err) => {
            console.log(err);
        })

    },

    // 展示列表
    spread() {
        this.setData({
            isShow: !this.data.isShow,
            isShowFaculty: !this.data.isShisShowFacultyowMajor
        })
        // console.log(this.data.isShow);
    },

    // 点击选择专业
    changeMajor(e) {
        let that = this
        // 存储索引值
        let index = e.currentTarget.dataset.index
        // 存储学院id
        let changeId = e.detail.value
        this.data.faculty.checked = true
        wx.showToast({
            title: '选择学院成功',
            icon: 'success',
            success(res) {
                return requestOne({
                    url: `/user/leagueList?id=${changeId}`, 
                    method: 'GET'
                }).then((res) => {
                    console.log(res);
                    that.setData({
                        major: res.data.list,
                        changeFaculty: that.data.faculty[index].name,
                        isShowFaculty: !that.data.isShowFaculty,
                        isShowMajor: !that.data.isShowMajor
                    })
                })
            }
        },2000)
    },

    // 选择专业
    showMajor(e) {
        this.setData({
            currentMajor: e.currentTarget.dataset.id,
            changeMajor: e.detail.value,
            isShow: !this.data.isShow
        })
    },

    // 点击添加班级，展示班级列表
    showClass() {
        let that = this
        return requestOne({
            url: `/user/leagueList?id=${this.data.currentMajor}`, 
            method: 'GET'
        }).then((res) => {
            console.log(res);
            let classList = res.data.list.splice(47, 20)
            that.setData({
                classInform: classList,
                isShowclass: !this.data.isShowclass,
            })
        })
    },
    // 选择班级信息并展示
    changeClass(e) {
         let that = this
         let index = e.currentTarget.dataset.index
         that.setData({
             classNum: that.data.classInform[index].name
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