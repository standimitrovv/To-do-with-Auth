import AddTaskBtn from '../UI/AddTaskBtn';
import classes from './Important.module.css';
import { useSelector } from 'react-redux';
import InputTask from '../UI/InputTask';
import TasksList from '../tasks/TasksList';
import { Accordion } from 'react-bootstrap';

const Important = () => {
  const isTasking = useSelector((state) => state.important.isTasking);
  const tasks = useSelector((state) => state.important.tasks);
  const completedTasks = useSelector((state) => state.important.completed);

  const oneOrMore = completedTasks.length === 1 ? 'task' : 'tasks';

  const dateOptions = {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  };
  const date = new Date();
  const todaysDate = date.toLocaleDateString('en-us', dateOptions);
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <h1 className={classes.h1}>Important</h1>
        <p className={classes.date}>{todaysDate}</p>
      </header>
      <main className={classes.main}>
        {!isTasking && <AddTaskBtn />}
        {isTasking && <InputTask />}
        {tasks.map((task) => (
          <TasksList key={task.id} item={task.task} id={task.id} />
        ))}
        {completedTasks.length > 0 && (
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                <h3 className='ms-4 ps-3'>
                  <strong>
                    You have done {completedTasks.length} {oneOrMore}
                  </strong>
                </h3>
              </Accordion.Header>
              {completedTasks.map((task, i) => (
                <Accordion.Body key={task.id} className='d-flex'>
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

export default Important;
