const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5926501f6610e7ec30b8484c';

if(!ObjectID.isValid(id)) {
  console.log('Id not valid');
}


// Todo.find({
//   _id: id,
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id,
// }).then((todo) => {
//   console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo', todo);
// }).catch((err) => console.log(err));


User.findById('59252e3f04c6d34833631729')
  .then((user) => {
    if(!user) {
      return console.log('Id not found');
    }
    console.log(user);
  }).catch((err) => console.log(err));
