/**
 * Created by beck.zhang on 5/4/2017.
 */

module.exports = (function () {
  var mysql = require('mysql');
  var config = require('../config/config.js');
  var sqlUtil = {};

  var pool = mysql.createPool({
    host: config.mysql.connect.host ,
    user: config.mysql.connect.user,
    password: config.mysql.connect.password,
    database: config.mysql.connect.database,
    acquireTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 100
  });
  
  pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId)
  });

  pool.on('connection', function () {
    console.log('Connection connect')
  });

  pool.on('enqueue', function () {
    console.log('Waiting for available connection slot')
  });

  pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
  });

  sqlUtil.query = function (sql, args, cb) {
    pool.getConnection(function (err, connection) {
      if(err){
        if(connection){
          connection.release()
        }
      }
      connection.query(sql, args, function (err, results) {
        connection.release();
        cb(err, results);
      })
    })
  };

  return sqlUtil;
}());




