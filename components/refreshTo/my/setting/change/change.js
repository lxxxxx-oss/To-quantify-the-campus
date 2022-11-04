const {requestTwo} = require("../../../../../utils/request.js")
Page({
    data: {
        // 更改后的密码
        changePassword: "",
        // 用户ID
        userId: ""
    },
    onLoad() {
        var that = this
        // 从缓存中读取用户Id
        wx.getStorage({
            key: 'userId',
            success(res) {
                console.log(res);
                that.setData({
                    userId: res.data
                })
                console.log(that.data.userId);
            }
        })

        // requestTwo({
        //     url: ''
        // })
    },

    // 修改后的密码
    changePassword(e) {
        console.log(e.detail);
        this.setData({
            changePassword: e.detail.value
        })
    },
    // 确认修改
    notarizeChange() {
        var that = this
        // 将修改后的信息上传至数据库
        if(that.data.changePassword != "") {
            requestTwo({
                url: '/api/user',
                method: 'PUT',
                data: {
                    // 根据用户的ID来更改密码
                    id: that.data.userId,
                    password: that.data.changePassword
                }
            }).then((res) => {
                wx.showToast({
                    title: '修改成功',
                    icon: 'success'
                })
            })
        }else {
            wx.showToast({
              title: '密码不能为空',
              icon: 'error'
            })
        }
    }
})