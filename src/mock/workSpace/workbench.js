



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
        data: '请求成功'
    }
}

export default{
    getDynamicList,
    getStatisticsInfo
}