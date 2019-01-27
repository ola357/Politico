const request = require('supertest');
const Jasmine = require('jasmine');

const jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');

let server;

describe('/api/v1/parties', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../app');
  });
  afterEach(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return all parties', async () => {
      const res = await request(server).get('/api/v1/parties');
      expect(res.status).toBe(200);
      // expect(res.body.length).toBe(2);
    });
  });
});
