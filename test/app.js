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

  describe('/POST parties', () => {
    it('it should create a new party', (done) => {
      let party = {
        name: "The",
        hqAddress: "Jpf",
        logoUrl: "boom",
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          // res.body.should.have.property('errors');
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      let party = {
        name: "The goat is smelly",
        hqAddress: "Jpf",
        logoUrl: "boom",
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          res.should.have.status(400);
          // res.body.should.be.a('object');
          // res.body.should.have.property('errors');
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
  describe('/GET/:id party', () => {
    it('it should GET a book by the given id', (done) => {
      chai.request(server)
        .get('/api/v1/parties/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it give an error when wrong id is sent', (done) => {
      chai.request(server)
        .get('/api/v1/parties/10')
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
  });
  describe('PATCH/:party-id/name', () => {
    /* it('it should UPDATE a book given the id', (done) => {
      let book = new Book({title: "The Chronicles of Narnia",
       author: "C.S. Lewis", year: 1948, pages: 778})
      book.save((err, book) => {
        chai.request(server)
          .put('/book/' + book.id)
          .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book updated!');
            res.body.book.should.have.property('year').eql(1950);
            done();
          });
      });
    }); */
    it('it should throw an error', (done) => {
      chai.request(server)
        .patch('/api/v1/parties/10/name')
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it should throw an error', (done) => {
      chai.request(server)
        .patch('/api/v1/parties/2/name')
        .send({
          name: "The goat is smelly",
          hqAddress: "Jpf",
          logoUrl: "boom",
        })
        .end((err, res) => {
          res.should.have.status(400);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it should PATCH succesfully', (done) => {
      chai.request(server)
        .patch('/api/v1/parties/1/name')
        .send({
          name: "love",
          hqAddress: "eko",
          logoUrl: "dodo",
        })
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
  });
  /*
* Test the /DELETE/:id route
*/
  describe('/DELETE/:id book', () => {
    /*  it('it should DELETE a book given the id', (done) => {
      let book = new Book({title: "The Chronicles of Narnia",
       author: "C.S. Lewis", year: 1948, pages: 778})
      book.save((err, book) => {
        chai.request(server)
          .delete('/book/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    }); */
    it('it should DELETE succesfully', (done) => {
      chai.request(server)
        .delete('/api/v1/parties/2')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it should throw an error', (done) => {
      chai.request(server)
        .delete('/api/v1/parties/20')
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
  });
});

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
