import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  title: string;
  description: string;
  priority: string | "Low Priority" | "Medium Priority" | "High Priority";
  deadline: string;
  loading: boolean;
}

const initialState: InitialStateType = {
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
    setTitle: (state: InitialStateType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.description = action.payload;
    },
    setPriority: (state: InitialStateType, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },
    setDeadline: (state: InitialStateType, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    setLoading: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state: InitialStateType) => {
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
