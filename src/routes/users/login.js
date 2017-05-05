/**
 * Created by beck.zhang on 5/3/2017.
 */
var express = require('express');
var router = express.Router();
var userDao = require('../../dao/usersDao.js');
var jwt = require('jsonwebtoken');
var async = require('async');
var moment = require('moment');
var config = require('../../config/config.js');

router.post('/',function (req, res, next) {
  async.waterfall([
      function (callback) {
        userDao.login({username: req.body.username, password: req.body.password}, function (err) {
          res.sendStatus(500);
        }, function (count) {
          if(count == 0){
            res.status(500).send('Incorrect username or password!')
          }
          callback();
        })
      },
      function (callback) {
        userDao.updateLoginDatetime({last_login_date: moment().format('YYYY-MM-DD HH:mm:ss'), username: req.body.password},function (err) {
          res.sendStatus(500)
        },function (result) {
          callback();
        });
      },
      function () {
        userDao.getUserInfo({username: req.username}, function (err) {
          res.sendStatus(500);
        }, function (result) {
          if(result.length){
            var token = jwt({username: result.username, email: result.email },config.secret.key)
          }
          res.sendStatus(500)
        })
      }
  ]);

});

module.exports = router;