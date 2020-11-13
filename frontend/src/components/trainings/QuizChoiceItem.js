import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../config/colors';
import Button from '../../components/Button';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function QuizChoiceItem({ choice, quiz, choices, program }) {
  const [incorrect, setIncorrect] = useState(false);
  const createQuizEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const entityId = quiz.id;
  const dogId = useSelector(state => state.dog.id);
  // const trainingIds = useSelector(state => state.trainingIds);
  // const enrollments = useSelector(state => state.enrollments);

  const handlePress = async () => {
    if (choices.indexOf(choice) === quiz.answer_idx) {
      await createQuizEnrollmentApi.request(entityId, dogId, 'Quiz', 'Completed')
        .then(result => dispatch(actions.addEnrollment(result.data)));
    } else {
      setIncorrect(true);
    }
  };

  return (
    <Button
      title={choice}
      height='auto'
      width='80%'
      color='white'
      textColor={incorrect ? 'google' : 'mossygrey'}
      textDecorationLine={incorrect ? 'line-through' : 'none'}
      onPress={handlePress}
    />
  );
}

export default QuizChoiceItem;