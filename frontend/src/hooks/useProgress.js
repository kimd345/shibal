import { useDispatch } from 'react-redux';
import { actions } from '../redux/ducks';

export default useProgress = () => {
  const dispatch = useDispatch();

  const ohbra = (object) => {
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
    const trainingIds = ohbra(program);
    dispatch(actions.setTrainingIds(trainingIds))
  };

  return { setTrainingIds };
};