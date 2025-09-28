import type { AppDispatch } from "../redux-toolkit/reduxStore.js";
import { setLoading, reset } from "../redux-toolkit/reduxSlices/authFormSlice.js";
import { toast } from "react-toastify";
import type { NavigateFunction } from "react-router";
import type React from "react";

const handleAuthFormSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  isRoleRegister: boolean,
  name: string,
  email: string,
  password: string,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
) => {
  e.preventDefault();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const REGISTER_API_PATH = import.meta.env.VITE_REGISTER_API_PATH;
  const LOGIN_API_PATH = import.meta.env.VITE_LOGIN_API_PATH;
  const API_CALL_URL =
    BACKEND_URL + (isRoleRegister ? REGISTER_API_PATH : LOGIN_API_PATH);

  // Making an API Call to send form's data to Backend.
  try {
    dispatch(setLoading(true));
    const response = await (
      await fetch(API_CALL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      })
    ).json();

    switch (response.status) {
      case "failure":
        toast.error(response.message);
        setUserName("");
        break;
      case "success":
        toast.success(response.message);
        setTimeout(() => {
          navigate("/add-tasks");
        }, 0);
        setUserName(response.userName);
        break;
      default:
        break;
    }
  } catch (err) {
    toast.error("Some error occured while registration!");
    console.error("Registration Error Frontend: ", err);
  }

  // Cleaning up 'authForm' Redux states.
  dispatch(reset());
};

export default handleAuthFormSubmit;
