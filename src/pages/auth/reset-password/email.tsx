import { Formik } from "formik";
import React from "react";
import { Form, Row, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IErrorResponse, LocationState } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import useUserContext from "../../../hooks/useUserContext";
import { resetPassword } from "../api";
import { FullScreenContainer, LoginContainer } from "../styles";

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),
});

const EmailProvide = () => {
  const { user } = useUserContext();
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: "/" } };

  if (user) {
    history.replace(from);
  }

  const { isLoading: isResetLoading, mutateAsync: resetPassAsync } =
    useMutation("reset-password", resetPassword, {
      onSuccess: () => {
        toast.success(
          "We sent you a link to reset your password. Please check your email.",
          {
            position: "top-center",
          }
        );
      },
      onError: (err: IErrorResponse) => {
        toastError(err);
      },
    });

  const handleSubmitEmail = (data: { email: string }) => {
    resetPassAsync(data.email);
  };

  return (
    <FullScreenContainer className="d-flex align-items-center">
      <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h3>Your Email</h3>
          </Row>
          <Row>
            <Formik
              validationSchema={emailSchema}
              onSubmit={handleSubmitEmail}
              initialValues={{
                email: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="example@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.email}
                      isValid={touched.email && !errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <LoadingButton
                      variant="primary"
                      type="submit"
                      isLoading={isResetLoading}
                      className="w-100 mt-3 mb-2 classroom-btn"
                    >
                      Submit
                    </LoadingButton>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </Row>
        </Stack>
      </LoginContainer>
    </FullScreenContainer>
  );
};

export default EmailProvide;
