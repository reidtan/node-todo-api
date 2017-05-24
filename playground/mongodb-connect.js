// const MongoClient = require('mongodb').MongoClient;
// same as above, with object destructuring ES6 syntax
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

// // object destructuring
// let user = {name: 'reid', age: 31};
// let {name} = user; // pulls name value out of user and assign to name var
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Reid',
  //   age: '31',
  //   location: 'SengKang',
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert into Users', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  db.close();
});
