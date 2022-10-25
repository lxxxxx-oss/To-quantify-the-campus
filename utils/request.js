// 封装request方法
var app = getApp();
// 固定前缀
const baseURL = 'http://study.redrock.team/api'

// 请求方法
const request = function (url, options) {
    // Promise风格的请求方法
    return new Promise ((resolve, reject) => {
        wx.request({
            // 请求地址
            url: baseURL + url,
            method: options.method,
            data: options.method=="GET"?options.data:JSON.stringify(options.data),
            // 默认的请求头
            header: {
                'content-type': 'application/json'
            },

            // 请求成功与否
            success: (res) => {
                if (res.data.code == 500) {
                    Toast(res.data);
                } else {
                    resolve(res.data)
                }
              },
            fail: (err) => {
                reject(err)
            }
        })
    })
};

// 请求方法
//get请求
const get= (url, options = {})=>{
    return request(url,{method:'GET' , data:options})
};
//post请求
const post= (url, options = {})=>{
   return request(url,{method:'POST' , data:options})
};
//put请求
const put= (url, options = {})=>{
   return request(url,{method:'PUT' , data:options})
};
//DELETE请求
const remove= (url, options = {})=>{
   return request(url,{method:'DELETE' , data:options})
};
//把方法暴露出去
module.exports = {
   request, 
   get,
   post,
   put,
   remove
}
   
