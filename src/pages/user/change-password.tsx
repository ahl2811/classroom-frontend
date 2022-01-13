import { Formik } from "formik";
import React from "react";
import { Form, Row, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { PasswordRegex } from "../../common/regex";
import { IErrorResponse } from "../../common/types";
import { toastError } from "../../common/utils";
import Header from "../../components/header";
import LoadingButton from "../../components/LoadingButton";
import useUserContext from "../../hooks/useUserContext";
import { Logout } from "../../store/actions";
import { LoginContainer } from "../auth/styles";
import { changePassword } from "./api";

interface IDataForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(PasswordRegex.value, PasswordRegex.message),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const PasswordChange = () => {
  const history = useHistory();
  const { dispatch } = useUserContext();

  const {
    isLoading: isAddNewPasswordLoading,
    mutateAsync: changePasswordAsync,
  } = useMutation("change-password", changePassword, {
    onSuccess: () => {
      toast.success("Change password successfully. Please login again.", {
        position: "top-center",
      });
      dispatch(Logout());
      history.push("/login");
    },
    onError: (err: IErrorResponse) => {
      toastError(err);
    },
  });

  const handleChangePassword = (data: IDataForm) => {
    changePasswordAsync(data);
  };

  return (
    <>
      <Header />
      <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex mt-5">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h3>Change Password</h3>
          </Row>
          <Row>
            <Formik
              validationSchema={passwordSchema}
              onSubmit={handleChangePassword}
              initialValues={{
                oldPassword: "",
                newPassword: "",
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="oldPassword"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.oldPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.oldPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.newPassword}
                      isValid={touched.newPassword && !errors.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
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
                      isInvalid={!!errors.confirmPassword}
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
              )}
            </Formik>
          </Row>
        </Stack>
      </LoginContainer>
    </>
  );
};

export default PasswordChange;
