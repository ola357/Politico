/* eslint-disable prefer-const */
const chai = require('chai');
const chaiHttp = require('chai-http');

let server;
// require('../server');


// eslint-disable-next-line no-unused-vars
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('/api/v1/offices', () => {
  beforeEach((done) => { // Before each test we empty the database
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line global-require
    server = require('../app');
    done();
  });
  afterEach(() => {
    server.close();
  });
  /*
  * Test the /GET route
  */
  describe('/GET offices', () => {
    it('it should GET all offices', (done) => {
      chai.request(server)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST offices', () => {
    it('it should create a new office', (done) => {
      let office = {
        type: "president",
        name: "Jpf",
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      let office = {
        type: "you don't wanna give in",
        name: "Jpf",
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('/GET/:id office', () => {
    it('it should GET a book by the given id', (done) => {
      chai.request(server)
        .get('/api/v1/offices/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it give an error when wrong id is sent', (done) => {
      chai.request(server)
        .get('/api/v1/offices/10')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
