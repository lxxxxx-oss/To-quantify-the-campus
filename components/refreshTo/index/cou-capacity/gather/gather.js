// components/refreshTo/index/stu-capacity/career/career.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        punchCondition: [
            {
                "className": "软工十班",
                "status": false,
                "unfinishName": "无",
                "classId": "42001"
            },
            {
                "className": "软工九班",
                "status": false,
                "unfinishName": "...",
                "classId": "42000"
            },
            {
                "className": "软工八班",
                "status": true,
                "unfinishName": "无",
                "classId": "41999"
            },
            {
                "className": "软工七班",
                "status": true,
                "unfinishName": "无",
                "classId": "41998"
            },
            {
                "className": "软工六班",
                "status": false,
                "unfinishName": "...",
                "classId": "41997"
            },
            {
                "className": "软工五班",
                "status": true,
                "unfinishName": "无",
                "classId": "41996"
            },
            {
                "className": "软工四班",
                "status": true,
                "unfinishName": "无",
                "classId": "41995"
            },
            {
                "className": "软工三班",
                "status": true,
                "unfinishName": "无",
                "classId": "41994"
            },
            {
                "className": "软工二班",
                "status": true,
                "unfinishName": "无",
                "classId": "41993"
            },
            {
                "className": "软工一班",
                "status": true,
                "unfinishName": "无",
                "classId": "41992"
            },
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 打卡详情页面
        punchDetail(e) {
            // 存储点击的索引值
            let index = e.currentTarget.dataset.index
            wx.navigateTo({
                // 导航并传值
                url: './gatherDetail/gatherDetail?name='+this.data.punchCondition[index].className+"&unfinishName="+this.data.punchCondition[index].unfinishName+"&status="+this.data.punchCondition[index].status+"&classId="+this.data.punchCondition[index].classId
            })
            // console.log(e.currentTarget.dataset.index);
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("下拉刷新");
        wx.showNavigationBarLoading() //在标题栏中显示加载
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log("上拉加载");
    },
})
