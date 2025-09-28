const fetchUserName = async (
  setUserName: React.Dispatch<React.SetStateAction<string>>
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const GET_USERNAME_PATH = import.meta.env.VITE_GET_USERNAME_PATH;
  const API_CALL_URL = BACKEND_URL + GET_USERNAME_PATH;
  
  const response = await (
    await fetch(API_CALL_URL, {
      method: "GET",
      credentials: "include",
    })
  ).json();

  switch (response.status) {
    case "failure":
      setUserName("");
      break;
    case "success":
      setUserName(response.userName as string);
      break;
    default:
      break;
  }
};

export default fetchUserName;
