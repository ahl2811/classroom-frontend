import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";
import { SERVER_URL } from "./constants";
import { IUser } from "./types";

export const getToken = () => {
  const user: IUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  return user?.accessToken || "";
};

export const getAuthorization = () => {
  console.log("Token", getToken());
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
