import React from "react";
import { Button, Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router";
import Logo from "../../assets/images/logo-classroom.svg";
import { activeAccount } from "./api";
import { ActivationContainer, FullScreenContainer } from "./styles";

const ActivationPage = () => {
  const { search } = useLocation();
  const { push } = useHistory();
  const params = search.split("=");
  const token = params[1];

  const { isLoading, error } = useQuery("activation", () =>
    activeAccount(encodeURIComponent(token))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FullScreenContainer className="d-flex align-items-center">
      <ActivationContainer>
        <div className="join-class-container align-self-center">
          <div className="join-class-banner">
            <Image height={128} src={Logo} alt="logo" />
            <h2>Classroom</h2>
            <p>
              Classroom helps classes communicate, save time, and stay
              organized.
            </p>
          </div>
          <div className="text-center py-4 mt-4">
            {error ? (
              <p className="text-danger">This link is invalid or not exist.</p>
            ) : (
              <p className="text-success">
                Your account is verified successfully. Now you can login.
              </p>
            )}

            <Button
              className="classroom-btn my-4"
              onClick={() => push("/login")}
            >
              {error ? "Back to Login" : "Go to Login"}
            </Button>
          </div>
        </div>
      </ActivationContainer>
    </FullScreenContainer>
  );
};

export default ActivationPage;
