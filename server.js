const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log('DB connection successful!');
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});
const Tour = mongoose.model('Tour', tourSchema);
//create documents
const testTour = new Tour({
  name: "The Park Camper",
  price: 997
});
// save testTour document to database
testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log('ERROR: ', err);
})
// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
