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
app.get('/api/v2/tours', (req,res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
})

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

