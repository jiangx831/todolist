const auth = require('../controller/user.js');
const router = require('koa-router')();
router.get('/user/:id', auth.getUserInfo);
// router.get('/user/:id', (ctx, next) => {
//   ctx.response.type="text/html";
//   ctx.response.body="登录成功";
// }); // 定义url的参数是id,用user的auth方法引入router
// router.post('/user', auth.postUserAuth);

module.exports = router; // 把router规则暴露出去

