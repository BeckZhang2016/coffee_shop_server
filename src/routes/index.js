var express = require('express');
var app = express();

app.use('/login', require('./users/login.js'));
app.use('/register', require('./users/register.js'));
app.use('/users', require('./users/users.js'));
app.use('/home', require('./home.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


