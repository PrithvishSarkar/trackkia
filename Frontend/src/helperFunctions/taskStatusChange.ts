import { toast } from "react-toastify";
import { setTaskList } from "../redux-toolkit/reduxSlices/getTasksSlice.js";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: string;
  deadline: string;
}

const handleTaskStatusChange = async (
  id: number,
  status: "Pending" | "In Progress" | "Completed",
  dispatch: AppDispatch,
  taskList: TaskType[]
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const EDIT_STATUS_PATH = import.meta.env.VITE_EDIT_STATUS_PATH;
  const API_CALL_URL = BACKEND_URL + EDIT_STATUS_PATH + `/${id}`;
  const response = await (
    await fetch(API_CALL_URL, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "text/plain" },
      body: status,
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      break;
    case "success":
      toast.success(response.message);
      const updatedTaskList = taskList.map((task: TaskType) => {
        if (task.id === id) return { ...task, status: response.taskStatus };
        else return task;
      });
      dispatch(setTaskList(updatedTaskList));
      break;
    default:
      break;
  }
};

export default handleTaskStatusChange;
