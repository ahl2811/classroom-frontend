import React, { FormEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { GRADE_STRUCTURE } from "../../../common/constants";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import { DefaultGradeKeys } from "../../grades";
import { addGradeStruture, IGradeStructure } from "../api";

interface IProps {
  roomId: string;
}

const ModalAddGrade = ({ roomId }: IProps) => {
  const [name, setName] = useState<string>("");
  const [grade, setGrade] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation<any, IErrorResponse>(
    "add-grade-structure",
    () => addGradeStruture({ id: roomId, name, grade }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<IGradeStructure[]>(
          [GRADE_STRUCTURE.GET, roomId],
          (oldQueryData) => {
            if (oldQueryData) {
              return [...oldQueryData, data];
            }
            return [data];
          }
        );
        setName("");
        setGrade("");
        setShowModal(false);
      },
      onError: (error) => {
        toastError(error);
      },
    }
  );

  const handleAddNew = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNaN(grade)) {
      toast.error("Points must be a number", { position: "top-center" });
      return;
    }
    if (DefaultGradeKeys.includes(name)) {
      toast.error("Please use another name", { position: "top-center" });
      return;
    }
    mutateAsync();
  };

  return (
    <>
      <ToastContainer />
      <Button
        className="add-btn text-nowrap"
        onClick={() => setShowModal(!showModal)}
      >
        <span>
          <i className="bi bi-node-plus me-2" /> Add new
        </span>
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddNew}>
          <Modal.Header closeButton>
            <Modal.Title>Add new grade</Modal.Title>
          </Modal.Header>
          <Modal.Body className="my-3">
            <FloatingLabel label="Name">
              <FormControl
                placeholder="Input grade name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus={true}
              />
            </FloatingLabel>
            <FloatingLabel label="Points" className="mt-3">
              <FormControl
                placeholder="Input grade points"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                min={0}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <LoadingButton isLoading={isLoading} type="submit">
              Add
            </LoadingButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddGrade;
