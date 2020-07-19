const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json()); //middleware
/*
app.get('/', (req, res) => {
  res.status(200).json({message: 'Hello from the server side!',
    app: 'Journey-Maker'});
});
app.post('/', (req, res) => {
  res.sent('send to this endpoint');
})
*/
//
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// route handler
// Get all tours
app.get('/api/v2/tours', (req,res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
})
// create a new tour
app.post('/api/v2/tours', (req, res) => {
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
    })
  });
})

// Get specific tour, using URL parameter
app.get('/api/v2/tours/:id', (req,res) => {
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
  })
})

