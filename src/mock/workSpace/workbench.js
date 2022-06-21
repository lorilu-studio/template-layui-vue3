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

let dynamicList = [];
for(let i = 0; i < 20; i++) {
    dynamicList.push(Mock.mock({
        id: '@increment',
        name: '@cname',
        title: '@ctitle(5)',
        status: '@integer(1, 3)',
        type: '@integer(1, 2)',
        time: '@time("HH:mm")'
    }))
}
// 获取动态列表
const getDynamicList = (req, res)=> {
    
    console.log(req)
    return {
        code: 200,
        data: dynamicList
    }
}

export default{
    getDynamicList,
    getStatisticsInfo
}