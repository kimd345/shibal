import client from './client';

const login = (email, password) => client.put('/auth', { email, password });

const register = (userInfo) => client.post('/auth', userInfo);

export default {
  login,
  register,
};
