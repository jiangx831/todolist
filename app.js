const Koa = require('koa');
const router = require('koa-router')();
// const auth = require('./server/controller/user');
const bodyParser = require('koa-bodyparser');
const list = require('./data');
const app = new Koa();


const auth = require('./server/router/index.js');
const user = require('./server/models/user.js');
app.use(async (ctx, next) => {
    // ctx.response.type = "text/html";
    // ctx.response.body = "登录成功";
    await next();
    // console.log(ctx.method);
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
    // console.log(ctx.request.path);

    // if(ctx.request.path === '/api/activity/detail'){
    //   console.log(data);
    //   ctx.response.type = 'text/html';
    //   ctx.response.body = '<h1>Hello, koa2!</h1>';
    // }
});
// app.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.post('/user', (ctx, next) => {
  const requestBody = ctx.request.body;
  // console.log(requestBody);
  const a = user.getUserById('jiangx');
  console.log(a);
  if(requestBody.account === '123' && requestBody.password === '123'){
    ctx.response.type = "text/html";
    ctx.response.body = {
      'code': true,
      'errMsg': ''
    };
  }
});
router.get('/todolist', (ctx, next) => {
    ctx.response.type = "application/json";
    ctx.response.body = list;
});
// router.get('/todolist', async (ctx, next) => {
//     // const name = ctx.params.name;
//     // console.log(name);
//     ctx.response.body = `<h1>Hello, ${123}</h1>`;
// });
// router.get('/', (ctx, next) => {
//   ctx.response.type = 'text/html';
//   ctx.response.body = `
//   <form method='post' action='/sign'>
//   用户名：<input type="text" name="user"/><br/>
//   密码：<input type="text" name="psd"/>
//   <button type="submit">登陆</button>
//   </form>`;
// });
// router.post('/sign', (ctx, next) => {
//   const requestBody = ctx.request.body;
//   if(requestBody.user === "jiangx" && requestBody.psd === '123456'){
//     ctx.response.body = `<h1>Welcome, ${requestBody.user}!</h1>`;
//   }else{
//     ctx.response.body = `<a href='/'>try again</a>`;

//   }
// })
app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
    console.log('koa is listening in 3000');
});
