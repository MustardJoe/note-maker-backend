require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a note with POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'My Title', body: 'This is a great note' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'My Title',
          body: 'This is a great note',
          __v: 0
        });
      });
  });
});
