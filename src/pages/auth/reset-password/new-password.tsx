import { Formik } from "formik";
import React from "react";
import { Form, Row, Stack } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IErrorResponse, LocationState } from "../../../common/types";
import { toastError } from "../../../common/utils";
import DisplayByStatus from "../../../components/DisplayByStatus";
import LoadingButton from "../../../components/LoadingButton";
import useUserContext from "../../../hooks/useUserContext";
import { addnewPassword, validateToken } from "../api";
import { FullScreenContainer, LoginContainer } from "../styles";

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

interface IDataForm {
  password: string;
  confirmPassword: string;
}

const PasswordAddnew = () => {
  const { user } = useUserContext();
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: "/" } };

  const { search } = useLocation();
  const params = search.split("=");
  const token = params[1];

  if (user) {
    history.replace(from);
  }

  const { isLoading: isValivateTokenLoading, error: validateTokenError } =
    useQuery("token-validation", () =>
      validateToken(encodeURIComponent(token))
    );

  const {
    isLoading: isAddNewPasswordLoading,
    mutateAsync: addnewPasswordAsync,
  } = useMutation("add-password", addnewPassword, {
    onSuccess: () => {
      toast.success("Add new password successfully. Now you can login.", {
        position: "top-center",
      });
      history.push("/login");
    },
    onError: (err: IErrorResponse) => {
      toastError(err);
    },
  });

  const handleAddNewPassword = (data: IDataForm) => {
    addnewPasswordAsync({ password: data.password, token });
  };

  if (isValivateTokenLoading || validateTokenError) {
    return (
      <DisplayByStatus
        isLoading={isValivateTokenLoading}
        error={validateTokenError as IErrorResponse}
      />
    );
  }

  return (
    <FullScreenContainer className="d-flex align-items-center">
      <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h3>Add new password</h3>
          </Row>
          <Row>
            <Formik
              validationSchema={passwordSchema}
              onSubmit={handleAddNewPassword}
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        isValid={touched.password && !errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <LoadingButton
                        variant="primary"
                        type="submit"
                        isLoading={isAddNewPasswordLoading}
                        className="w-100 mt-3 mb-2 classroom-btn"
                      >
                        Submit
                      </LoadingButton>
                    </Form.Group>
                  </Form>
                );
              }}
            </Formik>
          </Row>
        </Stack>
      </LoginContainer>
    </FullScreenContainer>
  );
};

export default PasswordAddnew;
