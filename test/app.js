/* eslint-disable prefer-const */
const chai = require('chai');
const chaiHttp = require('chai-http');

let server;
// require('../server');


// eslint-disable-next-line no-unused-vars
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('/api/v1/parties', () => {
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
  describe('/GET parties', () => {
    it('it should GET all parties', (done) => {
      chai.request(server)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
