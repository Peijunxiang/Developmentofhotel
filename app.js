const express = require('express');
const app = express();
// 设置主机名
const hostName = '127.0.0.1';
// 设置端口
const port = 8000;
// 连接数据库
const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'hotel_db',
});
db.connect((error) => {
  if (!error) {
    console.log('数据库连接成功了~~~');
  } else {
    throw (error);
  }
});
app.listen(port, hostName, () => {
  console.log(`服务器运行在http://${hostName}:${port}`);
});
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
// 房间信息
app.get('/getroominfo', (req, res) => {
  const sql = 'select * from room_info';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        errCode: -1,
        errMsg: err,
        resData: '',
      });
    } else {
      res.json({
        errCode: 0,
        errMsg: 'success',
        resData: result || [],
      });
    }
  });
});
// 顾客信息
app.get('/getcustomerinfo', (req, res) => {
  const { name } = req.query;
  // 筛选有效信息
  let keywords = ' where is_valid = 0';
  // 根据顾客姓名筛选
  if (name !== '') {
    keywords += ` and  user_name like '%${name}%'`;
  }
  const sql = `select * from customer_info ${keywords}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        errCode: -1,
        errMsg: err,
        resData: '',
      });
    } else {
      res.json({
        errCode: 0,
        errMsg: 'success',
        resData: result || [],
      });
    }
  });
});

// // 顾客信息
// app.get('/getcustomerinfo', (res) => {
//   const sql = 'select * from customer_info ';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json({
//         errCode: -1,
//         errMsg: err,
//         resData: '',
//       });
//     } else {
//       res.json({
//         errCode: 0,
//         errMsg: 'success',
//         resData: result || [],
//       });
//     }
//   });
// });

