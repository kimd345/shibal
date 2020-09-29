import client from './client';

const createDog = (dogInfo) => client.post('/dogs', dogInfo); // params? userId

export default {
  createDog,
};
