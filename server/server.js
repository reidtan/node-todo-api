require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
let PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text,
  });

  todo.save().then((doc) => res.send(doc),
                    (e) => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  let {id} = req.params;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {
      if(!todo) {
        res.status(404);
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

app.delete('/todos/:id', (req, res) => {
  let {id} = req.params;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then((todo) =>{
      if(!todo) {
        res.status(404);
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

app.patch('/todos/:id', (req, res) => {
  let {id} = req.params;
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if(!todo) {
        res.status(404);
      }
      res.send({todo});
    }).catch((err) => {
      res.status(400).send();
    });
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = {app};
