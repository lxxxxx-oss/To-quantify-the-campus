// 引入封装请求
const {requestTwo} = require("../../../../../utils/request")

// 从数据库取数据
function getInfo() {
    return requestTwo({
        url: '/api/info/getAllInfo/1/10',
        method: 'GET',
        success(res) {
            console.log(res.data);
        }
    })
}

//把方法暴露出去
module.exports = {
    getInfo: getInfo
}