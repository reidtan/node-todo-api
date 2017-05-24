// const MongoClient = require('mongodb').MongoClient;
// same as above, with object destructuring ES6 syntax
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'eat lunch'})
  //   .then((result) => console.log(result.result));

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'})
  //   .then((result) => console.log(result.result));

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false})
  //   .then((result) => console.log(result.value));

  // db.close();
});
