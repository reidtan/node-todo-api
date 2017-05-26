const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 1234,
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          console.log('End Error');
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(todos.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get a todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo).toInclude({
          text: 'First test todo',
        });
      })
      .end(done);
  });

  it('should return 404 if id invalid', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toBe(null);
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let delId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${delId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(delId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.findById(delId)
          .then((result) => {
            expect(result).toNotExist();
            done();
          }).catch((err) => done(err));
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toNotExist();
      })
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update todo', (done) => {
    let id = todos[0]._id.toHexString();
    let text = 'Updated Test Text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: true,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo).toInclude({
          text,
          completed: true,
        });
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let id = todos[1]._id.toHexString();
    let text = 'Updated Test Text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: false,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo).toInclude({
          text,
          completed: false,
        });
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
