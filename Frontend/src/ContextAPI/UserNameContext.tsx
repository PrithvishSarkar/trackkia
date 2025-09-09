import React from "react";

interface UserNameContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}
const UserNameContext = React.createContext<UserNameContextType>({
  userName: "",
  setUserName: () => {},
});
export const useUserNameContext = () => React.useContext(UserNameContext);

interface UserNameContextWrapperType {
  children: React.ReactNode;
}
const UserNameContextWrapper: React.FC<UserNameContextWrapperType> = ({
  children,
}) => {
  const [userName, setUserName] = React.useState("");
  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export default UserNameContextWrapper;
