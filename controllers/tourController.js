const Tour = require('./../models/tourModel');


// route handlers
exports.getAllTours = async (req,res) => {
  try {
    const tours = await Tour.find();

    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getTour = async (req,res) => {
  try{
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
}

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; // convert id from string to number
  //const delete_index = tours.findIndex(element => element.id === id);
  //delete tours[delete_index];
  res.status(204).json({
    status: 'success',
    data: null
  })
}
