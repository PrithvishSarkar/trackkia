// import React from "react";
import { Col, Row } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import AddTasksBody from "../../Components/TaskComponents/AddTasksBody.tsx";

const AddTasksPage = () => {
  return (
    <Layout>
      <Row className="h-100 overflow-auto">
        <Col xs={12} lg={6}> <AddTasksBody use="add" /> </Col>
        <Col xs={12} lg={6} className="d-none d-md-flex">This is second column</Col>
      </Row>
    </Layout>
  )
};

export default AddTasksPage;
