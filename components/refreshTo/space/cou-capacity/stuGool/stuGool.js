Page({
    data: {
        TabCur: 0,
        scrollLeft:0,
        category: ['逃课', '未归', '违纪'],
        className: [
            {
                "name": "软工一班"
            },
            {
                "name": "软工二班"
            },
            {
                "name": "软工三班"
            },
            {
                "name": "软工四班"
            },
            {
                "name": "软工五班"
            },
            {
                "name": "软工六班"
            },
            {
                "name": "软工七班"
            },
            {
                "name": "软工八班"
            },
            {
                "name": "软工九班"
            },
            {
                "name": "软工十班"
            }
        ]
    },

    // 切换类别
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },

    // 点击查看详情
    detailInfo(e) {
        // console.log(e.currentTarget.dataset.index);
        // 存储索引值
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
          url: './detailInfo/detailInfo?className='+this.data.className[index].name,
        })
    }
  })