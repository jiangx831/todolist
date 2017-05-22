const list = require('../models/list.js');

async function getList(ctx, next) {
    ctx.response.type = "application/json";
    ctx.response.body = await list.getListById(ctx.query.id);
}

async function addTodoItem(ctx, next) {
    const requestBody = ctx.request.body;
    await list.addTodoItem(requestBody.id, requestBody.content);
    //todo 判断是否添加成功
    ctx.response.type = "application/json";
    ctx.response.body = {
        'code': true,
        'errMsg': ''
    }
}

async function delTodoItem(ctx, next) {
    const requestBody = ctx.request.body;
    await list.delTodoItem(requestBody.userId, requestBody.id);
    //todo 判断是否删除成功
    ctx.response.type = "application/json";
    ctx.response.body = {
        'code': true,
        'errMsg': ''
    }
}

async function updateItem(ctx, next) {
    const requestBody = ctx.request.body;
    await list.updateItem(requestBody.userId, requestBody.id, requestBody.status);
    //todo 判断是否删除成功
    ctx.response.type = "application/json";
    ctx.response.body = {
        'code': true,
        'errMsg': ''
    }
}

module.exports = {
  getList,
  addTodoItem,
  delTodoItem,
  updateItem
}
