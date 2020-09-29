import client from './client';

const putCurrentDog = (userId, dogId) =>
  client.put('/users/current-dog', { userId, dogId });

export default {
  putCurrentDog,
};
