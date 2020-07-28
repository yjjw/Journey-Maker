class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1a) Filtering
    console.log(this.queryString);
    const queryObj = { ...this.queryString }; //make a hard copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(element => delete queryObj[element]);


    // 1b) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    // replace gte, gt, lte, lt with $gte, $gt, $lte, $lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    //let query = Tour.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // exclude _v field
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const page_limit = this.queryString.limit * 1 || 100;
    const page_skip = (page - 1) * page_limit;
    // e.g.limit=10, results 1-10 in page1, results 11-20 in page2...
    this.query = this.query.skip(page_skip).limit(page_limit);

    return this;
  }

}

module.exports = APIFeatures;
