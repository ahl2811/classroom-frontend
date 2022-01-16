import React from "react";
import { ReportStatus } from "../../reviews/api";
import { ModalMarkDecision } from "./ModalMarkDecision";

interface IProps {
  status: ReportStatus;
  expectedGrade: number;
  message: string;
  showMarkDecision: boolean;
  gradeName: string;
  studentId: string;
  roomId: string;
  currentGrade: number;
}

export const Review = ({
  status,
  expectedGrade,
  message,
  showMarkDecision,
  studentId,
  gradeName,
  roomId,
  currentGrade,
}: IProps) => {
  return (
    <div className="border p-2 my-2 rounded review-bg position-relative">
      {showMarkDecision && (
        <div className="position-absolute top-0 end-0 m-2">
          <ModalMarkDecision
            gradeName={gradeName}
            studentId={studentId}
            currentGrade={currentGrade}
            roomId={roomId}
          />
        </div>
      )}
      <div className="fw-bold mb-1">Review</div>
      <div>
        <div className="d-flex flex-row mb-1">
          <div className="w-100px">Status: </div>
          <div
            className={
              status === ReportStatus.OPEN ? "text-success" : "text-danger"
            }
          >
            {status}
          </div>
        </div>
        <div className="d-flex flex-row mb-1">
          <div className="w-100px">Expected: </div>
          <div className="fw-bold">{expectedGrade}</div>
        </div>
        <div className="d-flex flex-row mb-1">
          <div className="w-100px">Message: </div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};
