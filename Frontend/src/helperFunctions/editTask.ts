import {
  setShowEditModal,
  setTaskId,
} from "@/redux-toolkit/reduxSlices/editTaskSlice.js";
import {
  setTitle,
  setDescription,
  setPriority,
  setDeadline,
} from "@/redux-toolkit/reduxSlices/taskFormSlice.js";
import type { AppDispatch } from "@/redux-toolkit/reduxStore.js";
import type { TaskDetail } from "@/interfaces.js";

const handleEditTask = (
  taskId: number,
  dispatch: AppDispatch,
  taskList: TaskDetail[]
) => {
  dispatch(setShowEditModal(true));
  dispatch(setTaskId(taskId));

  // Find the particular task and
  taskList.forEach((task: TaskDetail) => {
    if (task.id === taskId) {
      dispatch(setTitle(task.title));
      dispatch(setDescription(task.description));
      dispatch(setPriority(task.priority));
      dispatch(setDeadline(task.deadline));
    }
  });
};

export default handleEditTask;
