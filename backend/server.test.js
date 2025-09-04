const request = require('supertest');
const app = require('./server');

describe('Backend API Tests', () => {
  it('should respond to GET / with 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
  // Tambahkan test lain sesuai kebutuhan
});
