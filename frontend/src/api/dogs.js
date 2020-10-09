import client from './client';

const createDog = (dogInfo) => client.post('/dogs', dogInfo);
const getDog = (dogId) => client.get(`/dogs/${dogId}`);
const getDogs = (userId) => client.get(`/dogs/${userId}`);

export default {
  createDog,
  getDog,
  getDogs,
};
