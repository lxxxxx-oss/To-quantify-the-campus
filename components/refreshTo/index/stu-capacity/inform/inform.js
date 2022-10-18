// components/refreshTo/index/stu-capacity/inform/inform.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        lifetimes: {
            attached: function() {
              // 在组件实例进入页面节点树时执行
              this.DotStyle()
            },
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
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

    /**
     * 组件的方法列表
     */
    methods: {
        // 更改轮播图提示点样式
        DotStyle(e) {
            this.setData({
              DotStyle: e.detail.value
            })
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
        }   
    }
})
