
const mysql  = require('mysql');

const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123457',
  port: '3306',
  database: 'todolist',
});

connection.connect();

const  userGetSql = 'SELECT * FROM user';
//查
const result = connection.query(userGetSql, function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    return result;
});

connection.end();
module.exports = result;
