import { configureStore } from "@reduxjs/toolkit";
import authFormReducer from "./reduxSlices/authFormSlice.js";

const store = configureStore({
  reducer: {
    authForm: authFormReducer
  }
});

// Below 2 exports are important when using 'useSelector' and 'useDispatch' Hooks.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
