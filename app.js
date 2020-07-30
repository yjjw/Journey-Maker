const express = require('express');
const morgan = require('morgan');
const app = express();
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

module.exports = app;

