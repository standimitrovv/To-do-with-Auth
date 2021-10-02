import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MyDay from '../navigation/MyDay';
import Important from '../navigation/Important';
import NewList from '../tasks/NewList';

const Content = () => {
  const myDayIsVisible = useSelector((state) => state.myDay.isVisible);
  const importantIsVisible = useSelector((state) => state.important.isVisible);
  const newListIsVisible = useSelector((state) => state.newList.isVisible);
  return (
    <Fragment>
      {myDayIsVisible && !importantIsVisible && <MyDay />}
      {importantIsVisible && !myDayIsVisible && <Important />}
      {newListIsVisible && !myDayIsVisible && !importantIsVisible && (
        <NewList />
      )}
    </Fragment>
  );
};

export default Content;
