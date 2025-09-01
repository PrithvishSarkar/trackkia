import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import TaskCard from "../../Components/TaskComponents/TaskCard.tsx";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import PaginationList from "../../Components/TaskComponents/PaginationList.tsx";
import fetchTasksList from "../../helperFunctions/fetchTasks.js";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import dateToString from "../../helperFunctions/dateToString.js";

const AllTasksPage = () => {
  const { pageNumber, taskList } = useSelector((state: RootState) => state.taskList);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    fetchTasksList(pageNumber, dispatch);
  }, []);

  return (
    <Layout>
      <Row className="px-2">
        {taskList.map((task, index) => {
          const startingDate = dateToString(task.startingDate);
          const deadline = dateToString(task.deadline);
          return (
            <Col xs={12} md={6} lg={4} id={index} className="py-2">
              <TaskCard
                title={task.title}
                description={task.description}
                priority={task.priority}
                startingDate={startingDate}
                deadline={deadline}
                preview={false}
              />
            </Col>
          );
        })}
      </Row>
      <PaginationList taskListLength={taskList.length} />
    </Layout>
  );
};

export default AllTasksPage;
