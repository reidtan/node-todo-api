let mongoose = require('mongoose');

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://todoapp:X6hD30mCv8Cl@ds151461.mlab.com:51461/todoapp',
};

mongoose.Promise = global.Promise;
mongoose.connect(db.local || db.mlab);

module.exports = {mongoose};
