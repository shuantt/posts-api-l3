var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const connectionStr = `${process.env.CONNECTION_STR}`
  .replace('<account>', process.env.DB_ACCOUNT)
  .replace('<password>', process.env.DB_PASSWORD);

console.log(connectionStr)

const mongoose = require('mongoose');
mongoose.connect(connectionStr)
    .then(() => {console.log('DB connected')})
    .catch(err => console.log(err));

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

module.exports = app;
