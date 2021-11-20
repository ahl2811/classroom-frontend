import React, { FormEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
  ModalProps,
  Spinner,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { IUser } from "../../common/types";
import { useRoomCreate } from "../../hooks/useRoomQuery";
import useUserContext from "../../hooks/useUserContext";

export default function ModalCreateRoom(props: ModalProps) {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const { user } = useUserContext();
  const { isLoading: loading, mutateAsync: createRoom } = useRoomCreate(
    user as IUser
  );

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      toast.error("Your session was expired. Please re-login and try again!");
    }
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
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Please wait...
              </>
            ) : (
              <>Create</>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
