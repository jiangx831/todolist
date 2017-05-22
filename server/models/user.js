// models/user.js
const db = require('../config/db.js'),
      userModel = '../schema/user.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。
//插入
// User.create({
//     user_name: '老杨',
//     password: '23445'
// });
// 查询
const getUserByName = async (name) => {
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  });
  return userInfo // 返回数据
}

module.exports = {
  getUserByName  // 导出getUserById的方法，将会在controller里调用
}
