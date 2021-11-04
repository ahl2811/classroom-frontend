import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { SERVER_URL } from '../common/constants';
import { IRoomsResponse } from '../common/types';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { GetAllRooms } from '../store/actions';
import { store } from '../store/store';
import styled from 'styled-components';
import Options from '../components/Options';
import { OptionItem } from '../components/styled/OptionStyle';
import { Link } from 'react-router-dom';

const RoomCard = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 8px #ddd;
  }
  .title {
    max-width: 80%;
    font-size: 20px;
  }
  .body {
    height: 120px;
  }
  .owner {
    text-transform: capitalize;
    font-weight: normal;
    cursor: pointer;
  }
  .link {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function RoomsPage() {
  const {
    state: {
      roomsState: { rooms },
      userState: { user },
    },
    dispatch,
  } = useContext(store);
  const { Authorization } = useAuth();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.get<IRoomsResponse>(
        `${SERVER_URL}/rooms`,
        Authorization
      );
      if (data.rooms) {
        dispatch(GetAllRooms(data.rooms));
      }
    };
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Header />
      <Container fluid>
        {rooms.length > 0 ? (
          <Row className="gx-4 gt-4 p-4">
            {rooms.map((room) => (
              <Col key={room.code} lg={3} md={4} sm={6} xs={12}>
                <RoomCard className="mr-2 mb-4">
                  <Options
                    icon={
                      <i className="bi bi-three-dots-vertical align-middle fs-5 text-light"></i>
                    }
                    className="position-absolute mx-2 end-0 mt-2"
                  >
                    <OptionItem>Hủy đăng ký</OptionItem>
                  </Options>
                  <Card.Img variant="top" src="https://picsum.photos/300/100" />
                  <div className="position-absolute mt-4 ms-3 title text-white">
                    <Link to="/">
                      <Card.Title className="text-truncate text-white link">
                        {room.name}
                      </Card.Title>
                    </Link>
                    <Card.Subtitle className="owner">
                      {room.owner?.name}
                    </Card.Subtitle>
                  </div>
                  <Card.Body className="body">
                    <Card.Text className="text-truncate">
                      {room.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body className="text-end border-top">
                    <Button variant="dark">Xem chi tiết</Button>
                  </Card.Body>
                </RoomCard>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center text-secondary mt-4">Chưa có lớp học</div>
        )}
      </Container>
    </>
  );
}
