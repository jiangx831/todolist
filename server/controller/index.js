const user = require('./user');
const list = require('./list');

function attachRouter(router) {
  //login.vue
  router.post('/user', user.login);
  //list.vue
  router.get('/todolist', list.getList);
  router.post('/addTodoList', list.addTodoItem);
  router.post('/deleteTodo', list.delTodoItem);
  router.post('/updataList', list.updateItem);
}
module.exports = {
  attachRouter
}
