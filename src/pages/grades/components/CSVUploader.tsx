import React from "react";
import { NAME } from "../utils";
import GradeUploader from "./GradeUploader";
import StudentListUploader from "./StudentListUploader";

interface IProps {
  onClose: () => void;
  show: boolean;
  id: string;
  roomId: string;
}

const CSVUploader = ({ onClose, show, id, roomId }: IProps) => {
  if (id !== NAME) {
    return (
      <GradeUploader onClose={onClose} show={show} id={id} roomId={roomId} />
    );
  }
  return (
    <StudentListUploader
      onClose={onClose}
      show={show}
      id={id}
      roomId={roomId}
    />
  );
};

export default CSVUploader;
