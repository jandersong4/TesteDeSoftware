require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors(
  {
    origin: process.env.APP_URL,
    credentials: true,
  }));


const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

require('./auth');

// const userRouter = require('../users/controller/user-controler');
const userRouter = require('../entidades/users/controller/user-controler');
app.use('/users', userRouter);

const matchRouter = require(
  '../entidades/matchs/controller/matchs-controller');
app.use('/matchs', matchRouter);


const playRouter = require('../entidades/plays/controller/play-controller');
app.use('/plays', playRouter);

const errorHandler = require('../middlewares/error-handler');
app.use(errorHandler);

module.exports = app;
