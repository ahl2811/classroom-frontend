import React from "react";
import { Toast } from "react-bootstrap";
interface IProps extends HTMLDivElement {
  show: boolean;
  delay?: number;
  onClose: () => void;
  message: string;
  title: string;
  variant?: "success" | "danger";
}
const Message = ({
  show,
  delay,
  onClose,
  message,
  title,
  variant = "danger",
}: IProps) => {
  return (
    <div className="position-absolute top-0 left-0 d-flex">
      <Toast
        onClose={onClose}
        show={show}
        delay={delay || 3000}
        autohide
        bg={variant}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Message;
