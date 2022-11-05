Page({
    data: {
        dormEmpty: [
            {
                "doors": "201",
                "status": false,
                "empty": [1,3,5],
                "emptyCount": ""
            },
            {
                "doors": "202",
                "status": false,
                "empty": [4],
                "emptyCount": ""
            },
            {
                "doors": "203",
                "status": false,
                "empty": [3,5],
                "emptyCount": ""
            },
            {
                "doors": "204",
                "status": false,
                "empty": [4],
                "emptyCount": ""
            },
            {
                "doors": "205",
                "status": false,
                "empty": [3,6],
                "emptyCount": ""
            },
            {
                "doors": "206",
                "status": false,
                "empty": [2,3],
                "emptyCount": ""
            },
            {
                "doors": "207",
                "status": false,
                "empty": [4,6],
                "emptyCount": ""
            },
            {
                "doors": "208",
                "status": false,
                "empty": [2],
                "emptyCount": ""
            },
            {
                "doors": "405",
                "status": false,
                "empty": [3,6],
                "emptyCount": ""
            },
            {
                "doors": "416",
                "status": false,
                "empty": [5,6],
                "emptyCount": ""
            },
            {
                "doors": "507",
                "status": false,
                "empty": [1,4],
                "emptyCount": ""
            },
            {
                "doors": "608",
                "status": false,
                "empty": [2],
                "emptyCount": ""
            },
            {
                "doors": "609",
                "status": false,
                "empty": [3],
                "emptyCount": ""
            },
            {
                "doors": "613",
                "status": false,
                "empty": [4,5,6],
                "emptyCount": ""
            },
            {
                "doors": "702",
                "status": false,
                "empty": [1],
                "emptyCount": ""
            },
        ]
    },
    onLoad() {
        this.data.dormEmpty.forEach(e => {
            if(e.empty == "") {
                e.status = true
            }else {
                // 如果有空位，计算空位的数量
                e.emptyCount = e.empty.length
            }
            this.setData({
                dormEmpty: this.data.dormEmpty
            })
        })
    }
})