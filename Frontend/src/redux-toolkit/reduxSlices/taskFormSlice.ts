import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  title: string;
  description: string;
  priority: string | "Low Priority" | "Medium Priority" | "High Priority";
  deadline: string;
}

const initialState: initialStateType = {
  title: "",
  description: "",
  priority: "--SELECT--",
  deadline: "",
};

const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    setTitle: (state: initialStateType, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state: initialStateType, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPriority: (state: initialStateType, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },
    setDeadline: (state: initialStateType, action: PayloadAction<string>) => {
      state.deadline = action.payload;
    },
    reset: (state: initialStateType) => {
      state.title = "";
      state.description = "";
      state.priority = "--SELECT--";
      state.deadline = "";
    },
  },
});

export const { setTitle, setDescription, setPriority, setDeadline, reset } =
  taskFormSlice.actions;

export default taskFormSlice.reducer;