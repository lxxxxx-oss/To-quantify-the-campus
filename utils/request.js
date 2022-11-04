// 封装request方法
// 固定前缀
const baseUrlOne = 'http://study.redrock.team/api'
const baseUrlTwo = 'https://alaskaboo.cn'

// 请求方法其一 ---> 访问共青团的接口，获取学院和专业信息
function requestOne(params = { methods, url, data }) {
    return  new Promise(function (resolve,reject) {
        wx.request({
            url: baseUrlOne + params.url,
            method: params.method,
            data: params.data ? JSON.stringify(params.data) : null,
            header: { 
                'Content-Type': 'application/json',
                'accessToken': ''
            },
            timeout: 5000,
            success(res) { 
                if(res) {
                    resolve(res.data);
                }
            },
            fail (err) {
                reject(err)
            }
        })
    })
}
// 请求方法其二 ---> 访问后端接口
function requestTwo(params = { methods, url, data}) {
  return  new Promise(function (resolve,reject) {
      wx.request({
          url: baseUrlTwo + params.url,
          method: params.method,
          data: params.data ? JSON.stringify(params.data) : null,
          header: { 
              'Content-Type': 'application/json'
          },
          timeout: 5000,
          success(res) { 
              if(res) {
                  resolve(res.data);
              }
          },
          fail (err) {
              reject(err)
          }
      })
  })
}
//把方法暴露出去
module.exports = {
    requestOne: requestOne,
    requestTwo: requestTwo
}

   
