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
import { ToastContainer } from "react-toastify";
import { ROOM } from "../../../common/constants";
import { IErrorResponse, IRoomsResponse, IUser } from "../../../common/types";
import { toastError } from "../../../common/utils";
import useUserContext from "../../../hooks/useUserContext";
import LoadingButton from "../../../components/LoadingButton";
import { postRoom } from "../api";

export default function ModalCreateRoom(props: ModalProps) {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const { user } = useUserContext();

  const queryClient = useQueryClient();
  const { isLoading: loading, mutateAsync: createRoom } = useMutation(
    ROOM.CREATE,
    postRoom,
    {
      onSuccess: (room) => {
        queryClient.setQueryData<IRoomsResponse>(ROOM.GET, (oldQueryData) => {
          if (oldQueryData) {
            return [...oldQueryData, { owner: user as IUser, classroom: room }];
          }
          return [{ owner: user as IUser, classroom: room }];
        });
      },
      onError: (err) => {
        toastError(err as IErrorResponse);
      },
    }
  );

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createRoom({
      name: roomName,
      description,
      section,
      subject,
    });
    setRoomName("");
    setDescription("");
    setSection("");
    setSubject("");
    props.onHide();
  };

  return (
    <Modal {...props}>
      <ToastContainer />
      <Form onSubmit={(e) => handleCreateRoom(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new class</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <FloatingLabel label="Name (required)">
            <FormControl
              placeholder="Input your class name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel label="Section" className="mt-3">
            <FormControl
              placeholder="Input section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Subject" className="mt-3">
            <FormControl
              placeholder="Input subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="Description" className="mt-3">
            <FormControl
              placeholder="Input your class description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <LoadingButton type="submit" isLoading={loading}>
            Create
          </LoadingButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
