import classes from './MyDay.module.css';
import AddTaskBtn from '../UI/AddTaskBtn';
import { useSelector } from 'react-redux';
import InputTask from '../UI/InputTask';
import TasksList from '../tasks/TasksList';
import { Accordion } from 'react-bootstrap';

const MyDay = () => {
  const isTasking = useSelector((state) => state.myDay.isTasking);
  const tasks = useSelector((state) => state.myDay.tasks);
  const doneTasks = useSelector((state) => state.myDay.completed);

  const oneOrMore = doneTasks.length === 1 ? 'task' : 'tasks';

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  const date = new Date();
  const todaysDate = date.toLocaleDateString('en-us', dateOptions);

  return (
    <section className={classes.sectionDay}>
      <header className={classes.header}>
        <h1 className={classes.h1Day}>My Day</h1>
        <p className={classes.date}>{todaysDate}</p>
      </header>
      <main className={classes.main}>
        {!isTasking && <AddTaskBtn />}
        {isTasking && <InputTask />}
        {tasks.map((task, i) => (
          <TasksList key={task.id} id={task.id} item={task.task} />
        ))}
        {doneTasks.length > 0 && (
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                <h3 className='ms-4 ps-3'>
                  <strong>
                    You have done {doneTasks.length} {oneOrMore}
                  </strong>
                </h3>
              </Accordion.Header>
              {doneTasks.map((task, i) => (
                <Accordion.Body key={task.taskId} className='d-flex'>
                  <p>{i + 1}:</p>
                  <p className='ms-3'>{task.task}</p>
                </Accordion.Body>
              ))}
            </Accordion.Item>
          </Accordion>
        )}
      </main>
    </section>
  );
};
export default MyDay;
