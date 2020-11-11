import client from './client';

const getTrainings = () => client.get('/trainings');

const getEnrollments = (dogId) => client.get(`/trainings/enrollments/${dogId}`);
const createEnrollment = (entityId, dogId, entityType, status) => client.post('/trainings/enrollments', { entityId, dogId, entityType, status });
const completeProgramEnrollment = (programId, dogId) => client.patch('/trainings/enrollments', { programId, dogId });

export default {
  getTrainings,
  getEnrollments,
  createEnrollment,
  completeProgramEnrollment,
};
