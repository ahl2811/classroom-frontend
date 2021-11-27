import React, { FormEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
  ModalProps,
} from "react-bootstrap";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { ROOM } from "../../../common/constants";
import { IErrorResponse } from "../../../common/types";
import { toastError } from "../../../common/utils";
import useUserContext from "../../../hooks/useUserContext";
import LoadingButton from "../../../components/LoadingButton";
import { inviteByEmail } from "../api";

interface IProps extends ModalProps {
  role: "teacher" | "student" | "owner";
  roomId: string;
}

const ModalInviteMembers = ({ role = "student", roomId, ...props }: IProps) => {
  const [email, setEmail] = useState<string>("");
  const { user } = useUserContext();
  const { isLoading, mutateAsync } = useMutation<any, IErrorResponse>(
    ROOM.INVITE_BY_EMAIL,
    () => inviteByEmail({ email, id: roomId, role }),
    {
      onSuccess: () => {
        setEmail("");
        toast.success("Invite successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (error) => {
        toastError(error);
      },
    }
  );

  const handleInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.email === email) {
      toast.error("Cannot invite yourself", { position: "top-center" });
      return;
    }
    mutateAsync();
  };

  return (
    <Modal {...props}>
      <ToastContainer />
      <Form onSubmit={handleInvite}>
        <Modal.Header closeButton>
          <Modal.Title>Invite {role}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <FloatingLabel label="Email">
            <FormControl
              placeholder="Input email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.onHide}>
            Cancel
          </Button>
          <LoadingButton isLoading={isLoading} type="submit">
            Invite
          </LoadingButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalInviteMembers;
