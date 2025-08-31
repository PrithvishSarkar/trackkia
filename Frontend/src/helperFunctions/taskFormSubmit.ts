import { toast } from "react-toastify";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import { reset } from "../redux-toolkit/reduxSlices/taskFormSlice.js";

const handleAddTaskFormSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  use: "add" | "edit",
  title: string,
  description: string,
  priority: string,
  deadline: string,
  dispatch: AppDispatch,
) => {
  e.preventDefault();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ADD_TASK_PATH = import.meta.env.VITE_ADD_TASK_PATH;
  const EDIT_TASK_PATH = import.meta.env.VITE_EDIT_TASK_PATH;
  const API_CALL_URL =
    BACKEND_URL + (use === "add" ? ADD_TASK_PATH : EDIT_TASK_PATH);

  // Converting today's date into appropriate string.
  const date: Date = new Date();
  const localDate: string = date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const startingDate: string = localDate
    .split("/")
    .reverse()
    .map((ele, index) => {
      if (index === 0) return ele;
      else return ele.padStart(2, "0");
    })
    .join("-");

  // Making API call to Backend.
  const response = await (
    await fetch(API_CALL_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        startingDate,
        deadline,
      }),
    })
  ).json();

  switch (response.status) {
    case "failure":
      toast.error(response.message);
      break;
    case "success":
      toast.success(response.message);
      break;
    default:
      break;
  }

  // Reset all state variables.
  dispatch(reset());
};

export default handleAddTaskFormSubmit;
