// import React from 'react'
import AddTasksForm from "./AddTasksForm.tsx";
import styles from "../../Components/cssModules/taskForm.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";

const AddTasksBody = ({ use }: { use: "add" | "edit" }) => {
  const { theme } = useThemeContext();
  const isThemeDark = theme === "dark";

  return (
    <main
      className={`px-3 py-1 h-100 overflow-auto d-flex flex-column align-items-stretch justify-content-center fw-semibold ${
        styles.title
      } ${isThemeDark && styles.titleDarkStyle}`}
    >
      <header className="align-self-center">What's your plan today?</header>
      <AddTasksForm isThemeDark={isThemeDark} use={use} />
    </main>
  );
};

export default AddTasksBody;
