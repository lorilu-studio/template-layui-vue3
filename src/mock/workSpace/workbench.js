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



// 获取任务列表
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

// 获取本月目标完成数据
const getTargetInfo =  (req, res)=> {
    return {
        code: 200,
        data: Mock.mock(
            {
                'all': 1000,
                'finish|700-1000': 1000
            }
        )
    }
}

//获取项目列表
const getMyProject = (req, res) => {
    return {
        code: 200,
        data: [
            {name: '项目1', startTime: '2022-01-01', endTime: '2022-02-01', status: 1, progress: 100},
            {name: '项目2', startTime: '2022-02-01', endTime: '2022-02-10', status: 2, progress: 0},
            {name: '项目3', startTime: '2022-02-10', endTime: '2022-02-20', status: 3, progress: 20},
            {name: '项目4', startTime: '2022-02-20', endTime: '2022-02-28', status: 4, progress: 33},
            {name: '项目5', startTime: '2022-03-01', endTime: '2022-03-05', status: 2, progress: 48},
            {name: '项目6', startTime: '2022-03-05', endTime: '2022-03-15', status: 2, progress: 69},
            {name: '项目7', startTime: '2022-03-15', endTime: '2022-04-01', status: 3, progress: 19},
            {name: '项目8', startTime: '2022-04-01', endTime: '2022-04-15', status: 1, progress: 100},
            {name: '项目9', startTime: '2022-04-15', endTime: '2022-05-01', status: 4, progress: 15},
            {name: '项目10', startTime: '2022-05-07', endTime: '2022-06-01', status: 1, progress: 100},
    
        ]
    };
}

export default{
    getDynamicList,
    getStatisticsInfo,
    getMyTask,
    getTargetInfo,
    getMyProject
}