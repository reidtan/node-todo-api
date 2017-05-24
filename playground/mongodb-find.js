// const MongoClient = require('mongodb').MongoClient;
// same as above, with object destructuring ES6 syntax
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({complete: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // });

  // db.collection('Todos').find({
  //   _id: new ObjectID('5923e0ebec3950cbdaab4452'),
  // }).toArray()
  //   .then((docs) => console.log(JSON.stringify(docs, undefined, 2)),
  //         (err) => console.log('Unable to fetch Todos', err));

  db.collection('Users').find({name: 'Reid2'})
    .toArray()
    .then((docs) => console.log(JSON.stringify(docs, undefined, 2)),
          (err) => console.log('Unable to fetch Todos', err));

  // db.close();
});
