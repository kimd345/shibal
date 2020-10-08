import client from './client';

const getUser = (userId) => client.get(`/users/${userId}`);

const putCurrentDog = (userId, dogId) =>
  client.put('/users/current-dog', { userId, dogId });

export default {
  getUser,
  putCurrentDog,
};
