import type React from "react";
import type { NavigateFunction } from "react-router";
import { toast } from "react-toastify";

const logoutUser = async (
  navigate: NavigateFunction,
  setUserName: React.Dispatch<React.SetStateAction<string>>
) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const LOGOUT_API_PATH = import.meta.env.VITE_LOGOUT_API_PATH;
  const API_CALL_URL = BACKEND_URL + LOGOUT_API_PATH;

  const response = await (
    await fetch(API_CALL_URL, {
      method: "POST",
      credentials: "include",
    })
  ).json();

  if (response.status === "success") {
    toast.success(response.message);
    setTimeout(() => {
      navigate("/");
    }, 0);
    setUserName("");
  } else toast.error("Problem Logging Out!");
};

export default logoutUser;
