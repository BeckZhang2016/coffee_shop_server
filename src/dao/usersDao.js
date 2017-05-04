/**
 * Created by beck.zhang on 5/4/2017.
 */

var sqlUtils = require('../utils/sqlUtils.js');
var userDao = {};

userDao.register = function (userInfos, errorHandle, successHandle) {
  var sql = 'INSERT INTO cfs_user(username, password, email, phone) VALUES (?, ?, ?, ?)';
  var params = [userInfos.username, userInfos.password, userInfos.email, userInfos.phone];
  sqlUtils.query(sql, params, function (err, results) {
    if(err){errorHandle(err)}
    successHandle(results);
  });
};

userDao.login = function (userInfos, errorHandle, successHandle) {
  var sql = 'SELECT COUNT(*) as count FROM cfs_user WHERE username=? AND password=?';
  var params = [userInfos.username, userInfos.password];
  sqlUtils.query(sql, params, function (err, results) {
    if(err){errorHandle(err)}
    successHandle(results[0].count);
  });
};


module.exports = userDao;