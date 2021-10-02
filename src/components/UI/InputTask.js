import classes from './InputTask.module.css';
import React from 'react';
import { Fragment, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { myDayActions } from '../store/myDay-slice';
import { importantActions } from '../store/important-slice';
import { newListActions } from '../store/newList-slice';

import { useLocation } from 'react-router-dom';

const InputTask = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const input = useRef();
  const [inputValue, setInputValue] = useState('');
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const inputBlurHandler = () => {
    if (inputValue.length === 0) {
      dispatch(myDayActions.setIsTouched());
      dispatch(importantActions.setIsTouched());
      dispatch(newListActions.setIsTouched());
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (inputValue.length === 0) return setInputIsEmpty(true);
    if (inputValue.length > 0) {
      setInputIsEmpty(false);
      if (location.pathname.endsWith('myday')) {
        dispatch(myDayActions.addTask(input.current.value));
        dispatch(myDayActions.setIsTouched());
      }
      if (location.pathname.endsWith('important')) {
        dispatch(importantActions.addTask(input.current.value));
        dispatch(importantActions.setIsTouched());
      }
      if (
        !location.pathname.endsWith('myday') &&
        !location.pathname.endsWith('important')
      ) {
        dispatch(newListActions.addTask(input.current.value));
        dispatch(newListActions.setIsTouched());
      }
    }
  };

  return (
    <Fragment>
      <form className={classes.container} onSubmit={submitFormHandler}>
        <input type='checkbox' className={classes.checkbox} disabled />
        <input
          type='text'
          className={classes.input}
          placeholder='Add a task'
          onBlur={inputBlurHandler}
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          ref={input}
        />
        {inputValue.length > 0 && (
          <button className={classes.btnAddTask} type='submit'>
            Add
          </button>
        )}
      </form>

      {inputIsEmpty && (
        <p className='text-danger fs-3 text-center'>
          This field should not be empty
        </p>
      )}
    </Fragment>
  );
};

export default React.memo(InputTask);
