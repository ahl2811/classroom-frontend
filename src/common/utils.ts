import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";
import { toast } from "react-toastify";
import { SERVER_URL } from "./constants";
import { IErrorResponse, IUser } from "./types";

export const getToken = () => {
  const user: IUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  return user?.accessToken || "";
};

export const getAuthorization = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  };
  return { headers };
};

export const request = axios.create({
  baseURL: `${SERVER_URL}`,
});

export const refreshTokenGoogle = (res: GoogleLoginResponse) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000; //fresh after 55min

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

export const toastError = (
  error: IErrorResponse,
  altMessage: string = "Something were wrong!"
) => {
  if (!error.response?.data?.message) {
    toast.error(altMessage);
    return;
  }
  const { message } = error.response.data;
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 3000,
  });
};

export const getRandomImageLink = () => {
  // const colors = ["008080", "006666", "004c4c"];
  // const colors = ["008080"];
  // const index = Math.floor(Math.random() * colors.length);
  return `https://www.gstatic.com/classroom/themes/img_concert.jpg`;
};

export const getAvatarUrl = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
};
