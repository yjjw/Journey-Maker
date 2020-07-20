const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync('./../dev-data/data/tours-simple.json')
);

// route handlers
exports.getAllTours = (req,res) => {
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

exports.getTour = (req,res) => {
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

exports.createTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
