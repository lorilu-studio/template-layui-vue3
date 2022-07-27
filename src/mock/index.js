import Mock from'mockjs';
import login from './login';
import workbench from './workSpace/workbench';
import userInfo from './userInfo';



// 登陆接口------------------------------------------------------------
Mock.mock(/\/login/,'post',(req,res) =>{
    return login.getLogin(req,res)
});

// 获取用户信息
Mock.mock(/\/userInfo\/getUserInfo/,'post',(req,res) =>{
    return userInfo.getUserInfo(req,res)
});

// 工作空间接口---------------------------------------------------------
// 获取统计信息
Mock.mock(/\/workSpace\/workbench\/getStatisticsInfo/,'post',(req,res) =>{
    return workbench.getStatisticsInfo(req,res)
});
// 获取动态列表
Mock.mock(/\/workSpace\/workbench\/getDynamicList/,'post',(req,res) =>{
    return workbench.getDynamicList(req,res)
});

// 获取任务列表
Mock.mock(/\/workSpace\/workbench\/getMyTask/,'post',(req,res) =>{
    return workbench.getMyTask(req,res)
});

// 获取本月目标完成
Mock.mock(/\/workSpace\/workbench\/getTargetInfo/,'post',(req,res) =>{
    return workbench.getTargetInfo(req,res)
});

// 获取项目列表
Mock.mock(/\/workSpace\/workbench\/getMyProject/,'post',(req,res) =>{
    return workbench.getMyProject(req,res)
});

export default Mock;