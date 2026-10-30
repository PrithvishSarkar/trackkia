import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EditTaskModalDisplaySliceInitialState as InitialStateInterface } from "@/interfaces.js";

const initialState: InitialStateInterface = {
  showEditModal: false,
  taskId: -1,
};

const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    setShowEditModal: (
      state: InitialStateInterface,
      action: PayloadAction<boolean>,
    ) => {
      state.showEditModal = action.payload;
    },
    setTaskId: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.taskId = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.showEditModal = false;
      state.taskId = -1;
    },
  },
});

export const { setShowEditModal, setTaskId, reset } = editTaskSlice.actions;

export default editTaskSlice.reducer;
