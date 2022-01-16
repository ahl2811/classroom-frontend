import React from "react";
import { Accordion, Col, Image, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router";
import { IErrorResponse } from "../../common/types";
import { getAvatarUrl } from "../../common/utils";
import DisplayByStatus from "../../components/DisplayByStatus";
import { PageContainer } from "../../components/style";
import useMembers from "../../hooks/useMembers";
import useUserContext from "../../hooks/useUserContext";
import { ReportStatus } from "../reviews/api";
import { getGradeDetails } from "./api";
import { CommentInput } from "./components/CommentInput";
import { CommentList } from "./components/CommentList";
import { ModalAddReview } from "./components/ModalAddReview";
import { Review } from "./components/Review";
import { StudentScorePageStyle } from "./styles";

const StudentScoresPage = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const studentId = params.get("studentId") || "";
  const activeGradeId = params.get("activeGradeId") || undefined;
  const { user: userInfo } = useUserContext();

  const {
    data: gradeDetails,
    error,
    isLoading,
  } = useQuery(["scores", roomId, studentId], () =>
    getGradeDetails(roomId, studentId)
  );
  const { isTeacher } = useMembers(roomId);

  const user = gradeDetails?.user;
  const grades = gradeDetails?.grades;

  if (!userInfo?.studentId && !isTeacher) {
    return (
      <PageContainer>
        <div className="text-center text-secondary">
          Please mapping your studentId to view grade details.
        </div>
      </PageContainer>
    );
  }

  if (error || isLoading) {
    return (
      <DisplayByStatus error={error as IErrorResponse} isLoading={isLoading} />
    );
  }

  const isAllFinalize = () => {
    return !!grades?.every((grade) => grade.isFinalize);
  };

  return (
    <StudentScorePageStyle>
      <Row className="notify-items">
        <Col md={4} style={{ minWidth: 244 }}>
          <div className="border rounded p-3 mb-2">
            <div className="w-100 h-100 d-flex align-items-center mb-2">
              <div className="avatar d-flex align-items-center justify-content-center me-2">
                <Image
                  src={getAvatarUrl(String(user?.name))}
                  roundedCircle
                  height={40}
                />
              </div>
              <div className="d-flex flex-grow-1 flex-column ms-1">
                <div className="fw-bold text-dark">{user?.name}</div>
                <div className="text-small text-primary">{user?.studentId}</div>
              </div>
            </div>
            <div>
              {grades?.length !== 0 ? (
                <>
                  {grades?.map(({ gradeId, name, grade, isFinalize }) => {
                    return (
                      <div
                        className="d-flex flex-row justify-content-between mt-2 text-content"
                        key={gradeId}
                      >
                        <div className="text-truncate pe-2">{name}</div>
                        <div>{isFinalize ? grade : "None"}</div>
                      </div>
                    );
                  })}
                  <div className="d-flex flex-row justify-content-between mt-2 text-content fw-bold">
                    <div className="text-truncate pe-2">Total:</div>
                    <div>
                      {isAllFinalize() ? gradeDetails?.totalGrade : "None"}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-secondary text-center text-small">
                  Grade details is empty!
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col>
          {grades?.length !== 0 ? (
            grades?.map(
              ({
                gradeId,
                grade,
                isFinalize,
                reportInfo: { reportStatus, message, expectedGrade },
                name,
              }) => (
                <Accordion
                  defaultActiveKey={activeGradeId}
                  className="rounded-lg mb-2"
                  key={gradeId}
                >
                  <Accordion.Item eventKey={gradeId || ""}>
                    <Accordion.Header>{name}</Accordion.Header>
                    <Accordion.Body className="px-0">
                      <div className="px-20">
                        <div>
                          Current grade:{" "}
                          <span className="fw-bold">
                            {isFinalize ? grade : "None"}
                          </span>
                        </div>
                        {reportStatus === ReportStatus.NEW ? (
                          <div className="mt-2">
                            {!isTeacher && (
                              <ModalAddReview
                                gradeId={gradeId}
                                disabled={!isFinalize}
                              />
                            )}
                          </div>
                        ) : (
                          <Review
                            status={reportStatus}
                            expectedGrade={expectedGrade}
                            message={message}
                            roomId={roomId}
                            studentId={user?.studentId || ""}
                            gradeName={name}
                            currentGrade={grade}
                            showMarkDecision={
                              isTeacher && reportStatus !== ReportStatus.CLOSED
                            }
                          />
                        )}
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
              )
            )
          ) : (
            <div className="text-center text-secondary">No grades founds</div>
          )}
        </Col>
      </Row>
    </StudentScorePageStyle>
  );
};

export default StudentScoresPage;
