import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal, Image, Container } from "react-bootstrap";
import TaskCard from "../../Components/TaskComponents/TaskCard.tsx";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import PaginationList from "../../Components/TaskComponents/PaginationList.tsx";
import fetchTasksList from "../../helperFunctions/fetchTasks.js";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import dateToString from "../../helperFunctions/dateToString.js";
import AddEditTaskForm from "../../Components/TaskComponents/AddEditTasksForm.tsx";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";
import { reset } from "../../redux-toolkit/reduxSlices/taskFormSlice.js";
import { setShowEditModal } from "../../redux-toolkit/reduxSlices/editTaskSlice.js";

const AllTasksPage = () => {
  const { theme } = useThemeContext();
  const isThemeDark = theme === "dark";

  const { pageNumber, taskList } = useSelector(
    (state: RootState) => state.taskList
  );
  const { showEditModal } = useSelector((state: RootState) => state.editTask);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    fetchTasksList(pageNumber, dispatch);
  }, []);

  return (
    <Layout>
      {/* Edit Task Modal */}
      <Modal
        show={showEditModal}
        size="lg"
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => {
          dispatch(reset());
          dispatch(setShowEditModal(false));
        }}
      >
        <Modal.Header
          closeButton
          className={`${isThemeDark && "bg-secondary"}`}
        >
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isThemeDark && "bg-dark"}`}>
          <AddEditTaskForm isThemeDark={isThemeDark} use="edit" />
        </Modal.Body>
      </Modal>

      {/* Display Task List - provided it exists */}
      <Row className="px-2">
        {taskList &&
          taskList.length > 0 &&
          taskList.map((task, index) => {
            const startingDate = dateToString(task.startingDate);
            const deadline = dateToString(task.deadline);
            return (
              <Col xs={12} md={6} lg={4} key={index} className="py-2">
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  status={task.status}
                  startingDate={startingDate}
                  deadline={deadline}
                  preview={false}
                />
              </Col>
            );
          })}
      </Row>

      {/* Navigation using Pagination */}
      {taskList && taskList.length > 0 && (
        <PaginationList taskListLength={taskList.length} />
      )}

      {/* 404 Not Found to be displayed when there's no task list data */}
      {(!taskList || taskList.length === 0) && (
        <Container
          fluid
          className="h-100 overflow-hidden d-flex align-items-center justify-content-center"
        >
          <Image
            fluid
            src="/not-found-image-transparent.png"
            alt="Not Found Image"
          />
        </Container>
      )}
    </Layout>
  );
};

export default AllTasksPage;
