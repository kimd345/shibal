import client from './client';

const putCurrentDog = (userId, dogId) => client.put('/auth', { userId, dogId });

export default {
  putCurrentDog,
};
