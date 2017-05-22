// models/user.js
const db = require('../config/db.js'),
      listModel = '../schema/list.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // Sequelize实例，引入数据库

const List = TodolistDb.import(listModel); // model实例，用sequelize的import方法引入表结构。

// 查询该用户所有list
const getListById = async (id) => {
  const userList = await List.findAll({
    where: {
      user_id: id
    }
  });
  return userList // 返回数据
}
const addTodoItem = async (id, content) => {
  const todoItem = await List.create({
    user_id: id,
    content: content,
    status: 0
  });
  return todoItem;
}
const delTodoItem = async (userId, id) => {
  await List.destroy({
    where: {
      id: id,
      user_id: userId
    }
  })
}
const updateItem = async (userId, id, status) => {
  await List.update({
    'status': status
  }, {
    where: {
      id: id,
      user_id: userId,
    }
  })
}
module.exports = {
  getListById,  // 导出getUserById的方法，将会在controller里调用
  addTodoItem,
  delTodoItem,
  updateItem
}
