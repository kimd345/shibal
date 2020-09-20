import client from './client';

const login = (email, password) => client.put('/auth', { email, password });

export default {
  login,
};
