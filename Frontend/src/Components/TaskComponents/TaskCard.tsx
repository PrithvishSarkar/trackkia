import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { BsAlarm } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";

interface TaskCardPropType {
  title: string;
  description: string;
  priority: string | "Low Priority" | "Medium Priority" | "High Priority";
  startingDate: string;
  deadline: string;
  preview: boolean;
}

const TaskCard = ({
  title,
  description,
  priority,
  startingDate,
  deadline,
  preview,
}: TaskCardPropType) => {
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
                className={`my-1 d-flex align-items-center justify-content-start gap-2 text-${
                  index === 0 ? "primary" : "danger"
                }`}
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
          {["Edit Task", "Delete Task"].map((ele, index) => (
            <Col>
              <Button
                variant={index === 0 ? "success" : "danger"}
                className="w-100 fw-semibold"
                disabled={preview}
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
