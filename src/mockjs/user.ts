import { Result } from "../types/result";
import { User } from "../types/user";

let user: User = {
    'userId': '1992',
    'username': 'admin',
}

const getUserInfo = (req: any, res: any)=> {
    let item = JSON.parse(req.body);
    let token = item ? item.token : null;
    let result:Result = {
      code: 200,
      msg: "操作成功",
      data: user,
      success: true
    }
    if(item || token){
      result.code = 99998;
      result.msg = "请重新登录";
      result.success = false;
    }
    return result;
}

export default{
  getUserInfo
}