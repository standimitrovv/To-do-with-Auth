import classes from './Navigation.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { myDayActions } from '../store/myDay-slice';
import { importantActions } from '../store/important-slice';
import { newListActions } from '../store/newList-slice';
import { useContext, useState, useRef } from 'react';
import AuthContext from '../store/auth-context';
import { Modal, Button } from 'react-bootstrap';

const Navigation = (props) => {
  const [newList, setNewList] = useState(false);
  const [newListEntered, setNewListEntered] = useState([]);
  const [maxListSizeReached, setMaxListSizeReached] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const newListValue = useRef();

  const dispatch = useDispatch();

  const myDayTasks = useSelector((state) => state.myDay.tasks.length);
  const importantTasks = useSelector((state) => state.important.tasks.length);
  const newListTasks = useSelector((state) => state.newList.tasks);

  const authCtx = useContext(AuthContext);

  const myDayHandler = () => {
    dispatch(importantActions.hideComponent());
    dispatch(myDayActions.toggleComponent());
  };

  const importantHandler = () => {
    dispatch(myDayActions.hideComponent());
    dispatch(importantActions.toggleComponent());
  };

  const newListHandler = () => {
    dispatch(importantActions.hideComponent());
    dispatch(myDayActions.hideComponent());
    dispatch(newListActions.toggleComponent());
  };

  const addNewListHandler = () => {
    setNewList(true);
    if (newListEntered.length === 1) {
      setMaxListSizeReached(true);
      setShowModal(true);
    }
  };

  const submitNewListHandler = (e) => {
    e.preventDefault();

    const newListName = newListValue.current.value;
    setNewListEntered((prevState) => {
      return [
        ...prevState,
        {
          name: newListName,
          id: Math.floor(Math.random() * 1000),
        },
      ];
    });
    setNewList(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.control}>
        <i className='large material-icons'>account_circle</i>
        <p className={classes.name}>{authCtx.username}</p>
        <i className='large material-icons'>
          <button className={classes.logout} onClick={logoutHandler}>
            exit_to_app
          </button>
        </i>
      </div>
      <div className={classes.sidebar}>
        <Link
          to='/tasks/myday'
          className={classes.control2}
          onClick={myDayHandler}
        >
          <i className='large material-icons'>event_note</i>
          <p className={classes.day}>My day</p>
          <span className={classes.tasksLength}>{myDayTasks}</span>
        </Link>
        <Link
          to='/tasks/important'
          className={classes.control2}
          onClick={importantHandler}
        >
          <i className='large material-icons'>star_border</i>
          <p className={classes.important}>Important</p>
          <span className={classes.tasksLength}>{importantTasks}</span>
        </Link>
      </div>
      {newListEntered.length > 0 &&
        newListEntered.map((list) => (
          <div key={list.id}>
            <Link
              to={`/tasks/${list.name}`}
              className={classes.control2}
              onClick={newListHandler}
              key={list.id}
            >
              <i className='large material-icons'>assignment</i>
              <p className={classes.newList}>{list.name}</p>
              <span className={classes.tasksLength}>{newListTasks.length}</span>
            </Link>
          </div>
        ))}
      {!newList && newListEntered.length <= 2 && (
        <div className={classes.navList}>
          <i className='large material-icons'>add</i>
          <button className={classes.btnList} onClick={addNewListHandler}>
            Add List
          </button>
        </div>
      )}
      {newList && newListEntered.length < 1 && (
        <form className={classes.navList} onSubmit={submitNewListHandler}>
          <i className='lg material-icons'>add</i>
          <input
            className={classes.inputList}
            placeholder='New List'
            type='text'
            ref={newListValue}
          />
        </form>
      )}
      {maxListSizeReached && showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className='text-danger fs-1'>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-info fs-2'>
            No more than 1 new list allowed for the moment!
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              className='fs-3'
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </nav>
  );
};

export default React.memo(Navigation);
