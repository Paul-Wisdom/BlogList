const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const morgan =  require('morgan');
require('express-async-errors');

const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const {mongoUrl} = require('./utils/config');
const logger = require('./utils/logger');
const middlewares = require('./utils/middleware');

logger.info("connecting to", mongoUrl)
mongoose.connect(mongoUrl).then(result => { logger.info('successful connection')}).catch(err => {
  logger.error('error connecting to db', err.message)
})

morgan.token('data', (req) => {
  if(req.method === 'POST' || req.method === 'PUT')
      {
          return JSON.stringify(req.body);
      }
  return ' ';
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
//add unknownRoute, errorhandler and requestlogger i.e morgan middleware
app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);
module.exports = app;