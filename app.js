const express = require('express');
const morgan = require('morgan');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//  Middleware
console.log(process.env.NODE_ENV);
app.use(morgan('dev'));
app.use(express.json()); //get access to request body of the request object
app.use(express.static('./public')); //server static files
/*
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});
*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})


// Routes
app.use('/api/v2/tours', tourRouter);
app.use('/api/v2/users', userRouter);

// for all other invalids routes
app.all('*', (req, res, next) => {
  /*
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
   */
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;

