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
        classNum: "",

        // 老师信息
        teacherInfo: '',
        // 管理的班级信息
        managerInfo: ''
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

        // 通过工号直接获取该老师管理的班级
        // 工号通过老师登录时，直接获取
        this.getTeacherInfo().then((res) => {
          console.log(res);
          this.setData({
            teacherInfo: res.data.teacherClazzList,
            managerInfo: res.data.teacherClazzList.clazzList
          })
        })

    },
    // 进入班级学生动向的详细页面,并传递数据
    gotoDetail() {
        wx.navigateTo({
          url: '/components/refreshTo/space/com-capacity/attendance/attendance'
        })
    },

    // 调取接口，请求数据
    getTeacherInfo() {
      return requestTwo({
        url: '/api/clazz/queryTeacherClazz/teacherAccount=2132009',
        method: 'GET',
      })
    }
})