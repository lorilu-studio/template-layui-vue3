const dict = [
    "零",
    "壹",
    "贰",
    "弎",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖",
    "拾",
    "拾壹",
    "拾贰",
]

const dict2 = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
]

const weektozh = function (num: number){
    return dict2[num]
}

const numtozh = function (num: number){
    return dict[num];
}

export { numtozh, weektozh }