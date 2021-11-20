import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../common/constants";
import { ILoginResponse } from "../common/types";
import { request } from "../common/utils";
import useUserContext from "../hooks/useUserContext";
import { LoginSuccess } from "../store/actions";

const GoogleLoginButton = () => {
  const { dispatch } = useUserContext();

  const handleLoginGoogleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("Success", response);

    if ("accessToken" in response) {
      try {
        const { accessToken } = response;
        const { data } = await request.post<ILoginResponse>(
          "/google-authentication",
          { token: accessToken },
          { headers: { "Content-Type": "application/json" } }
        );
        if (data.user) {
          dispatch(LoginSuccess(data.user));
        }
      } catch (error) {}
    }
  };

  const handleLoginGoogleError = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("Fail", res);
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={handleLoginGoogleSuccess}
      onFailure={handleLoginGoogleError}
      cookiePolicy={"single_host_origin"}
      className="w-100 border-info rounded shadow-sm justify-content-center"
    />
  );
};

export default GoogleLoginButton;
