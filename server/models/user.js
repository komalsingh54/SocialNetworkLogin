let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// create User Schema
let User = new Schema({
  name: String,
  someID: String,
  familyName: String,
  givenName: String,
});


module.exports = mongoose.model('users', User);
