import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = `http://localhost:3000/api`;
const ValidBearerToken = 'abc'

describe('UserAPI.e2e', () => {
  it('POST /user should do its job', async () => {
    let res;
    const options = {
      headers: {
        'authorization': `Bearer ${ValidBearerToken}`
      }
    } as AxiosRequestConfig;
    try {
      const data = {};
      res = await axios.post(`${baseUrl}/user`, data, options);
      expect(res.status).toBe(200);
    } catch(err) {
      console.log(err);
      throw err;
    }
  });

  it('GET /user should do its job', async () => {
    let res;
    const options = {
      headers: {
        'authorization': `Bearer ${ValidBearerToken}`
      }
    } as AxiosRequestConfig;
    try {
      // const id = '6190693aa0c0e20021fa2324';
      res = await axios.get(`${baseUrl}/user`, options);
      expect(res.status).toBe(200);
    } catch(err) {
      console.log(err);
      throw err;
    }
  });

  it('PUT /user should do its job', async () => {
    let res;
    const options = {
      headers: {
        'authorization': `Bearer ${ValidBearerToken}`
      }
    } as AxiosRequestConfig;
    try {
      const data = {};
      res = await axios.put(`${baseUrl}/user`, data, options);
      expect(res.status).toBe(200)
    } catch(err) {
      console.log(err);
      throw err;
    }
  });
});
