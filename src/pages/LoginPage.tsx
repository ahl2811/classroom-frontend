import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Row, Spinner, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../api/user";
import { USER } from "../common/constants";
import { IErrorResponse, LocationState } from "../common/types";
import GoogleLoginButton from "../components/GoogleLoginButton";
import {
  GradientBackground,
  StyledContainer,
} from "../components/styled/CommonStyle";
import { LoginSuccess } from "../store/actions";
import { store } from "../store/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(store);
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (user) {
      history.replace(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { isLoading: loading, mutateAsync: Login } = useMutation(
    USER.LOGIN,
    login,
    {
      onSuccess: (response) => {
        const user = {
          ...response.data,
          avatar: `https://ui-avatars.com/api/?name=${response.data.name}&background=0D8ABC&color=fff`,
        };
        dispatch(LoginSuccess(user));
      },
      onError: (err: IErrorResponse) => {
        console.log(err);
        // if (!err.response?.data) return;
        // const { message } = err.response.data;
        // if (message) {
        //   toast.error(message, {
        //     position: "top-center",
        //     autoClose: 3000,
        //   });
        // }
        toast.error("Error");
      },
    }
  );

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login({ email, password });
  };

  return (
    <GradientBackground className="d-flex align-items-center">
      <ToastContainer />
      <StyledContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h2>Login</h2>
          </Row>
          <Row>
            <Form onSubmit={(e) => handleLogin(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Input your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 mt-3 mb-2"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Please wait...
                    </>
                  ) : (
                    <>Sign In</>
                  )}
                </Button>
                <Form.Label>Or you can</Form.Label>
                <GoogleLoginButton />
              </Form.Group>
              <Form.Group className="mt-3 text-center">
                Don't have account yet? <Link to="/register">Register now</Link>
              </Form.Group>
            </Form>
          </Row>
        </Stack>
      </StyledContainer>
    </GradientBackground>
  );
};

export default LoginPage;
