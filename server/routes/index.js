var express = require('express');
var router = express.Router();
const conn = require('./conn');

conn.connect(()=>{
  console.log('beacon_devices数据库连接成功！')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUuid', function (req, res) {
  console.log("调用/getUuid获取beacon_devices设备信息")
  let sql = `select * from beacon_devices;`;

  conn.query(sql, (err, data)=>{
    if(err)
      throw err;
    else
      res.send(data)
  })
});

router.post('/postLocated', function(req, res){
  console.log(req.body)
  let sql = `insert into `
})

router.get('/WeChat/getLocation', (req, res)=>{
  console.log("调用/WeChat/getLocation接口获取beacon_upload位置信息")
  let sql = `select * from beacon_upload`

  conn.query(sql, (err, data)=>{
    if(err)
      throw err;
    else
      res.send(data)
  })
})

router.get('/getUser', function(req, res) {
  console.log("调用/getUser接口获取beacon_user用户信息")
  let sql = `select * from beacon_user;`;

  conn.query(sql, (err, data)=>{
    if(err)
      throw err;
    else
      res.send(data)
  })
});
module.exports = router;
