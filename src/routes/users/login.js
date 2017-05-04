/**
 * Created by beck.zhang on 5/3/2017.
 */
var express = require('express');
var router = express.Router();
var userDao = require('../../dao/usersDao.js');

router.post('/',function (req, res, next) {
  userDao.login({username: req.username, password: req.password}, function (err) {
    res.sendStatus(500);
  }, function (count) {
    if(count == 0){
      res.status(500).send('Incorrect username or password!')
    }
    res.status(200).json();
  })
});

module.exports = router;