const user = require('../models/user.js');

async function login(ctx, next){
  const requestBody = ctx.request.body;
  const userInfo = await user.getUserByName(requestBody.account);

  if(userInfo && userInfo.password === requestBody.password){
    ctx.response.type = "text/html";
    ctx.response.body = {
      'code': true,
      'data': {
        'id': userInfo.id
      },
      'errMsg': ''
    }
  } else {
    ctx.response.type = "application/json";
    ctx.response.body = {
      'code': false,
      'errMsg': '用户名或密码错误！'
    };
  }
}

module.exports = {
  login
}
