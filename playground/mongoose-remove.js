const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// returns the removed doc
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('59269cdf83a086918f2d1ceb')
  .then((todo) => {
    console.log(todo);
  });
