import { toast } from "react-toastify";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import {
  setTotalTasks,
  setTotalPages,
  setTaskList,
  setPageNumber,
  reset,
} from "../redux-toolkit/reduxSlices/getTasksSlice.js";

const fetchTasksList = async (page: number, dispatch: AppDispatch) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ALL_TASKS_PATH = import.meta.env.VITE_ALL_TASK_PATH;
  const API_CALL_URL = BACKEND_URL + ALL_TASKS_PATH + `?page=${page}`;
  
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
      console.log(response.message);
      dispatch(setTotalTasks(response.totalTasks));
      dispatch(setTotalPages(response.totalPages));
      dispatch(setPageNumber(response.pageNumber));
      dispatch(setTaskList(response.taskList));
      break;
    default:
      break;
  }
};

export default fetchTasksList;
