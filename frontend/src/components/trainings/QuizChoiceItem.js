import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function QuizChoiceItem({ choice, quiz, choices, program }) {
  const [textColor, setTextColor] = useState('primaryText');
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
      setTextColor('google');
    }
  };

  return (
    <Button
      title={choice}
      height='auto'
      width='80%'
      color='white'
      textColor={textColor}
      onPress={handlePress}
    />
  );
}

export default QuizChoiceItem;