import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getRooms } from '../api/room';
import { ROOM } from '../common/constants';
import Header from '../components/Header';
import Options from '../components/Options';
import { OptionItem } from '../components/styled/OptionStyle';
import { RoomCard } from '../components/styled/RoomStyle';

export default function RoomsPage() {
  const { isLoading, data } = useQuery(ROOM.GET, getRooms);

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="p-2">Loading...</div>
      ) : (
        <Container fluid>
          {data?.rooms && data?.rooms.length > 0 ? (
            <Row className="gx-4 gt-4 p-4">
              {data?.rooms.map((room) => (
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
                    <Card.Img
                      variant="top"
                      src="https://picsum.photos/300/100"
                    />
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
            <div className="text-center text-secondary mt-4">
              Chưa có lớp học
            </div>
          )}
        </Container>
      )}
    </>
  );
}
