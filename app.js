const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json()); //middleware, get access to request body of the request object
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// route handler

const getAllTours = (req,res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours
    }
  });
}

const getTour = (req,res) => {
  console.log(req.params);
  const id = req.params.id * 1; // convert id from string to number
  if (id > tours.length || !tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  const tour = tours.find(element => element.id === id);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour: tour
    }
  });
}

const createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1; // convert id from string to number
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  const delete_index = tours.findIndex(element => element.id === id);
  delete tours[delete_index];
  res.status(204).json({
    status: 'success',
    data: null
  })
}


//app.get('/api/v2/tours', getAllTours);

//app.get('/api/v2/tours/:id', getTour);

//app.post('/api/v2/tours', createTour);

//app.delete('/api/v2/tours/:id', deleteTour);

app
  .route('/api/v2/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v2/tours/:id')
  .get(getTour)
  .delete(deleteTour);
