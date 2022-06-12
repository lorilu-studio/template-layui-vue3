
const getLogin = (req, res)=> {
    let item = JSON.parse(req.body);
    let username = item.username;
    let password = item.password;
    if(username === 'admin' && password === '123456'){
      return {
        'code': 200,
        'msg':'登陆成功',
        'data':{
          'userId':'35002',
          'token':'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
        }
      }
    }else{
      return {
        'code': 500,
        'msg':'登陆失败,账号密码不正确'
      }
    }
}

export default{
    getLogin
}