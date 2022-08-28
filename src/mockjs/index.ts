// @ts-ignore
import Mock from'mockjs';
import user from './user';

Mock.mock(/\/user\/login/,'post',(req: any,res: any) =>{
    return user.getLogin(req,res)
});

Mock.mock(/\/user\/info/,'post',(req: any,res: any) =>{
    return user.getInfo(req,res)
});

Mock.mock(/\/user\/menu/,'get',(req: any,res: any) =>{
    return user.getMenu(req,res)
});


export default Mock;