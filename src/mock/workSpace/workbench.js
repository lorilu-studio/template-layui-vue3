import Mock from'mockjs';


// 获取统计数据
const getStatisticsInfo =  (req, res)=> {
    return {
        code: 200,
        data: {
            'projectCount': 3,
            'toDoCount': 24,
            'finishCount': 6,
            'msgCount': 2234
        }
    }
}


// 获取动态列表
const getDynamicList = (req, res)=> {
    
    console.log(req)
    return {
        code: 200,
        data: [
            {
                name: '张三',
                title: '点击登录报错',
                status: 1,
                type: 1,
                time: "18:30"
            },
            {
                name: '李四',
                title: '解决项目六的BUG',
                status: 2,
                type: 2,
                time: "17:10"
            },
            {
                name: '王五',
                title: '用户名显示undefined',
                status: 1,
                type: 1,
                time: "17:00"
            },
            {
                name: 'boss',
                title: '解决项目五的BUG',
                status: 2,
                type: 2,
                time: "16:50"
            },
            {
                name: 'boss',
                title: '解决项目四的BUG',
                status: 2,
                type: 2,
                time: "15:30"
            },
            {
                name: 'boss',
                title: '解决项目三的BUG',
                status: 2,
                type: 2,
                time: "14:50"
            },
            {
                name: 'boss',
                title: '解决项目二的BUG',
                status: 2,
                type: 2,
                time: "14:30"
            },
            {
                name: 'boss',
                title: '解决项目一的BUG',
                status: 2,
                type: 2,
                time: "13:33"
            },
        ]
    }
}


const getMyTask = (req, res) => {
    return {
        code: 200,
        data: [
            {
                'priority': 1,
                'name': '解决项目一的BUG',
                'status': 3,
            },
            {
                'priority': 2,
                'name': '解决项目二的BUG',
                'status': 3,
            },
            {
                'priority': 2,
                'name': '解决项目三的BUG',
                'status': 2,
            },
            {
                'priority': 3,
                'name': '解决项目四的BUG',
                'status': 1,
            },
            {
                'priority': 3,
                'name': '解决项目五的BUG',
                'status': 1,
            },
            {
                'priority': 3,
                'name': '解决项目六的BUG',
                'status': 1,
            },
            {
                'priority': 3,
                'name': '解决项目七的BUG',
                'status': 1,
            }
            
        ]
    }
}

export default{
    getDynamicList,
    getStatisticsInfo,
    getMyTask
}