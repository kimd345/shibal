import client from './client';

const createLike = (dogId, postId) => client.post('/likes', { dogId, postId });
const deleteLike = (dogId, postId) => client.delete(`/likes/${dogId}/${postId}`);
const getLikes = () => client.get('/likes');

export default {
  createLike,
  deleteLike,
  getLikes,
};
