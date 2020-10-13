import client from './client';

const getPosts = () => client.get('/posts');
const createPost = (postInfo) => client.post('/posts', postInfo);

export default {
  getPosts,
  createPost,
};
