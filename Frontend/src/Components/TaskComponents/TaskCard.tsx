import styles from "../cssModules/taskCard.module.css";
import { Button, Card, Row, Col, Badge, Stack } from "react-bootstrap";
import { BsAlarm } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import { useDispatch, useSelector } from "react-redux";
import { useThemeContext } from "../../ContextAPI/ThemeContext.js";
import handleEditTask from "../../helperFunctions/editTask.js";
import handleDeleteTask from "../../helperFunctions/deleteTask.js";
import handleTaskStatusChange from "../../helperFunctions/taskStatusChange.js";

interface TaskCardPropType {
  id: number;
  title: string;
  description: string;
  priority: string | "Low Priority" | "Medium Priority" | "High Priority";
  status: "Pending" | "In Progress" | "Completed";
  startingDate: string;
  deadline: string;
  preview: boolean;
}

const TaskCard = ({
  id,
  title,
  description,
  priority,
  status,
  startingDate,
  deadline,
  preview,
}: TaskCardPropType) => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";

  const dispatch = useDispatch<AppDispatch>();
  const { taskList } = useSelector((state: RootState) => state.taskList);

  return (
    <Card
      className={`${
        preview && "user-select-none"
      } border border-secondary bg-transparent`}
    >
      <Card.Body>
        <Card.Title
          className={`text-center border-bottom border-2 border-primary rounded-pill pb-1 ${
            isThemeDark ? styles.textDarkStyle : styles.textLightStyle
          } ${isThemeDark && "border-warning"}`}
          style={{ fontSize: "1.5rem" }}
        >
          {title}
        </Card.Title>

        <Row className="my-3">
          <Col xs={6}>
            {[startingDate, deadline].map((date: string, index: number) => (
              <Card.Subtitle
                key={index}
                className={`my-1 d-flex align-items-center justify-content-start gap-2 
                  text-${
                    index === 0 ? (isThemeDark ? "info" : "primary") : "danger"
                  }`}
                style={{ fontSize: "1.125rem" }}
              >
                {index === 0 ? <FaClockRotateLeft /> : <BsAlarm />}
                <span>{date}</span>
              </Card.Subtitle>
            ))}
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column align-items-stretch justify-content-center"
          >
            <Badge pill bg="secondary" style={{ maxWidth: "100%" }}>
              {priority}
            </Badge>
          </Col>
        </Row>

        {/* Task Status Buttons */}
        <Stack
          direction="horizontal"
          gap={1}
          className="d-flex justify-content-between my-3"
        >
          {(
            ["Pending", "In Progress", "Completed"] as Array<
              "Pending" | "In Progress" | "Completed"
            >
          ).map(
            (
              taskStatus: "Pending" | "In Progress" | "Completed",
              index: number
            ) => (
              <Button
                key={index}
                variant={status === taskStatus ? "info" : "outline-secondary"}
                className="fw-bold rounded-pill"
                style={{ fontSize: "0.875rem" }}
                disabled={preview}
                onClick={() =>
                  handleTaskStatusChange(id, taskStatus, dispatch, taskList)
                }
              >
                {taskStatus}
              </Button>
            )
          )}
        </Stack>

        <Card.Text
          className={`fst-italic border-start border-2 border-primary ps-2 fw-semibold ${
            isThemeDark ? styles.textDarkStyle : styles.textLightStyle
          } ${isThemeDark && "border-warning"}`}
          style={{ fontSize: "0.875rem" }}
        >
          {description}
        </Card.Text>

        <Row>
          {(
            ["Edit Task", "Delete Task"] as Array<"Edit Task" | "Delete Task">
          ).map((btnText: "Edit Task" | "Delete Task", index: number) => {
            const handleClick = () => {
              switch (btnText) {
                case "Edit Task":
                  return handleEditTask(id, dispatch, taskList);
                case "Delete Task":
                  return handleDeleteTask(id, dispatch, taskList);
                default:
                  return;
              }
            };
            return (
              <Col key={index}>
                <Button
                  variant={btnText === "Edit Task" ? "success" : "danger"}
                  className="w-100 fw-semibold"
                  disabled={preview}
                  onClick={handleClick}
                >
                  {btnText}
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
