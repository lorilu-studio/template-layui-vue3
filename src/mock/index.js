import Mock from'mockjs';
import login from './login';
import workbench from './workSpace/workbench';


Mock.mock(/\/test\/test/, 'get', {
    id:123,
    token: 'dfaadfasdfawsdf',
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
});

// 登陆接口------------------------------------------------------------
Mock.mock(/\/login/,'post',(req,res) =>{
    return login.getLogin(req,res)
})

// 工作空间接口---------------------------------------------------------
Mock.mock(/\/workSpace\/workbench\/getDynamicList/,'post',(req,res) =>{
    return workbench.getDynamicList(req,res)
})

export default Mock;