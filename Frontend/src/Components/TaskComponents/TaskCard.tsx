import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { BsAlarm } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import handleDeleteTask from "../../helperFunctions/deleteTask.js";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import { useDispatch, useSelector } from "react-redux";
import type React from "react";

interface TaskCardPropType {
  id: number;
  title: string;
  description: string;
  priority: string | "Low Priority" | "Medium Priority" | "High Priority";
  startingDate: string;
  deadline: string;
  preview: boolean;
  setShowEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTaskId?: React.Dispatch<React.SetStateAction<number>>;
}

const TaskCard = ({
  id,
  title,
  description,
  priority,
  startingDate,
  deadline,
  preview,
  setShowEditModal,
  setEditTaskId,
}: TaskCardPropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { taskList } = useSelector((state: RootState) => state.taskList);

  const handleEdit = (id: number) => {
    setShowEditModal !== undefined && setShowEditModal(true);
    setEditTaskId !== undefined && setEditTaskId(id);
  };

  return (
    <Card
      style={{ backgroundColor: "#fffbeb" }}
      className={`${preview && "user-select-none"}`}
    >
      <Card.Body>
        <Card.Title
          className="text-center border-bottom border-2 border-primary rounded-pill pb-1"
          style={{ fontSize: "1.5rem", color: "#4338ca" }}
        >
          {title}
        </Card.Title>

        <Row className="my-3">
          <Col xs={6}>
            {[startingDate, deadline].map((ele, index) => (
              <Card.Subtitle
                className={`my-1 d-flex align-items-center justify-content-start gap-2 
                  text-${index === 0 ? "primary" : "danger"}`}
                style={{ fontSize: "1.125rem" }}
              >
                {index === 0 ? <FaClockRotateLeft /> : <BsAlarm />}
                <span>{ele}</span>
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

        <Card.Text
          className="fst-italic border-start border-2 border-secondary ps-2 fw-semibold"
          style={{ fontSize: "0.875rem" }}
        >
          {description}
        </Card.Text>

        <Row>
          {["Edit Task", "Delete Task"].map((ele: string, index: number) => (
            <Col>
              <Button
                variant={index === 0 ? "success" : "danger"}
                className="w-100 fw-semibold"
                disabled={preview}
                onClick={() => {
                  index === 0 && ele === "Edit Task" && handleEdit(id);
                  index === 1 &&
                    ele === "Delete Task" &&
                    handleDeleteTask(id, dispatch, taskList);
                }}
              >
                {ele}
              </Button>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
