import * as echarts from '../../../../../ec-canvas/echarts'
const formateDate = require("../../../../../utils/tools")
const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#BF0000', '#3E74CD'],
    legend: {
      bottom: '3%',
      left: 'center'
    },
    series: [{
      label: {
        normal: {
          fontSize: 18
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['30%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        label: {
          formatter: '{b}\n{c}度',
          show: true,
          fontSize: '25',
          fontWeight: 'bold'
        }
      },
      data: [{
        value: 75,
        name: '已用'
      }, {
        value: 25,
        name: '余额'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
    onShareAppMessage: function (res) {
    return {
        title: 'ECharts 可以在微信小程序中使用啦！',
        path: '/pages/index/index',
        success: function () { },
        fail: function () { }
    }
    },
    data: {
        ec: {
            onInit: initChart
        },
        date: "2022.10.21"
    },

    onLoad() {
        // 格式化时间
        let time = new Date()
        let year = time.getFullYear();
        let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
        let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
        this.setData({
            date: year + '.' + month + '.' + day
        })
    }
});
