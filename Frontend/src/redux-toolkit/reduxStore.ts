import { configureStore } from "@reduxjs/toolkit";
import authFormReducer from "./reduxSlices/authFormSlice.js";
import taskFormReducer from "./reduxSlices/taskFormSlice.js";
import taskListReducer from "./reduxSlices/getTasksSlice.js";
import taskAnalyticsReducer from "./reduxSlices/getAnalyticsSlice.js";
import editTaskReducer from "./reduxSlices/editTaskSlice.js";
import forgotPasswordReducer from "./reduxSlices/forgotPasswordSlice.js";
import resetPasswordReducer from "./reduxSlices/resetPasswordSlice.js";

const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    taskForm: taskFormReducer,
    taskList: taskListReducer,
    editTask: editTaskReducer,
    taskAnalytics: taskAnalyticsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
  }
});

// Below 2 exports are important when using 'useSelector' and 'useDispatch' Hooks.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
