import { toast } from "react-toastify";
import {
  setStatusAnalytics,
  setPriorityAnalytics,
  setTotalTasks,
  reset,
} from "../redux-toolkit/reduxSlices/getAnalyticsSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

const fetchTasksAnalytics = async (dispatch: AppDispatch) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ANALYTICS_PATH = import.meta.env.VITE_ANALYTICS_PATH;
  const API_CALL_URL = BACKEND_URL + ANALYTICS_PATH;
  const response = await (
    await fetch(API_CALL_URL, {
      method: "GET",
      credentials: "include",
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      dispatch(reset());
      break;
    case "success":
      // toast.success(response.message);
      dispatch(setStatusAnalytics(response.statusAnalytics));
      dispatch(setPriorityAnalytics(response.priorityAnalytics));
      dispatch(setTotalTasks(response.totalTasks));
      break;
    default:
      break;
  }
};

export default fetchTasksAnalytics;
