import React, { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomsResponse } from "../../common/types";
import { getRandomImageLink } from "../../common/utils";
import Header from "../../components/header";
import Options from "../../components/options";
import { OptionItem } from "../../components/options/style";
import { PageContainer } from "../../components/style";
import { store } from "../../store";
import { Logout } from "../../store/actions";
import { getRooms } from "./api";
import { RoomCard } from "./style";

export default function RoomsPage() {
  const { dispatch } = useContext(store);
  const history = useHistory();
  const { isLoading, data: rooms } = useQuery<IRoomsResponse, IErrorResponse>(
    ROOM.GET,
    getRooms,
    {
      onError: (err) => {
        if (err.response.data.statusCode === 401) {
          dispatch(Logout());
          history.push(
            "/login?message=Your session was expired. Please login again!"
          );
          return;
        }
      },
      refetchOnWindowFocus: true,
    }
  );

  return (
    <>
      <Header isHome={true} />
      {isLoading ? (
        <div className="p-4">Loading...</div>
      ) : (
        <PageContainer fluid>
          {rooms && rooms.length > 0 ? (
            <Row className="gx-4 gt-4">
              {rooms.map((room) => (
                <Col key={room.classroom.id} lg={3} md={4} sm={6} xs={12}>
                  <RoomCard className="mr-2 mb-4">
                    <Options
                      icon={
                        <i className="bi bi-three-dots-vertical align-middle icon text-light"></i>
                      }
                      className="position-absolute mx-2 end-0 mt-2"
                    >
                      <OptionItem>Hủy đăng ký</OptionItem>
                    </Options>
                    <Card.Img variant="top" src={getRandomImageLink()} />
                    <div className="position-absolute mt-4 ms-3 title text-white">
                      <Link to={`/classrooms/${room.classroom.id}/streams`}>
                        <Card.Title className="text-truncate text-white link">
                          {room.classroom.name}
                        </Card.Title>
                      </Link>
                      <Card.Subtitle className="owner">
                        {room.owner?.name}
                      </Card.Subtitle>
                    </div>
                    <Card.Body className="body">
                      <Card.Text className="text-truncate">
                        {room.classroom.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Body className="text-end border-top">
                      <Link to={`/classrooms/${room.classroom.id}/streams`}>
                        <Button variant="light">View details</Button>
                      </Link>
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
        </PageContainer>
      )}
    </>
  );
}
