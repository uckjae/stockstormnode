//kafka https://programmerdaddy.tistory.com/80

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//ENV
require('dotenv').config();

//connect to mongodb
const mongoose = require('mongoose');
const wocUri = process.env.WOCURI;
const symbols = require('./models/symbols');

mongoose.connect(wocUri, {useNewUrlParser: true, useUnifiedTopology: true}, function () {
  const conn = mongoose.connection;

  conn.on('connected', function () {
    console.log('database is connected successfully');
  });
  conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
  })

  conn.on('error', console.error.bind(console, 'connection error:'));
})
//updateSymbols
const schedule = require('node-schedule');
const updateRule = new schedule.RecurrenceRule();
updateRule.tz = 'Asia/Seoul';
updateRule.dayOfWeek = [1, 2, 3, 4, 5, 6, 7];
updateRule.hour = [8,9,12,13];
updateRule.minute = 0;
updateRule.second = 0;

async function updateScheduler() {
  console.log('scheduler init()')
  return new Promise(function (resolve, reject) {
    schedule.scheduleJob(updateRule, async () => {
      const updateSymbols = await require('./modules/updateSymbols').updateSymbols();
      if (updateSymbols == true) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

// updateScheduler().then(() => {
//   symbols.find({}, 'symbol').then(() => {
//     // console.log(r)
//   })
// }).catch((err) => {
//   console.error(err);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
