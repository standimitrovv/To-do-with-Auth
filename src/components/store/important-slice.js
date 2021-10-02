import { createSlice } from '@reduxjs/toolkit';

const initState = {
  tasks: [],
  completed: [],
  isVisible: false,
  isTasking: false,
  isTouched: false,
};

const importantSlice = createSlice({
  name: 'important',
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
      const taskName = action.payload.item;
      const taskId = action.payload.id;

      const existingItem = state.completed.find((task) => task.id === taskId);
      if (existingItem) return;
      state.completed.push({
        task: taskName,
        id: taskId,
      });

      state.tasks = state.tasks.filter((item) => item.id !== taskId);
    },
  },
});

export const importantActions = importantSlice.actions;
export default importantSlice;
