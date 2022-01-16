import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import { IconButtonStyle } from "../../../components/style";
import { markDecision } from "../api";

export interface IFormData {
  newGrade: number;
}

const reviewSchema = yup.object().shape({
  newGrade: yup
    .number()
    .typeError("New grade must be a number")
    .min(0, "New grade must not be less than 0.")
    .required("New grade is required."),
});

interface IProps {
  gradeName: string;
  roomId: string;
  studentId: string;
  currentGrade: number;
}

export const ModalMarkDecision = ({
  gradeName,
  roomId,
  studentId,
  currentGrade,
}: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [changeGrade, setChangeGrade] = useState<1 | 0>(1);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(
    "mark-decision",
    markDecision,
    {
      onSuccess: () => {
        toast.success("Mark decision successfully.");
        queryClient.invalidateQueries(["scores", roomId, studentId]);
        setShowModal(false);
      },
      onError: (err: IErrorResponse) => {
        toastError(err);
      },
    }
  );

  const handleAddReview = (data: IFormData) => {
    data.newGrade = Number(data.newGrade);
    mutateAsync({ gradeName, roomId, studentId, grade: data.newGrade });
  };

  return (
    <>
      <IconButtonStyle
        className="ms-3 d-flex member-add ps-2"
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-reply-all-fill"></i>
      </IconButtonStyle>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mark Decision</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <Formik
            validationSchema={reviewSchema}
            onSubmit={handleAddReview}
            initialValues={{ newGrade: currentGrade }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} id="reviewForm">
                <Form.Group className="mb-3">
                  <Form.Label>Your Decision</Form.Label>
                  <Form.Control
                    as="select"
                    value={changeGrade}
                    onChange={(e) => {
                      setChangeGrade(+e.target.value as 1 | 0);
                      setFieldValue("newGrade", currentGrade);
                    }}
                  >
                    <option value={1}>Change grade</option>
                    <option value={0}>Not change grade</option>
                  </Form.Control>
                </Form.Group>
                {changeGrade === 1 && (
                  <Form.Group className="mb-3">
                    <Form.Label>New Grade</Form.Label>
                    <Form.Control
                      name="newGrade"
                      value={values.newGrade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.newGrade}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newGrade}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
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
