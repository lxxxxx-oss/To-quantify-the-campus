const {requestTwo} = require("../../../../../utils/request")
Page({
    data: {
        // 单选
        radioOne: ["安静", "热闹"],
        radioTwo: ["晚睡", "早睡"],
        radioThree: ["睡觉时间固定", "睡觉时间不固定"],
        radioFour: ["睡眠质量好", "睡眠质量不好"],
        radioFive: ["外向", "内向"],
        selectOne: "",
        selectTwo: "",
        selectThree: "",
        selectFour: "",
        selectFive: "",
        // 多选
        hobbyList: [],
        hobbies:[
            {id: "1", hobbyName: "听歌", isSelect: false},
            {id: "2", hobbyName: "拍摄", isSelect: false},
            {id: "3", hobbyName: "看书", isSelect: false},
            {id: "4", hobbyName: "运动", isSelect: false},
            {id: "5", hobbyName: "游戏", isSelect: false},
            {id: "6", hobbyName: "看电影", isSelect: false},
            {id: "7", hobbyName: "交友", isSelect: false},
            {id: "8", hobbyName: "旅游", isSelect: false},
            {id: "9", hobbyName: "钓鱼", isSelect: false},
            {id: "10", hobbyName: "辩论", isSelect: false},
            {id: "11", hobbyName: "历史", isSelect: false},
            {id: "12", hobbyName: "探险", isSelect: false},
        ]

    },

    // 单选
    tagChangeOne(e) {
        this.setData({
            selectOne: e.detail.value
        })
    },
    tagChangeTwo(e) {
        this.setData({
            selectTwo: e.detail.value
        })
    },
    tagChangeThree(e) {
        this.setData({
            selectThree: e.detail.value
        })
    },
    tagChangeFour(e) {
        this.setData({
            selectFour: e.detail.value
        })
    },
    tagChangeFive(e) {
        this.setData({
            selectFive: e.detail.value
        })
    },

    // 多选
    selectApply:function(e){
        var index = e.currentTarget.dataset.index;
        var item = this.data.hobbies[index];
        item.isSelect = !item.isSelect;
        this.setData({
            hobbies: this.data.hobbies,
        });
    },

    // 提交按钮
    submitBtn() {
        // 获取选中的兴趣
        this.data.hobbies.forEach(e => {
            if(e.isSelect) {
                // console.log(e.hobbyName);
                this.data.hobbyList.push(e.hobbyName)
            }
        })
        this.setData({
            hobbyList: this.data.hobbyList
        })
        let infoArr = [
            this.data.radioOne[this.data.selectOne]?this.data.radioOne[this.data.selectOne] : "",
            this.data.radioTwo[this.data.selectTwo]?this.data.radioTwo[this.data.selectTwo] : "",
            this.data.radioThree[this.data.selectThree]?this.data.radioThree[this.data.selectThree] : "",
            this.data.radioFour[this.data.selectFour]?this.data.radioFour[this.data.selectFour] : "",
            this.data.radioFive[this.data.selectFive]?this.data.radioFive[this.data.selectFive] : "",
            ...this.data.hobbyList
        ]
       
        console.log(infoArr);
        // 将学生选择的数据传入数据库，进行匹配
        wx.request({
            url: 'https://alaskaboo.cn/api/match',
            method: 'POST',
            header: {
                'content-type':'application/json',
            },
            data: infoArr,
            success(res) {
                console.log(res.data.data.match);
                let info = JSON.stringify(res.data.data.match)
                wx.showToast({
                    title: '提交成功',
                    icon: 'success'
                })
                // 跳转到匹配成功页面
                wx.navigateTo({
                    url: '../matchSuccess/matchSuccess?matchInfo='+info,
                })
            },
            fail(err) {
                console.log(err);
            }
        })
    }
    
})