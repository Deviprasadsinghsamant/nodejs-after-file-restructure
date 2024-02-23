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

const port = 3000;
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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//route handlers

const getallTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,

    data: {
      // tours: tours, //this is a resource that is declared above const tours
      //the aboveline can be written as
      tours,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; //when a string looks like a number and we want to convert them to number then we simply multiply them by 1.
  //line 1st galot
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID request',
    });
  }

  const tour = tours.find((el) => {
    return el.id === id; // have to use return keyword else write in oneline of arrow function to return that oneline of code.
  });
  //refer line first galot For alternate solution below is the beter version to return an error message with s
  //status code that the requested id doesn't exist

  //INCASE ANY ID IS NOT FOUND THEN

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID request(alternate solution)',
    });
  } // this wont execute unless line galot 1 is not commented out

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
    // results: tours.length,
    // data: {
    //   // tours: tours, //this is a resource that is declared above const tours
    //   //the aboveline can be written as
    //   tours,
    // },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  //NOW TO ADD THE NEWLY CREATED OBJECT INTO THE PRECIOUS JSON FILE
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours) /**we need to stringify this as this is a js object
     and this is the 2nd argument which means the data which we want to write */,
    (error) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('done');// had to remove as you cant send two responses
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid id ',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tours here....',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid id ',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null, //here we dont send any data
  });
};

//user route handlers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

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

const tourRouter = express.Router();
const userRouter = express.Router();

// the middlewares are defined below

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//to start the server

app.listen(port, () => {
  console.log(`App running in the background ${port}`);
});
