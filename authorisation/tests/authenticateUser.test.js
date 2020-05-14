const supertest = require('supertest');
const app = require('../index');

const request = supertest.agent(app);


describe('This is a test for authenticate user /', () => {
    it('should successfully authenticate user', done => {
      request
        .post('/')
        .send({
            email:"mohan@gmail.com",
            password:"123456"
        })
        .expect(200)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty(
            'user.name',
            'mohan d'
          );
          done();
        });
    });
  });