let mongoose = require('mongoose');

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

// let newUser = new User({
//   email: 'blah@email.com',
// });

// newUser.save().then((result) => console.log(result),
//                     (err) => console.log('saving error: ', err));

module.exports = {User};
