//初始化Sequelize和数据库的连接。
const Sequelize = require('sequelize'); // 引入sequelize
const Todolist = new Sequelize('mysql://root:123457@localhost/todolist',{
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {
  Todolist // 将Todolist暴露出接口方便Model调用
}
