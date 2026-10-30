import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskAddOrEditFormSliceInitialState as InitialStateInterface, TaskPriority } from "@/interfaces.js";

const initialState: InitialStateInterface = {
  title: "",
  description: "",
  priority: "--SELECT--",
  deadline: "",
  loading: false,
};

const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    setTitle: (state: InitialStateInterface, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.description = action.payload;
    },
    setPriority: (
      state: InitialStateInterface,
      action: PayloadAction<TaskPriority>,
    ) => {
      state.priority = action.payload;
    },
    setDeadline: (
      state: InitialStateInterface,
      action: PayloadAction<string>,
    ) => {
      state.deadline = action.payload;
    },
    setLoading: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.title = "";
      state.description = "";
      state.priority = "--SELECT--";
      state.deadline = "";
      state.loading = false;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setPriority,
  setDeadline,
  setLoading,
  reset,
} = taskFormSlice.actions;

export default taskFormSlice.reducer;
