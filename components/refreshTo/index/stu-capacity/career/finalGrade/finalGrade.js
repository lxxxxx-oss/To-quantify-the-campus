
Page({
    lifetimes: {
        attached: function() {
            console.log(111);
        },
        detached: function() {
          // 在组件实例被从页面节点树移除时执行
        },
      },
    
    /**
     * 组件的初始数据
     */
    data: {
        gradeInfo: [
            {
                "courseName": ["羽毛球", "从小说到电影", "大学英语","算法综合设计", "人工智能基础", "概率论与数理统计", "马克思主义基本原理", "投融资管理", "形势与政策"],
                "grade": ["78", "85", "94", "88", "78", "95", "85", "94", "88"],
                "credit": ["1.0", "2.0", "3.0", "3.5", "2.0", "4.0", "3.0", "3.5", "2.0"],
                "point": ["2.20", "3.50", "3.60", "2.20", "2.0", "3.60", "3.50", "3.60", "2.20"],
                "category": ["必修", "必修", "必修", "必修", "必修", "必修", "必修", "选修", "必修"]
            }
        ]

    },

    /**
     * 组件的方法列表
     */
    methods: {}
})
