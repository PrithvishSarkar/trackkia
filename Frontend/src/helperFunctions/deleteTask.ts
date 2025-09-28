import React from "react";
import { toast } from "react-toastify";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import { setTaskList } from "../redux-toolkit/reduxSlices/getTasksSlice.js";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: string;
  deadline: string;
}

const handleDeleteTask = async (
  id: number,
  dispatch: AppDispatch,
  taskList: TaskType[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const DELETE_TASK_PATH = import.meta.env.VITE_DELETE_TASK_PATH;
  const API_CALL_URL = BACKEND_URL + DELETE_TASK_PATH + `/${id}`;

  try {
    setLoading(true);
    const response = await (
      await fetch(API_CALL_URL, {
        method: "DELETE",
        credentials: "include",
      })
    ).json();

    switch (response.status) {
      case "failure":
        toast.error(response.message);
        break;
      case "success":
        toast.success(response.message);
        const taskId = response.taskId;
        const updatedTaskList = taskList.filter((task) => task.id !== taskId);
        dispatch(setTaskList(updatedTaskList));
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Delete Task API Call Error", err);
    toast.error("API Call or Database Error during task deletion!");
  }
  setLoading(false);
};

export default handleDeleteTask;
