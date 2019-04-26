var express = require('express');
var router = express.Router();
const conn = require('./conn');

conn.connect(() => {
  console.log('beacon_devices数据库连接成功！')
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUuid', function (req, res) {
  console.log("调用/getUuid获取beacon_devices设备信息")
  let sql = `select * from beacon_devices;`;

  conn.query(sql, (err, data) => {
    if (err)
      throw err;
    else
      res.send(data)
  })
});

router.post('/WeChat/postLocated', function (req, res) {
  let location = `${req.body[0].longitude} ${req.body[1].latitude}`
  let sql1 = `select ID, pointID from beacon_upload where ID=(select MAX(ID) from beacon_upload);`
  console.log(location)
  conn.query(sql1, (err, data) => {
    if (err)
      throw err
    else {
      let sql = `insert into beacon_upload values(${data[0].ID + 1}, ${data[0].pointID + 1}, '${location}', 'test', 1);`
      console.log(sql)
      conn.query(sql, (err, data) => {
        if (err)
          throw err
        else
          res.send("success!")
      })
    }
  })
})

router.post('/WeChat/clockIn', (req, res)=>{
  console.log(req.body[0])
  let mydate = new Date();
  console.log(mydate)
  let uuidArr = req.body[0].uuidArr;
  let sql1 = `select clockin from beacon_devices where beacon_uuid = '${uuidArr}';`
  conn.query(sql1, (err, data)=>{
    console.log(data)
    let sql = `update beacon_upload set clockin = ${data++} where beacon_uuid = '${uuidArr}';`
    conn.query(sql, (err, data)=>{
      if (err)
          throw err
        else
          res.send("success!")
    })
  })
  
})

router.get('/WeChat/getLocation', (req, res) => {
  console.log("调用/WeChat/getLocation接口获取beacon_upload位置信息")
  let sql = `select * from beacon_upload`

  conn.query(sql, (err, data) => {
    if (err)
      throw err;
    else
      res.send(data)
  })
})

router.get('/getUser', function (req, res) {
  console.log("调用/getUser接口获取beacon_user用户信息")
  let sql = `select * from beacon_user;`;

  conn.query(sql, (err, data) => {
    if (err)
      throw err;
    else
      res.send(data)
  })
});
module.exports = router;
