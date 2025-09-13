import {
  setShowEditModal,
  setTaskId,
} from "../redux-toolkit/reduxSlices/editTaskSlice.js";
import {
  setTitle,
  setDescription,
  setPriority,
  setDeadline,
} from "../redux-toolkit/reduxSlices/taskFormSlice.js";
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

const handleEditTask = (
  taskId: number,
  dispatch: AppDispatch,
  taskList: TaskType[]
) => {
  dispatch(setShowEditModal(true));
  dispatch(setTaskId(taskId));

  // Find the particular task and
  taskList.forEach((task: TaskType) => {
    if (task.id === taskId) {
      dispatch(setTitle(task.title));
      dispatch(setDescription(task.description));
      dispatch(setPriority(task.priority));
      dispatch(setDeadline(task.deadline));
    }
  });
};

export default handleEditTask;
