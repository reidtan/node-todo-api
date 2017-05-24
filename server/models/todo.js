let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  },
});

module.exports = {Todo};

// let newTodo = new Todo({
//   text: 'Cook dinner',
// });

// newTodo.save().then((result) => console.log(result),
//                     (err) => console.log(e));

// let newTodo = new Todo({
//   text: 'Make robot',
// });

// newTodo.save().then((result) => console.log(result),
//                     (err) => console.log(err));