import styles from "../../Components/cssModules/taskForm.module.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import {
  setTitle,
  setDescription,
  setPriority,
  setDeadline,
} from "../../redux-toolkit/reduxSlices/taskFormSlice.js";
import handleAddEditTaskFormSubmit from "../../helperFunctions/taskFormSubmit.js";

interface AddTasksPageParametersType {
  isThemeDark: boolean;
  use: "add" | "edit";
  taskId?: number;
}

const AddEditTaskForm = ({
  isThemeDark,
  use,
  taskId,
}: AddTasksPageParametersType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, description, priority, deadline } = useSelector(
    (state: RootState) => state.taskForm
  );
  const { taskList } = useSelector((state: RootState) => state.taskList);

  return (
    <Form
      className="d-flex flex-column align-stretch justify-content-center gap-4"
      onSubmit={(e) =>
        handleAddEditTaskFormSubmit(
          e,
          use,
          title,
          description,
          priority,
          deadline,
          dispatch,
          taskId,
          taskList
        )
      }
    >
      {/* Title Form Group */}
      <InputGroup>
        <InputGroup.Text
          className={`${styles.inputGroupText} text-secondary ${
            isThemeDark && styles.inputGroupTextDarkStyle
          }`}
        >
          Title
        </InputGroup.Text>
        <Form.Control
          type="text"
          maxLength={25}
          required
          className={`${styles.formInput} text-primary ${
            isThemeDark && styles.formInputDarkStyle
          }`}
          placeholder="Thermodynamics Assignment"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </InputGroup>

      {/* Description Form Group */}
      <InputGroup>
        <InputGroup.Text
          className={`${styles.inputGroupText} text-secondary ${
            isThemeDark && styles.inputGroupTextDarkStyle
          }`}
        >
          Description
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          required
          maxLength={100}
          className={`${styles.formInput} text-primary ${
            isThemeDark && styles.formInputDarkStyle
          }`}
          placeholder="sed quidem optio consequuntur..."
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        />
      </InputGroup>

      {/* Priority From Group */}
      <InputGroup>
        <InputGroup.Text
          className={`${styles.inputGroupText} text-secondary ${
            isThemeDark && styles.inputGroupTextDarkStyle
          }`}
        >
          Priority
        </InputGroup.Text>
        <Form.Select
          required
          value={priority}
          onChange={(e) => dispatch(setPriority(e.target.value))}
          className={`${styles.formInput} text-primary ${
            isThemeDark && styles.formInputDarkStyle
          }`}
        >
          {[
            "--SELECT--",
            "Low Priority",
            "Medium Priority",
            "High Priority",
          ].map((option, index) => (
            <option
              value={option}
              className={`${isThemeDark ? "bg-dark" : "bg-light"}`}
              key={index}
            >
              {option}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      {/* Deadline Form Group */}
      <InputGroup>
        <InputGroup.Text
          className={`${styles.inputGroupText} text-secondary ${
            isThemeDark && styles.inputGroupTextDarkStyle
          }`}
        >
          Deadline
        </InputGroup.Text>
        <Form.Control
          type="date"
          required
          value={deadline}
          onChange={(e) => dispatch(setDeadline(e.target.value))}
          className={`${styles.formInput} text-primary ${
            isThemeDark && styles.formInputDarkStyle
          }`}
        />
      </InputGroup>

      {/* Add Task Button */}
      <Button
        type="submit"
        className={`align-self-start bg-success border-success rounded-pill 
          px-5 fw-bold fs-5 text-dark`}
        style={{ paddingBottom: "0.5rem" }}
      >
        <span> {use === "add" ? "Add Task" : "Edit Task"} </span>
        &nbsp;
        <FaArrowRightLong />
      </Button>
    </Form>
  );
};

export default AddEditTaskForm;
