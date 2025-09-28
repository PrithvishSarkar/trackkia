import React from "react";
import { Routes, Route } from "react-router";
import LandingPage from "./Pages/StaticPages/LandingPage";
import { useThemeContext } from "./ContextAPI/ThemeContext.tsx";
import LoginPage from "./Pages/AuthPages/LoginPage.tsx";
import RegisterPage from "./Pages/AuthPages/RegisterPage.tsx";
import AddTasksPage from "./Pages/TaskPages/AddTasksPage.tsx";
import AllTasksPage from "./Pages/TaskPages/AllTasksPage.tsx";
import AnalyticsPage from "./Pages/TaskPages/AnalyticsPage.tsx";
import NotFoundPage from "./Pages/StaticPages/NotFoundPage.tsx";
import { ToastContainer } from "react-toastify";
import fetchUserName from "./helperFunctions/fetchUserName.js";
import pathRedirect from "./helperFunctions/pathRedirect.js";
import { useUserNameContext } from "./ContextAPI/UserNameContext.tsx";
import { useLocation, useNavigate } from "react-router";

const App = () => {
  const { userName, setUserName } = useUserNameContext();
  const { theme } = useThemeContext();
  const { pathname }: { pathname: string } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchUserName(setUserName);
  }, []);

  React.useEffect(() => {
    pathRedirect(pathname, userName, navigate);
  }, [userName]);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "white" : "black";
  }, [theme]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-tasks" element={<AddTasksPage />} />
        <Route path="/all-tasks" element={<AllTasksPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
