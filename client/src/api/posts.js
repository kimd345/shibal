import client from './client';

const endpoint = '/posts';

const getPosts = () => client.get(endpoint);

export default {
  getPosts,
};
