import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StatusAnalyticsType {
  name: "Pending" | "In Progress" | "Completed";
  count: number;
}

interface PriorityAnalyticsType {
  name: "Low Priority" | "Medium Priority" | "High Priority";
  count: number;
}

interface InitialStateType {
  statusAnalytics: StatusAnalyticsType[];
  priorityAnalytics: PriorityAnalyticsType[];
  totalTasks: number;
}

const initialState: InitialStateType = {
  statusAnalytics: [],
  priorityAnalytics: [],
  totalTasks: 0,
};

const getAnalyticsSlice = createSlice({
  name: "taskAnalytics",
  initialState,
  reducers: {
    setStatusAnalytics: (
      state: InitialStateType,
      action: PayloadAction<StatusAnalyticsType[]>
    ) => {
      state.statusAnalytics = action.payload;
    },
    setPriorityAnalytics: (
      state: InitialStateType,
      action: PayloadAction<PriorityAnalyticsType[]>
    ) => {
      state.priorityAnalytics = action.payload;
    },
    setTotalTasks: (state: InitialStateType, action: PayloadAction<number>) => {
      state.totalTasks = action.payload;
    },
    reset: (state: InitialStateType) => {
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
