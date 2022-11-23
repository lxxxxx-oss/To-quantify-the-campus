const app =getApp();
Component({
  data: {
    selectedColor: "#468AFB",
    selected: 0,
    list: [],
    elselist: [
        {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "/assets/img/tabBar/index.png",
            "selectedIconPath": "/assets/img/tabBar/index-active.png"
        },
        {
            "pagePath": "pages/space/space",
            "text": "空间",
            "iconPath": "/assets/img/tabBar/space.png",
            "selectedIconPath": "/assets/img/tabBar/space-active.png",
            // "isSpecial": true
        },
        {
            "pagePath": "pages/home/home",
            "text": "我的",
            "iconPath": "/assets/img/tabBar/my.png",
            "selectedIconPath": "/assets/img/tabBar/my-active.png"
        }
    ],
    houList: [
        {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "/assets/img/tabBar/index.png",
            "selectedIconPath": "/assets/img/tabBar/index-active.png"
        },
        {
            "pagePath": "pages/print/print",
            "text": "打印",
            "iconPath": "/assets/img/tabBar/print.png",
            "selectedIconPath": "/assets/img/tabBar/print-active.png",
            // "isSpecial": true
        },
        {
            "pagePath": "pages/home/home",
            "text": "我的",
            "iconPath": "/assets/img/tabBar/my.png",
            "selectedIconPath": "/assets/img/tabBar/my-active.png"
        }
    ]
    
  },
    //组件的生命周期函数
    attached() {
        // console.log(app.globalData.isHou);
        app.globalData.isHou = true
        if(app.globalData.isHou) {
            this.setData({
                list: this.data.houList
            })
        }else if(app.globalData.isCom || app.globalData.isCou || app.globalData.isStu){
            this.setData({
                list: this.data.elselist
            })
        }
        
    },
  methods: {
    switchTab(event) {
        // data为接受到的参数
        const data = event.currentTarget.dataset;
        // 取出参数中的path作为路由跳转的目标地址
        console.log(data.path);
        wx.switchTab({url: data.path});
    },
  },
})