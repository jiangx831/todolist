const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./server/controller/index.js')
const app = new Koa();

controller.attachRouter(router);

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
    console.log('koa is listening in 3000');
});


