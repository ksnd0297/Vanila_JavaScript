var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res) => {
  res.render('../views/mainPage/mainPage.pug');
})

router.get('/rank', (req, res) => {
  var index = 5;
  offset = 0;
  db.query(`SELECT * FROM APPLE LIMIT 5 OFFSET 0`, function(error, apple){
    res.render('../views/rankPage/rankPage.pug',{apple,index,offset});
  })
})

router.get('/rank/:offset',(req, res) => {
  var offset = req.params.offset;
  db.query(`SELECT * FROM APPLE LIMIT 5 OFFSET ${offset}`, function(error, apple){
    db.query(`SELECT COUNT(*) AS count FROM APPLE`, function(error, row) {
      var count = row[0].count; // 전체 row의 개수
      if(count - offset >= 5) index = 5;
      else index = count - offset;
      res.render('../views/rankPage/rankPage.pug',{apple,index,offset, count});
    })
    
  })
})


module.exports = router;