// pages/actualPage/scheduleCard/index.js
import {
    getCurrWeekList,
    formateDate
  } from '../../../../../utils/tools'
  Page({
    data: {
      currentWeek: 10,
      time: {
        // 左侧的时间
        // 上午
        one: [
            {
                index: 1,
                timeStart: '08:00',
                timeEnd: '08:45'
            },
            {
                index: 2,
                timeStart: '08:55',
                timeEnd: '09:40'
            },
            {
                index: 3,
                timeStart: '10:05',
                timeEnd: '10:45'
            },
            {
                index: 4,
                timeStart: '11:00',
                timeEnd: '11:45'
            }
        ],
        // 下午
        two: [
            {
                index: 5,
                timeStart: '14:00',
                timeEnd: '14:45'
            },
            {
                index: 6,
                timeStart: '14:55',
                timeEnd: '15:40'
            },
            {
                index: 7,
                timeStart: '16:05',
                timeEnd: '16:50'
            },
            {
                index: 8,
                timeStart: '17:00',
                timeEnd: '17:45'
            }
        ],
        // 晚上
        three: [
            {
                index: 9,
                timeStart: '19:00',
                timeEnd: '19:45'
            },
            {
                index: 10,
                timeStart: '19:55',
                timeEnd: '20:40'
            },
            {
                index: 11,
                timeStart: '20:50',
                timeEnd: '21:35'
            },
            {
                index: 12,
                timeStart: '21:45',
                timeEnd: '22:30'
            }
        ]
      },
      schedule: {
        one: [
            {
                sub: '编译原理',
                add: '1202',
                tec: "郑玲",
                color: '#6699CC',
                type: 1, //0-无  1-有
            },
            {
               sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            }, 
            {
                sub: '操作系统',
                add: 'T706',
                tec: "赵思雨",
                color: '#FF9999',
                type: 1,
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            },
            {
                sub: '计算机网络',
                add: '1310',
                tec: "罗小波",
                color: '#99CC66',
                type: 1,
            },      
        ], 
        two: [
            {
                sub: '编译原理',
                add: 'T612',
                tec: "郑玲",
                color: '#66CCCC',
                type: 0, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            }, 
            {
                sub: '离散数学',
                add: '7302',
                tec: "陈本菊",
                color: '#FFCC33',
                type: 1, //0-无  1-有
            },
            {
                sub: '职场关键能力',
                add: '4209',
                tec: "周微",
                color: '#99CCCC',
                type: 1, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            } 
        ],
        three: [
            {
                sub: '形势与政策',
                add: '1406',
                tec: "唐菊相",
                color: '#FF6666',
                type: 1, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            }, 
            {
                sub: '操作系统',
                add: '1210',
                tec: "赵思雨",
                color: '#333399',
                type: 1,
            },
            {
                sub: '云计算与大数据',
                add: '1312',
                tec: "钟荣航",
                color: '#0066CC',
                type: 1, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            } 
        ],
        four: [
            {
                sub: 'IT英语',
                add: '7407',
                tec: "谢光娇",
                color: '#CC0066',
                type: 1, //0-无  1-有
            },
            {
                sub: '人机交互',
                add: 'T702',
                tec: "粱陶",
                color: '#99CC33',
                type: 1, //0-无  1-有
            }, 
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            },
            {
                sub: '智能手机设计',
                add: '7210',
                tec: "王尉",
                color: '#fad0c4',
                type: 1, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            } 
        ],
        five: [
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            }, 
            {
                sub: '离散数学',
                add: '7312',
                tec: "陈本菊",
                color: '#FF9933',
                type: 1,
            },
            {
                sub: '编译原理',
                add: 'T610',
                tec: "xxx",
                color: '#FFCC99',
                type: 1, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            } 
        ],
        six: [
            {
                sub: '幸福课',
                add: '1203',
                tec: "郑玲玲",
                color: '#669999',
                type: 0, //0-无  1-有
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            }, 
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            },
            {
                sub: '',
                add: '',
                tec: "",
                color: '',
                type: 0,
            } 
        ]
      },
      weekList: [],
      isShow: false,
      current: {},
    },
    getDetail(e) {
      let {
        item
      } = e.currentTarget.dataset;
      console.log(item)
      this.setData({
        current: item,
        isShow: true
      })
    },
    close() {
      this.setData({
        isShow: false
      })
    },
    onShow() {
      let time = new Date(),
        list = getCurrWeekList(time),
        weekList = []
      list.forEach(item => {
        weekList.push({
          day: [item.split('-')[1], item.split('-')[2]].join('-'),
          week: "星期" + "日一二三四五六".charAt((new Date(item)).getDay()),
          isCurr: formateDate(time) == item
        })
      });
      this.setData({
        weekList,
      })
    },
  })