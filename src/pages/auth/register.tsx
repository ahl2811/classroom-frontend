import React, { FormEvent, useState } from "react";
import { Form, Row, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { USER } from "../../common/constants";
import { IErrorResponse, LocationState } from "../../common/types";
import { toastError } from "../../common/utils";
import LoadingButton from "../../components/LoadingButton";
import useUserContext from "../../hooks/useUserContext";
import { register } from "./api";
import { FullScreenContainer, LoginContainer } from "./styles";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useUserContext();
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: "/" } };

  if (user) {
    history.replace(from);
  }

  const { isLoading: loading, mutateAsync: Register } = useMutation(
    USER.REGISTER,
    register,
    {
      onSuccess: () => {
        toast.success(
          "Register successfully. Check your email to active this account.",
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
      },
      onError: (err: IErrorResponse) => {
        toastError(err);
      },
    }
  );

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const testPwd = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!testPwd.test(password)) {
      alert(
        "Password must have at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Confirm password does not match.");
      return;
    }
    Register({ email, name, password });
  };

  return (
    <FullScreenContainer className="d-flex align-items-center">
      <ToastContainer />
      <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
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
                  minLength={8}
                  maxLength={32}
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
                <LoadingButton
                  variant="primary"
                  type="submit"
                  className="classroom-btn"
                  isLoading={loading}
                >
                  Sign up
                </LoadingButton>
              </Row>
            </Form>
          </Row>
        </Stack>
      </LoginContainer>
    </FullScreenContainer>
  );
};

export default RegisterPage;
