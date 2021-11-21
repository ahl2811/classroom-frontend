import React from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { getRoomDetail } from "../../api/room";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomDetailResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import Options from "../../components/Options";
import { OptionItem } from "../../components/styled/OptionStyle";
import { CodeCard, PostNotifyCard } from "../../components/styled/RoomStyle";
import useUserContext from "../../hooks/useUserContext";

const NewsPage = () => {
  const { user } = useUserContext();
  const { id } = useParams<{ id: string }>();

  const { isLoading, data, error } = useQuery<
    IRoomDetailResponse,
    IErrorResponse
  >(ROOM.DETAIL, () => getRoomDetail(id));

  const copyToClipBoard = (value: string) => {
    toast.success(`Copied ${value}`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const isTeacher = data?.teachers.findIndex((t) => t.id === user?.id) !== -1;

  if (error || isLoading) {
    return <DisplayByStatus error={error} isLoading={isLoading} />;
  }
  return (
    <>
      <Row className="d-flex align-items-end rounded justify-content-between flex-column g-0 banner notify-item">
        {isTeacher && (
          <div className="d-flex flex-row justify-content-end">
            <DropdownButton
              variant="light"
              title="Customize"
              className="m-3"
              align="end"
            >
              <Dropdown.Item>Change background</Dropdown.Item>
            </DropdownButton>
          </div>
        )}

        <div className="text-white p-3">
          <h1 className="class-name">{data?.classroom.name}</h1>
          <h4 className="fw-normal mb-0 mt-1 class-description">
            {data?.classroom.description}
          </h4>
        </div>
      </Row>
      <Row className="notify-items">
        <Col md={3}>
          {isTeacher && (
            <CodeCard className="w-100 notify-item">
              <Options
                icon={
                  <i className="bi bi-three-dots-vertical align-middle fs-5"></i>
                }
                menuCenter={true}
                className="position-absolute mx-2 end-0 mt-2"
              >
                <CopyToClipboard
                  text={`${window.location.origin}/classrooms/${data?.classroom.id}/join?code=${data?.classroom.code}`}
                  onCopy={() => copyToClipBoard("invitation link")}
                >
                  <OptionItem>
                    <i className="bi bi-link fs-5 me-3" />
                    Copy invitation link
                  </OptionItem>
                </CopyToClipboard>
                <CopyToClipboard
                  text={`${data?.classroom.code}`}
                  onCopy={() => copyToClipBoard("code")}
                >
                  <OptionItem>
                    <i className="bi bi-clipboard fs-5 me-3" />
                    Copy code
                  </OptionItem>
                </CopyToClipboard>
                <OptionItem>
                  <i className="bi bi-arrow-counterclockwise fs-5 me-3" />
                  Reset code
                </OptionItem>
              </Options>
              <Card.Body>
                <Card.Title className="fs-6 text-normal">Code</Card.Title>
                <Card.Text className="code">{data?.classroom.code}</Card.Text>
              </Card.Body>
            </CodeCard>
          )}
          <CodeCard className="w-100 notify-item">
            <Card.Body>
              <Card.Title className="fs-6 text-normal">Deadlines</Card.Title>
              <Card.Text className="text-secondary notify-deadline">
                Yeah! No deadlines
              </Card.Text>
            </Card.Body>
          </CodeCard>
        </Col>
        <Col>
          <PostNotifyCard className="w-100 notify-item">
            <div className="w-100 h-100 d-flex align-items-center">
              <div className="avatar d-flex align-items-center justify-content-center">
                <Image
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?background=0D8ABC&color=fff"
                  }
                  roundedCircle
                  height={40}
                />
              </div>
              <div className="d-flex flex-grow-1 fw-light pe-2 notify-intro">
                Notify some information to your class
              </div>
            </div>
          </PostNotifyCard>
        </Col>
      </Row>
    </>
  );
};

export default NewsPage;
