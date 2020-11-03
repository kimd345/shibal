import client from './client';

const getTrainings = () => client.get('/trainings');

export default {
  getTrainings,
};
