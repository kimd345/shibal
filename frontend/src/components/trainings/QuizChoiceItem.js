import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../config/colors';
import Button from '../../components/Button';

import routes from '../../navigation/routes';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function QuizChoiceItem({ choice, quiz, choices }) {
  const [textColor, setTextColor] = useState('primaryText');
  const createQuizEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const dispatch = useDispatch();

  const entityId = quiz.id;
  const dogId = useSelector(state => state.dog.id);

  return (
    <Button
      title={choice}
      height={70}
      width='80%'
      color='white'
      textColor={textColor}
      onPress={async () => {
        if (choices.indexOf(choice) === quiz.answer_idx) {
          await createQuizEnrollmentApi.request(entityId, dogId, 'Quiz', 'Completed')
            .then(result => dispatch(actions.addEnrollment(result.data)));
        } else {
          setTextColor('google');
        }
      }}
    />
  );
}

export default QuizChoiceItem;