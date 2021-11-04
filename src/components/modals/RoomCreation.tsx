import axios from 'axios';
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
import { SERVER_URL } from '../../common/constants';
import { IRoomResponse, IUser } from '../../common/types';
import useAuth from '../../hooks/useAuth';
import { store } from '../../store/store';
import {
  CreateRoomError,
  CreateRoomRequest,
  CreateRoomSuccess,
} from '../../store/actions';

export default function RoomCreation(props: ModalProps) {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');

  const {
    state: {
      userState: { user },
      roomsState: { loading, error },
    },
    dispatch,
  } = useContext(store);

  const { Authorization } = useAuth();

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(CreateRoomRequest());
    try {
      const { data } = await axios.post<IRoomResponse>(
        `${SERVER_URL}/rooms`,
        { name: roomName, description },
        Authorization
      );
      if (data.error) {
        dispatch(CreateRoomError(data.error as string));
        return;
      }
      if (data.room) {
        data.room.owner = user as IUser;
        dispatch(CreateRoomSuccess(data.room));
        setRoomName('');
        setDescription('');
        props.onHide();
      }
    } catch (err) {
      dispatch(CreateRoomError(err as string));
    }
  };

  return (
    <Modal {...props}>
      <Form onSubmit={(e) => handleCreateRoom(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo lớp học</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          {error && (
            <Alert variant="danger" dismissible>
              {error}
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
