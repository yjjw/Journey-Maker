const Tour = require('./../models/tourModel');


// route handlers
exports.getAllTours = async (req,res) => {
  try {
    // Build query
    // 1a) Filtering
    console.log(req.query);
    const queryObj = { ...req.query }; //make a hard copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(element => delete queryObj[element]);


    // 1b) Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    // replace gte, gt, lte, lt with $gte, $gt, $lte, $lt
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryString));

    let query = Tour.find(JSON.parse(queryString));

    // 2) Sorting
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Execute query
    const tours = await query
    /*
    const query = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    */

    console.log(req.requestTime);
    // Send response
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

exports.updateTour = async(req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    })
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }

}
