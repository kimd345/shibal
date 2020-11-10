import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import routes from '../../navigation/routes';

import { ListItem } from '../../components/lists';
import CompletedIcon from './CompletedIcon';
import Icon from '../../components/Icon';

function LessonsItem({ lesson, program }) {
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();

  const enrollments = useSelector(state => state.enrollments);
  
  const activityId = lesson.activities[0].id;
  const quizId = lesson.quizzes[0].id;
  const skillsIds = lesson.skills.map(skill => skill.id);
  
  const curriculumIds = [ ...skillsIds, activityId, quizId];

  useFocusEffect(() => {
    setCompleted(curriculumIds.every(id => enrollments.hasOwnProperty(id)));
  });

  return (
    <ListItem
      title={lesson.title}
      IconComponent={completed ? <Icon name='check' iconColor='green' backgroundColor='white' /> : null}
      onPress={() => navigation.navigate(routes.LESSON, { programTitle: program.title, lesson: lesson })}
    />
  );
}

export default LessonsItem;