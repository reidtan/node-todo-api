// const MongoClient = require('mongodb').MongoClient;
// same as above, with object destructuring ES6 syntax
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5924f52dec3950cbdaab53d8'),
  // },
  // {
  //   $set: {
  //     completed: true,
  //   },
  // }, {
  //   returnOriginal: false,
  // }).then((result) => console.log(result));

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59240319ec3950cbdaab4fc5'),
  }, {
    $set: {name: 'Reid'},
    $inc: {age: 1},
  }, {
    returnOriginal: false,
  }).then((result) => console.log(result));

  // db.close();
});
