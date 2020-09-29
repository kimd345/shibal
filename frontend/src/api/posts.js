import client from './client';

const getPosts = () => client.get('/posts');

export default {
  getPosts,
};
