// import React from 'react'
import AddEditTasksForm from "./AddEditTasksForm.tsx";
import styles from "../../Components/cssModules/taskForm.module.css";
import { useThemeContext } from "../../ContextAPI/ThemeContext.tsx";

const AddTasksBody = ({ use }: { use: "add" | "edit" }) => {
  const { theme } = useThemeContext();
  const isThemeDark = theme === "dark";

  return (
    <main
      className={`px-3 py-1 h-100 overflow-auto 
        d-flex flex-column align-items-stretch justify-content-center gap-4`}
    >
      <header
        className={`${styles.title} fw-semibold align-self-center ${
          isThemeDark && styles.titleDarkStyle
        }`}
      >
        What's your plan today?
      </header>
      <AddEditTasksForm isThemeDark={isThemeDark} use={use} />
    </main>
  );
};

export default AddTasksBody;
