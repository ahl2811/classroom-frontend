import React, { FormEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
  ModalProps,
} from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { ROOM } from "../../../common/constants";
import LoadingButton from "../../../components/LoadingButton";
import { joinRoomByCode } from "../../details/api";

interface IProps extends ModalProps {}

const ModalJoinClass = (props: IProps) => {
  const [code, setCode] = useState<string>("");

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(
    ROOM.JOIN,
    () => joinRoomByCode({ role: "student", code: `${code}` }),
    {
      onSuccess: () => {
        toast.success("Join class successfully.");
        queryClient.invalidateQueries(ROOM.GET);
      },
      onError: () => {
        toast.error(
          "Sorry! You don't have a submission to join this classroom",
          { position: "top-center" }
        );
      },
    }
  );

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync();
  };

  return (
    <Modal {...props}>
      <ToastContainer />
      <Form onSubmit={handleJoin}>
        <Modal.Header closeButton>
          <Modal.Title>Join class</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <FloatingLabel label="Code">
            <FormControl
              placeholder="Input code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.onHide}>
            Cancel
          </Button>
          <LoadingButton isLoading={isLoading} type="submit">
            Join
          </LoadingButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalJoinClass;
