import type { NavigateFunction } from "react-router";

const pathRedirect = (
  pathname: string,
  isAuthenticated: boolean,
  navigate: NavigateFunction
) => {
  switch (isAuthenticated) {
    case false:
      const isCorrectPath: boolean = ["/", "/login", "register"].includes(
        pathname
      );
      !isCorrectPath && navigate("/login");
      break;
    case true:
      const isWrongPath: boolean = ["/login", "/register"].includes(pathname);
      isWrongPath && navigate("/");
      break;
    default:
      break;
  }
};

export default pathRedirect;
