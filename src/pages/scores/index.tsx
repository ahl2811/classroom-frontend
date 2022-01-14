import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router";
import { IErrorResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import InfoNotify from "../details/components/InfoNotify";
import { getGradeDetails } from "./api";
import { CommentInput } from "./components/CommentInput";
import { CommentList } from "./components/CommentList";
import { StudentScorePageStyle } from "./styles";

const StudentScoresPage = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const studentId = params.get("studentId") || "";
  const activeGradeId = params.get("activeGradeId") || undefined;

  console.log("studentId", studentId);

  const {
    data: gradeDetails,
    error,
    isLoading,
  } = useQuery(["scores", studentId], () => getGradeDetails(roomId, studentId));

  if (error || isLoading) {
    return (
      <DisplayByStatus error={error as IErrorResponse} isLoading={isLoading} />
    );
  }

  const user = gradeDetails?.user;
  const grades = gradeDetails?.grades;

  return (
    <StudentScorePageStyle>
      <Row className="notify-items">
        <Col md={4} style={{ minWidth: 244 }}>
          <InfoNotify title="Grade Structure">
            <div className="d-flex flex-column mt-3">
              <div className="text-secondary text-center text-small">
                {user?.name}
              </div>
            </div>
          </InfoNotify>
        </Col>
        <Col>
          {grades?.map(({ gradeId, grade, reportInfo, name }) => (
            <Accordion
              defaultActiveKey={activeGradeId}
              className="rounded-lg mb-2"
              key={gradeId}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body className="px-0">
                  <div className="px-20">
                    <div>Điểm: {grade || "Chưa có"}</div>
                    <div className="border p-2 my-2 rounded">
                      <div className="fw-bold">Review</div>
                      <div>
                        <div>Điểm mong muốn: {reportInfo.expectedGrade}</div>
                        <div>Nội dung: {reportInfo.message}</div>
                        <div>Trạng thái: {reportInfo.reportStatus}</div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-bottom border-secondary" />
                  <div className="px-20">
                    <CommentList gradeId={gradeId} />
                  </div>
                  <hr className="border-bottom border-secondary" />
                  <div className="px-20">
                    <CommentInput gradeId={gradeId} />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </Col>
      </Row>
    </StudentScorePageStyle>
  );
};

export default StudentScoresPage;
