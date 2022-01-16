import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import { requestReview } from "../api";

export interface IAddReviewData {
  expectedGrade: number | undefined;
  message: string;
}

const reviewSchema = yup.object().shape({
  expectedGrade: yup
    .number()
    .typeError("Expected grade must be a number")
    .min(0, "Expected grade must not be less than 0.")
    .required("Expected grade is required."),
  message: yup.string().required("Message is required."),
});

interface IProps {
  gradeId: string;
  disabled?: boolean;
}

export const ModalAddReview = ({ gradeId, disabled = false }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation("add-review", requestReview, {
    onSuccess: () => {
      toast.success("Request review successfully.");
      queryClient.invalidateQueries(["scores"]);
    },
    onError: (err: IErrorResponse) => {
      toastError(err);
    },
  });

  const handleAddReview = (data: IAddReviewData) => {
    data.expectedGrade = Number(data.expectedGrade);
    mutateAsync({ gradeId, info: data });
  };

  return (
    <>
      <Button
        variant={"light"}
        onClick={() => setShowModal(!showModal)}
        disabled={disabled}
      >
        <i className="bi bi-file-earmark-diff-fill me-2" />
        Request review
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <Formik
            validationSchema={reviewSchema}
            onSubmit={handleAddReview}
            initialValues={{ expectedGrade: undefined, message: "" }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form onSubmit={handleSubmit} id="reviewForm">
                <Form.Group className="mb-3">
                  <Form.Label>Expected Grade</Form.Label>
                  <Form.Control
                    name="expectedGrade"
                    value={values.expectedGrade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.expectedGrade}
                    isValid={touched.expectedGrade && !errors.expectedGrade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expectedGrade}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <LoadingButton isLoading={isLoading} type="submit" form="reviewForm">
            Submit
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
