var express = require('express');
var db = require('../db');
var router = express.Router();



router.get('/', (req, res)=> {
  res.render('../views/gamePage/gamePage.pug');
})

router.post('/Update', (req, res) => {
  myScore = req.body.hiddenScore;
  userId = req.body.hiddenName;
  db.query(`INSERT INTO APPLE(SCORE, NAME) VALUES(${myScore}, '${userId}')`, function(error, result) {
    if(error) throw error;
    res.redirect('/');
  });
})

module.exports = router;