const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1st middle ware
//3rd parrty middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`hello from the middleware `);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/*
app.get('/', (req, res) => {
  //below line is the code to send response to the server
  //res.status(200).send('helllo from the server'); //we can also send back the status code
  //we can also send the json here
  res.status(200).json({ message: 'hello from the server', app: 'natours' });
});
app.post('/', (req, res) => {
  res.send('You can not post to this endpoint');
});
*/

// app.get('/api/v1/tours', getallTour);
// app.post('/api/v1/tours', createTour);

//the above two lines can be written as

//routes
/*

app.route('/api/v1/tours').get(getallTour).post(createTour);

//lets do the same for the remaining threes

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
//this is a lot bettter and easier to read
*/

//now a better version or practice

// the middlewares are defined below

app.use('/api/v1/tours', tourRouter); //these are imported above to make sure they work
app.use('/api/v1/users', userRouter);

//to start the server

module.exports = app;
