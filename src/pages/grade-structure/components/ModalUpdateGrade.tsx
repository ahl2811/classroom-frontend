import React, { FormEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { GRADE_STRUCTURE } from "../../../common/constants";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import LoadingButton from "../../../components/LoadingButton";
import { IconButtonStyle } from "../../../components/style";
import { DefaultGradeKeys } from "../../grades";
import { IGradeStructure, updateGradeStruture } from "../api";

interface IProps {
  roomId: string;
  gradeName: string;
  gradePoints: number;
  gradeId: string;
}

const ModalUpdateGrade = ({
  roomId,
  gradeName,
  gradePoints,
  gradeId,
}: IProps) => {
  const [name, setName] = useState<string>(gradeName);
  const [grade, setGrade] = useState<any>(gradePoints);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation<any, IErrorResponse>(
    "update-grade-structure",
    () =>
      updateGradeStruture({ id: roomId, name, grade: Number(grade), gradeId }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<IGradeStructure[]>(
          [GRADE_STRUCTURE.GET, roomId],
          (oldQueryData) => {
            if (oldQueryData) {
              const index = oldQueryData.findIndex(
                (item) => item.id === data.id
              );
              const cloneData = [...oldQueryData];
              cloneData.splice(index, 1, data);
              return cloneData;
            }
            return [data];
          }
        );
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
      <IconButtonStyle onClick={() => setShowModal(!showModal)}>
        <i className="bi bi-pencil text-black" style={{ fontSize: 20 }} />
      </IconButtonStyle>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddNew}>
          <Modal.Header closeButton>
            <Modal.Title>Update grade</Modal.Title>
          </Modal.Header>
          <Modal.Body className="my-3">
            <FloatingLabel label="Name">
              <FormControl
                placeholder="Input grade name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              Update
            </LoadingButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateGrade;
