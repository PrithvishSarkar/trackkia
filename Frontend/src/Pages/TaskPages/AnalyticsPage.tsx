import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Layout from "../../Components/LayoutComponents/Layout.tsx";
import AnalyticsChart from "../../Components/TaskComponents/AnalyticsChart.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux-toolkit/reduxStore.js";
import fetchTasksAnalytics from "../../helperFunctions/fetchAnalytics.js";

const AnalyticsPage = () => {
  const { statusAnalytics, priorityAnalytics, totalTasks } = useSelector(
    (state: RootState) => state.taskAnalytics
  );

  const dispatch = useDispatch<AppDispatch>();
  // Setting the inner radius of Donut Chart according to browser size.
  const [innerRadius, setInnerRadius] = React.useState<number>(0);
  React.useEffect(() => {
    fetchTasksAnalytics(dispatch);
    if (window.innerWidth >= 1024) setInnerRadius(100);
    else setInnerRadius(80);
  }, []);
  React.useEffect(() => {
    if (window.innerWidth >= 1024) setInnerRadius(100);
    else setInnerRadius(80);
  }, [window.innerWidth]);

  return (
    <Layout>
      {/* Display Analytics as Pie Charts provided that analytics data is present */}
      {statusAnalytics && priorityAnalytics && (
        <Row className="h-100 overflow-auto">
          <Col xs={12} lg={6}>
            <AnalyticsChart
              title="Task Status"
              analyticsArray={statusAnalytics}
              totalTasks={totalTasks}
              innerRadius={innerRadius}
            />
          </Col>
          <Col xs={12} lg={6}>
            <AnalyticsChart
              title="Task Priority"
              analyticsArray={priorityAnalytics}
              totalTasks={totalTasks}
              innerRadius={innerRadius}
            />
          </Col>
        </Row>
      )}

      {/* 404 Not Found to be displayed when there's no analytics data present */}
      {(!statusAnalytics || !priorityAnalytics) && (
        <Container
          fluid
          className="h-100 overflow-hidden d-flex align-items-center justify-content-center"
        >
          <Image src="/not-found-image-transparent.png" alt="Not Found Image" />
        </Container>
      )}
    </Layout>
  );
};

export default AnalyticsPage;
