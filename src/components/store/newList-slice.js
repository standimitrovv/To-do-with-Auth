import { createSlice } from '@reduxjs/toolkit';

const initState = {
  tasks: [],
  completed: [],
  isVisible: false,
  isTasking: false,
  isTouched: false,
};

const newListSlice = createSlice({
  name: 'newList',
  initialState: initState,
  reducers: {
    toggleComponent(state) {
      state.isVisible = true;
    },
    hideComponent(state) {
      state.isVisible = false;
    },
    setIsTasking(state) {
      state.isTasking = true;
    },
    setIsTouched(state) {
      state.isTasking = false;
      state.isTouched = true;
    },
    addTask(state, action) {
      const task = action.payload;
      state.tasks.push({
        task: task,
        id: Math.floor(Math.random() * 10000),
      });
    },
    removeTask(state, action) {
      const taskId = action.payload.id;
      const task = action.payload.item;

      const existingTask = state.completed.some((item) => item.task === task);
      if (existingTask) return;
      state.completed.push({
        task: task,
        taskId: taskId,
      });
      state.tasks = state.tasks.filter((item) => item.id !== taskId);
    },
    addTaskToImportant(state, action) {
      const taskName = action.payload;
      state.tasks = state.tasks.filter((task) => task.task !== taskName);
    },
  },
});

export const newListActions = newListSlice.actions;
export default newListSlice;
