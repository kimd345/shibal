import { useDispatch } from 'react-redux';
import { actions } from '../redux/ducks';

export default useProgress = () => {
  const dispatch = useDispatch();

  const getNestedIds = (object) => {
    let result = [];

    const recursion = (obj) => {
      for (let key in obj) {
        let value = obj[key];

        if (key === "id") result.push(value);

        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            recursion(value[i]);
          }
        }
      }
    };

    recursion(object);

    return [ ...new Set(result)].sort((a, b) => a - b);
  };

  const setTrainingIds = (program) => {
    if (program === undefined) return;
    const trainingIds = getNestedIds(program);
    dispatch(actions.setTrainingIds(trainingIds))
  };

  const checkProgramCompletion = (enrollments, trainingIds) => {
    const enrollmentIds = Object.keys(enrollments).map(key => parseInt(key));
    const isComplete = trainingIds.join() === enrollmentIds.join();

    return isComplete;
  };

  const checkTrainingCompletion = (enrollments, entity) => {
    const entityIds = getNestedIds(entity);
    const enrollmentIds = Object.keys(enrollments).map(key => parseInt(key));

    const isComplete = entityIds.every(entityId => enrollmentIds.includes(entityId));

    return isComplete;
  }

  return { setTrainingIds, checkProgramCompletion, checkTrainingCompletion };
};