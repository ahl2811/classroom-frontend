import React, { FormEvent, useContext, useState } from 'react';
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Modal,
  ModalProps,
  Spinner,
} from 'react-bootstrap';
import { IUser } from '../../common/types';
import { useRoomCreate } from '../../hooks/useRoomQuery';
import { store } from '../../store/store';

export default function RoomCreation(props: ModalProps) {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const {
    state: { user },
  } = useContext(store);

  const {
    isLoading: loading,
    data,
    mutateAsync: createRoom,
  } = useRoomCreate(user as IUser);

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createRoom({ name: roomName, description });
    if (res.data?.room) {
      setRoomName('');
      setDescription('');
      props.onHide();
    }
  };

  return (
    <Modal {...props}>
      <Form onSubmit={(e) => handleCreateRoom(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          {data?.data.error && (
            <Alert variant="danger" dismissible>
              {data?.data.error}
            </Alert>
          )}
          <FloatingLabel label="Tên lớp học (bắt buộc)">
            <FormControl
              placeholder="Nhập tên lớp học"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel label="Mô tả" className="mt-3" aria-required>
            <FormControl
              placeholder="Nhập mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Hủy
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
                Vui lòng chờ...
              </>
            ) : (
              <>Tạo</>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
