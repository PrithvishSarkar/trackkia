import { toast } from "react-toastify";
import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import { reset } from "../redux-toolkit/reduxSlices/taskFormSlice.js";
import { setTaskList } from "../redux-toolkit/reduxSlices/getTasksSlice.js";
import dateToString from "./dateToString.js";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: string;
  deadline: string;
}

const handleAddEditTaskFormSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  use: "add" | "edit",
  title: string,
  description: string,
  priority: string | "Low Priority" | "Medium Priority" | "High Priority",
  deadline: string,
  dispatch: AppDispatch,
  taskId?: number,
  taskList?: TaskType[]
) => {
  e.preventDefault();

  // Check if all the inputs are correct or not.
  if (
    !title.trim() ||
    !description.trim() ||
    priority === "--SELECT--" ||
    !deadline.trim()
  ) {
    toast.warn("Invalid Input. \nPlease fill all the fields properly!");
    return;
  }

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

  // Check if Starting Date is less than Deadline or not.
  const dateDifference =
    new Date(deadline).getTime() - new Date(startingDate).getTime();
  if (dateDifference < 0) {
    toast.warn("Deadline must be later than Starting Date.");
    return;
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const ADD_TASK_PATH = import.meta.env.VITE_ADD_TASK_PATH;
  const EDIT_TASK_PATH = import.meta.env.VITE_EDIT_TASK_PATH;
  const API_CALL_URL =
    BACKEND_URL +
    (use === "add" ? ADD_TASK_PATH : EDIT_TASK_PATH + `/${taskId}`);

  const API_CALL_METHOD = use === "add" ? "POST" : "PATCH";

  // Making API call to Backend.
  const response = await (
    await fetch(API_CALL_URL, {
      method: API_CALL_METHOD,
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
      // Below `if` statement will only work for `edit` task.
      if (response.updatedTask) {
        const startingDate = dateToString(response.updatedTask.startingDate);
        const deadline = dateToString(response.updatedTask.deadline);
        if (taskList) {
          const updatedTaskList = taskList.map((task: TaskType) => {
            if (task.id === response.updatedTask.id) {
              interface UpdatedTaskDestructureType {
                id: number;
                title: string;
                description: string;
                priority: "Low Priority" | "Medium Priority" | "High Priority";
              }
              const {
                id,
                title,
                description,
                priority,
              }: UpdatedTaskDestructureType = response.updatedTask;
              return {
                id,
                title,
                description,
                priority,
                status: "Pending",
                startingDate,
                deadline,
              } as TaskType;
            } else return task;
          });
          dispatch(setTaskList(updatedTaskList));
        }
      }
      break;
    default:
      break;
  }

  // Reset all state variables.
  dispatch(reset());
};

export default handleAddEditTaskFormSubmit;
