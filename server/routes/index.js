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
  let sql = `select * from beacon_devices;`;

  conn.query(sql, (err, data)=>{
    if(err)
      throw err;
    else
      res.send(data)
  })
});

router.get('/getUser', function(req, res) {
  let sql = `select * from beacon_user;`;

  conn.query(sql, (err, data)=>{
    if(err)
      throw err;
    else
      res.send(data)
  })
});
module.exports = router;
