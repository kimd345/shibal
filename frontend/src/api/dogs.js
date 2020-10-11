import client from './client';

const createDog = (dogInfo) => client.post('/dogs', dogInfo);
const deleteDog = (dogId) => client.delete(`/dogs/${dogId}`);
const getDog = (dogId) => client.get(`/dogs/${dogId}`);
const getDogs = (userId) => client.get(`/dogs/user-id/${userId}`);

export default {
  createDog,
  deleteDog,
  getDog,
  getDogs,
};
