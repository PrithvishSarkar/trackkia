import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  GetTaskAnalyticsSliceInitialState as InitialStateInterface,
  PriorityAnalytics as PriorityAnalyticsInterface,
  StatusAnalytics as StatusAnalyticsInterface,
} from "@/interfaces.js";

const initialState: InitialStateInterface = {
  statusAnalytics: [],
  priorityAnalytics: [],
  totalTasks: 0,
};

const getAnalyticsSlice = createSlice({
  name: "taskAnalytics",
  initialState,
  reducers: {
    setStatusAnalytics: (
      state: InitialStateInterface,
      action: PayloadAction<StatusAnalyticsInterface[]>,
    ) => {
      state.statusAnalytics = action.payload;
    },
    setPriorityAnalytics: (
      state: InitialStateInterface,
      action: PayloadAction<PriorityAnalyticsInterface[]>,
    ) => {
      state.priorityAnalytics = action.payload;
    },
    setTotalTasks: (
      state: InitialStateInterface,
      action: PayloadAction<number>,
    ) => {
      state.totalTasks = action.payload;
    },
    reset: (state: InitialStateInterface) => {
      state.statusAnalytics = [];
      state.priorityAnalytics = [];
      state.totalTasks = 0;
    },
  },
});

export const {
  setStatusAnalytics,
  setPriorityAnalytics,
  setTotalTasks,
  reset,
} = getAnalyticsSlice.actions;

export default getAnalyticsSlice.reducer;
