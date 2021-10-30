import classes from './TasksList.module.css';
import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { myDayActions } from '../store/myDay-slice';
import { importantActions } from '../store/important-slice';
import { newListActions } from '../store/newList-slice';

const TasksList = (props) => {
  const location = useLocation();

  const inImportant = location.pathname.endsWith('important');
  const inMyDay = location.pathname.endsWith('myday');
  const dispatch = useDispatch();

  const completedTaskHandler = () => {
    if (inImportant)
      dispatch(importantActions.removeTask({ item: props.item, id: props.id }));
    if (inMyDay) {
      dispatch(myDayActions.removeTask({ item: props.item, id: props.id }));
    }
    if (!inMyDay && !inImportant) {
      dispatch(newListActions.removeTask({ item: props.item, id: props.id }));
    }
  };

  const favoriteTaskHandler = (e) => {
    e.target.style.color = 'blue';
    if (inMyDay) {
      dispatch(myDayActions.addTaskToImportant(props.item));
      dispatch(importantActions.addTask(props.item));
    }
    if (!inMyDay) {
      dispatch(newListActions.addTaskToImportant(props.item));
      dispatch(importantActions.addTask(props.item));
    }
  };

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <input type='checkbox' onClick={completedTaskHandler} />
        <span>{props.item}</span>
        {!inImportant && (
          <button className={classes.icon}>
            <i
              className={`far fa-star ${classes.iconStar}`}
              onClick={favoriteTaskHandler}
            ></i>
          </button>
        )}
      </li>
    </ul>
  );
};

export default React.memo(TasksList);
