const request = require('supertest');
const app = require('./app'); // Adjust the path as necessary
const axios = require('axios');

jest.mock('axios');

// Suppress console.error during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('POST /', () => {
  it('should return developers information', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { name: 'Joel Burton', bio: 'Open source developer. Former dev at Apple...' } })
      .mockResolvedValueOnce({ data: { name: 'Elie Schoppik', bio: 'Co-founder + Lead Instructor @rithmschool' } });

    const response = await request(app)
      .post('/')
      .send({ developers: ['joelburton', 'elie'] })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([
      { name: 'Joel Burton', bio: 'Open source developer. Former dev at Apple...' },
      { name: 'Elie Schoppik', bio: 'Co-founder + Lead Instructor @rithmschool' }
    ]);
  });

  it('should handle errors properly', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const response = await request(app)
      .post('/')
      .send({ developers: ['joelburton'] })
      .expect('Content-Type', /json/)
      .expect(500);

    // Adjust based on your actual error handling implementation
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});