import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: string;
  deadline: string;
}

interface InitialStateType {
  totalTasks: number;
  totalPages: number;
  pageNumber: number;
  taskList: TaskType[];
}

const initialState: InitialStateType = {
  totalTasks: 0,
  totalPages: 1,
  pageNumber: 1,
  taskList: [],
};

const getTasksSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTotalTasks: (state: InitialStateType, action: PayloadAction<number>) => {
      state.totalTasks = action.payload;
    },
    setTotalPages: (state: InitialStateType, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTaskList: (
      state: InitialStateType,
      action: PayloadAction<TaskType[]>
    ) => {
      state.taskList = action.payload;
    },
    setPageNumber: (state: InitialStateType, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    reset: (state: InitialStateType) => {
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
