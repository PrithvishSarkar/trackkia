import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  showEditModal: boolean;
  taskId: number;
}

const initialState: InitialStateType = {
  showEditModal: false,
  taskId: -1,
};

const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    setShowEditModal: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.showEditModal = action.payload;
    },
    setTaskId: (state: InitialStateType, action: PayloadAction<number>) => {
      state.taskId = action.payload;
    },
    reset: (state: InitialStateType) => {
      state.showEditModal = false;
      state.taskId = -1;
    },
  },
});

export const { setShowEditModal, setTaskId, reset } =
  editTaskSlice.actions;

export default editTaskSlice.reducer;
