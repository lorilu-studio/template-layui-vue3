
let userInfo = {
    'username': 'admin',
    'mail': 'admin@163.com',
    'remark': '这是简介',
    'avatar': 'http://www.layui-vue.com/assets/logo-png.a3bc5caf.png',
}


const getUserInfo = (req, res)=> {
    let item = JSON.parse(req.body);
    let token = item ? item.token : null;
    let permissionList = [
      
    ]
    if(item && token){
      return {
        'code': 200,
        'msg':'操作成功',
        'data': userInfo
      }
    }else{
      return {
        'code': 99998,
        'msg':'请重新登录'
      }
    }
}

export default{
  getUserInfo
}