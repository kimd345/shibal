import client from './client';

const createDog = (dogInfo) => client.post('/dogs', dogInfo);
const getDog = (dogId) => client.get('/dogs', { dogId });

export default {
  createDog,
  getDog,
};
