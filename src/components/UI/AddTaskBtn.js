import classes from './AddTaskBtn.module.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { myDayActions } from '../store/myDay-slice';
import { importantActions } from '../store/important-slice';
import { newListActions } from '../store/newList-slice';

const AddTaskBtn = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const addTaskHandler = () => {
    const inMyDayPage = location.pathname.endsWith('myday');
    const inImportantPage = location.pathname.endsWith('important');
    if (inMyDayPage) {
      dispatch(myDayActions.setIsTasking());
    }
    if (inImportantPage) dispatch(importantActions.setIsTasking());
    else dispatch(newListActions.setIsTasking());
  };

  return (
    <div className={classes.btnContainer}>
      <i className='large material-icons'>add</i>
      <button className={classes.btn} onClick={addTaskHandler}>
        Add a task
      </button>
    </div>
  );
};

export default AddTaskBtn;
