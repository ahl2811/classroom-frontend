import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Row, Spinner, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../api/user";
import { USER } from "../common/constants";
import { IErrorResponse, LocationState } from "../common/types";
import {
  GradientBackground,
  StyledContainer,
} from "../components/styled/CommonStyle";
import { store } from "../store/store";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    state: { user },
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

  const { isLoading: loading, mutateAsync: Register } = useMutation(
    USER.REGISTER,
    register,
    {
      onSuccess: () => {
        toast.success("Register successfully. Now you can login!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      },
      onError: (err: IErrorResponse) => {
        const { message } = err.response.data;
        if (message) {
          toast.error(`${message}`, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      },
    }
  );

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không đúng");
      return;
    }
    Register({ email, name, password });
  };

  return (
    <GradientBackground className="d-flex align-items-center">
      <ToastContainer />
      <StyledContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h2>Register</h2>
          </Row>
          <Row>
            <Form onSubmit={(e) => handleRegister(e)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nguyen Van A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

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
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link to="/login">{"<<"} Back to Login page</Link>
              </Form.Group>
              <Row className="d-grid gap-2 col-6 mx-auto mt-4">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Vui lòng chờ...
                    </>
                  ) : (
                    <>Sign up</>
                  )}
                </Button>
              </Row>
            </Form>
          </Row>
        </Stack>
      </StyledContainer>
    </GradientBackground>
  );
};

export default RegisterPage;
