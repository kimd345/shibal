import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import routes from '../../navigation/routes';

import { ListItemSeparator } from '../../components/lists';
import { ListItem } from '../../components/lists';
import Icon from '../../components/Icon';

import useApi from '../../hooks/useApi';

import trainingsApi from '../../api/trainings';
import { actions } from '../../redux/ducks';

function LessonsItem({ lesson, program, module }) {
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const createEnrollmentApi = useApi(trainingsApi.createEnrollment);

  const enrollments = useSelector(state => state.enrollments);
  const dogId = useSelector(state => state.dog.id);
  
  const activityId = lesson.activities[0].id;
  const quizId = lesson.quizzes[0].id;
  const skillsIds = lesson.skills.map(skill => skill.id);
  
  const curriculumIds = [ ...skillsIds, activityId, quizId];

  useFocusEffect(() => {
    setCompleted(curriculumIds.every(id => enrollments.hasOwnProperty(id)));
  });

  const handlePress = async () => {
    ((enrollments[lesson.id] === undefined) &&
      (await createEnrollmentApi.request(lesson.id, dogId, 'Lesson', 'Completed')
        .then(result => dispatch(actions.addEnrollment(result.data)))));
      ((enrollments[module.id] === undefined) &&
        (await createEnrollmentApi.request(module.id, dogId, 'Module', 'Completed')
          .then(result => dispatch(actions.addEnrollment(result.data)))));
    navigation.navigate(routes.LESSON, { program, lesson });
  };

  return (
    <>
      <ListItem
        title={lesson.title}
        IconComponent={completed ? <Icon name='check' iconColor='green' backgroundColor='white' /> : null}
        onPress={handlePress}
      />
      <ListItemSeparator />
    </>
  );
}

export default LessonsItem;