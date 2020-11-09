import client from './client';

const getTrainings = () => client.get('/trainings');

const getEnrollments = (dogId) => client.get(`/trainings/enrollments/${dogId}`);
const createEnrollment = (entityId, dogId, entityType, status) => client.post('/trainings/enrollments', { entityId, dogId, entityType, status });

export default {
  getTrainings,
  getEnrollments,
  createEnrollment,
};
