import supertest from 'supertest';
import { app } from '../server';

const request = supertest(app);

describe('Test server', (): void => {
  it('server running', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');
    expect(response.status).toBe(200);
  });
});