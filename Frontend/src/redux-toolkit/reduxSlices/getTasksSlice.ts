import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  GetAllTasksSliceInitialState as InitialStateInterface,
  TaskCardProp,
} from "@/interfaces.js";

const initialState: InitialStateInterface = {
  totalTasks: 0,
  totalPages: 1,
  pageNumber: 1,
  taskList: [],
};

const getTasksSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTotalTasks: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.totalTasks = action.payload;
    },
    setTotalPages: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.totalPages = action.payload;
    },
    setTaskList: (
      state: InitialStateInterface,
      action: PayloadAction<Omit<TaskCardProp, "preview">[]>,
    ) => {
      state.taskList = action.payload;
    },
    setPageNumber: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.pageNumber = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.totalTasks = 0;
      state.totalPages = 0;
      state.pageNumber = 0;
      state.taskList = [];
    },
  },
});

export const {
  setTotalTasks,
  setTotalPages,
  setTaskList,
  setPageNumber,
  reset,
} = getTasksSlice.actions;

export default getTasksSlice.reducer;
