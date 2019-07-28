import request from 'supertest';
import app from '../api/server';

describe('Server [GET /api]', () => {
  it('should return status code 200 if the server is running', async () => {
    const { statusCode } = await request(app).get('/api');
    expect(statusCode).toEqual(200);
  });
});
