import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GRADE_STRUCTURE, ROOM } from "../../common/constants";
import { IErrorResponse, IRoomDetailResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import { OptionItem } from "../../components/options/style";
import useUserContext from "../../hooks/useUserContext";
import {
  getGradeStructuresInfo,
  IGradeStructure,
} from "../grade-structure/api";
import { getRoomDetail } from "./api";
import InfoNotify from "./components/InfoNotify";
import { PostNotifyCard, RoomDetailsStyle } from "./style";

const NewsPage = () => {
  const { user } = useUserContext();
  const { id: roomId } = useParams<{ id: string }>();

  const { data: grades } = useQuery<IGradeStructure[], IErrorResponse>(
    [GRADE_STRUCTURE.GET, roomId],
    () => getGradeStructuresInfo(roomId)
  );

  const {
    isLoading,
    data: room,
    error,
  } = useQuery<IRoomDetailResponse, IErrorResponse>([ROOM.DETAIL, roomId], () =>
    getRoomDetail(roomId)
  );

  const copyToClipBoard = (value: string) => {
    toast.success(`Copied ${value}`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const isTeacher = room?.teachers.findIndex((t) => t.id === user?.id) !== -1;

  if (error || isLoading) {
    return <DisplayByStatus error={error} isLoading={isLoading} />;
  }

  return (
    <RoomDetailsStyle>
      <Row className="d-flex align-items-end rounded justify-content-between flex-column g-0 banner notify-item">
        <div className="d-flex flex-row justify-content-end"></div>

        <div className="text-white p-3">
          <h1 className="class-name">{room?.classroom.name}</h1>
          <h4 className="fw-normal mb-0 mt-1 class-description">
            {room?.classroom.description}
          </h4>
        </div>
      </Row>
      <Row className="notify-items">
        <Col md={3} style={{ minWidth: 244 }}>
          {isTeacher && (
            <InfoNotify
              title="Code"
              optionItems={
                <>
                  <CopyToClipboard
                    text={`${window.location.origin}/classrooms/${room?.classroom.id}/join?code=${room?.classroom.code}`}
                    onCopy={() => copyToClipBoard("invitation link")}
                  >
                    <OptionItem>
                      <i className="bi bi-link fs-5 me-3" />
                      Copy invitation link
                    </OptionItem>
                  </CopyToClipboard>
                  <CopyToClipboard
                    text={`${room?.classroom.code}`}
                    onCopy={() => copyToClipBoard("code")}
                  >
                    <OptionItem>
                      <i className="bi bi-clipboard fs-5 me-3" />
                      Copy code
                    </OptionItem>
                  </CopyToClipboard>
                </>
              }
            >
              <div className="code">{room?.classroom.code}</div>
            </InfoNotify>
          )}
          {/* <InfoNotify title="Deadlines">
            <div className="notify-deadline text-secondary">
              Yeah no deadline!
            </div>
          </InfoNotify> */}
          <InfoNotify
            title="Grade Structure"
            optionItems={
              isTeacher && (
                <Link to={`/classrooms/${roomId}/grade-structure`}>
                  <OptionItem className="text-black">
                    <i className="bi bi-pencil-square fs-5 me-2" /> Edit grade
                    structure
                  </OptionItem>
                </Link>
              )
            }
          >
            <div className="d-flex flex-column mt-3">
              {grades && grades.length > 0 ? (
                grades.map((g) => {
                  return (
                    <div
                      className="d-flex flex-row justify-content-between mt-1 text-content"
                      key={g.id}
                    >
                      <div className="text-truncate pe-2">{g.name}</div>
                      <div>{g.grade}</div>
                    </div>
                  );
                })
              ) : (
                <div className="text-secondary text-center text-small">
                  Grade structure is empty!
                </div>
              )}
            </div>
          </InfoNotify>
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
    </RoomDetailsStyle>
  );
};

export default NewsPage;
