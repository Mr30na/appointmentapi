var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const loginRouter = require('./routes/login')
const passwordRouter =require('./routes/passRouter');
const signinRoute = require("./routes/signin");
const admin = require("./routes/admin");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',admin)
app.use('/password',passwordRouter);
app.use('/login',loginRouter);
app.use('/appointments',require("./routes/showAppointments"))
app.use('/signup',signinRoute)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000,"localhost")
module.exports = app;
