import { Row, Col } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import AddTasksBody from "../../Components/TaskComponents/AddTasksBody.tsx";
import TaskCard from "../../Components/TaskComponents/TaskCard.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux-toolkit/reduxStore.ts";
import styles from "../../Components/cssModules/taskForm.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";

const AddTasksPage = () => {
  const { theme } = useThemeContext();
  const isThemeDark = theme === "dark";
  const { title, description, priority, deadline } = useSelector(
    (state: RootState) => state.taskForm
  );

  // Calculating Starting Date (Today) and converting it into appropriate string.
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

  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col xs={12} md={8}>
          <AddTasksBody use="add" />
        </Col>
        <Col xs={12} md={4} className="d-none d-md-block">
          <main
            className="pe-3 h-100 overflow-auto 
            d-flex flex-column align-items-stretch justify-content-center gap-3"
          >
            <header
              className={`${styles.title} fw-semibold align-self-center ${
                isThemeDark && styles.titleDarkStyle
              }`}
            >
              Task Preview
            </header>
            <TaskCard
              id={0}
              title={title}
              description={description}
              priority={priority}
              status="Pending"
              startingDate={startingDate}
              deadline={deadline}
              preview={true}
            />
          </main>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddTasksPage;
