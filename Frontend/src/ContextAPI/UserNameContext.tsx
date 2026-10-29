import React from "react";
import type { CreateUserNameContext } from "@/interfaces.js";

/* ===== Creating and Exporting Context API ===== */
const UserNameContext = React.createContext<CreateUserNameContext>({
  userName: "",
  setUserName: () => {},
});
export const useUserNameContext = () => React.useContext(UserNameContext);

/* ===== Wrapping Context API Provider within a Functional Component ===== */
interface UserNameContextWrapperProp {
  children: React.ReactNode;
}
const UserNameContextWrapper = ({ children }: UserNameContextWrapperProp) => {
  const [userName, setUserName] = React.useState("");
  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameContextWrapper;
