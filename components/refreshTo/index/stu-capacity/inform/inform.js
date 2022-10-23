// components/refreshTo/index/stu-capacity/inform/inform.js
Page({
    onLoad() {
        console.log(111);
            // 判断身份
            const app =getApp();
            // 普通学生
            if(app.globalData.isCou){
                this.setData({
                    isCou: true
                })
            }; 
    },
    
    data: {
        isCou: "",
        DotStyle:"",
        cardCur: 0,
        activeList: [{
          id: 0,
          type: 'image',
          url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.90zJf336G8mhX44CfuVdfwHaE8?w=242&h=180&c=7&r=0&o=5&pid=1.7'
        }, 
        {
          id: 1,
            type: 'image',
            url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.HStrMCdVCUNEdadhXLZLFgHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
        },
        {
            id: 1,
              type: 'image',
              url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.LvliALh2Ba7MkmN8AXKa4wHaE6?w=243&h=180&c=7&r=0&o=5&pid=1.7',
        }],
        informList: [{
            id: 0,
            type: 'image',
            url: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.ycbUdGWUTdx9D4TqxhOcUAHaFG?w=204&h=140&c=7&r=0&o=5&pid=1.7'
          }, 
          {
            id: 1,
              type: 'image',
              url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.HStrMCdVCUNEdadhXLZLFgHaE7?w=242&h=180&c=7&r=0&o=5&pid=1.7',
          },
          {
              id: 1,
                type: 'image',
                url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.LvliALh2Ba7MkmN8AXKa4wHaE6?w=243&h=180&c=7&r=0&o=5&pid=1.7',
            },
    ]
    },

    // 点击实现活动图片放大
    previewActive(e) {
        // 拿到并存储索引值
        let index = e.currentTarget.dataset.index
        console.log(index);
        // console.log(event.currentTarget.dataset.src)
        this.data.activeList[index].url = e.currentTarget.dataset.src
        let url = this.data.activeList[index].url

        // 将数组对象中的图片地址，单独拿出来存到一个新数组
        let arr = [];
        this.data.activeList.forEach(e => { 
            arr.push(e.url)
        })
        // 更新数组
        this.setData({
            activeList: this.data.activeList
        })

        wx.previewImage({
            // urls 的第一张
            current: url,
            // 需要预览的图片链接列表
            urls: arr
        })
    },

    // 点击实现通知图片放大
    previewInform(e) {
        // 拿到并存储索引值
        let index = e.currentTarget.dataset.index
        console.log(index);
        // console.log(event.currentTarget.dataset.src)
        this.data.informList[index].url = e.currentTarget.dataset.src
        let url = this.data.informList[index].url
        // 将数组对象中的图片地址，单独拿出来存到一个新数组
        let arr = [];
        this.data.informList.forEach(e => { 
            arr.push(e.url)
        })
        // 更新数据
        this.setData({
            informList: this.data.informList
        })

        wx.previewImage({
            // urls 的第一张
            current: url,
            // 需要预览的图片链接列表
            urls: arr
        })
    },
    uploadImg() {
        const app = getApp()
        wx.chooseMedia({
            count: 1,
            // 从相册还是相机选择图片
            sourceType: ['album', 'camera'],

            success (res) {
                console.log(res.tempFiles[0].tempFilePath);
                // 将用户选择的图片的地址存储起来
                app.globalData.imgSrc = res.tempFiles[0].tempFilePath
            },
            fail (res) {
                console.log(res);
            }
        })
    },
    // 更新地址后刷新 
    refresh() {
        const app = getApp()
        // // 用之前存储的地址来替换轮播图展示的地址
        this.data.informList[0].url = app.globalData.imgSrc
        this.setData({
            informList: this.data.informList
        })
    }  
})
