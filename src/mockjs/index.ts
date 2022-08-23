// @ts-ignore
import Mock from'mockjs';
import login from './login';
import user from './user';

Mock.mock(/\/login/,'post',(req: any,res: any) =>{
    return login.getLogin(req,res)
});

Mock.mock(/\/user\/getUser/,'post',(req: any,res: any) =>{
    return user.getUserInfo(req,res)
});

Mock.mock(/\/menu\/getMenus/,'post',(req: any,res: any) =>{
    return user.getUserInfo(req,res)
});

export default Mock;