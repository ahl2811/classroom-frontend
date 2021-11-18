import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
interface IProps {
  statusCode?: number;
  title?: string;
  children?: ReactNode;
}
const ErrorPage = ({
  statusCode = 404,
  title = "Page Not Found!",
  children = <Link to="/">{"<<"}Back to home page</Link>,
}: IProps) => {
  return (
    <div className="text-center mx-auto mt-4">
      <h1 className="text-secondary">{statusCode}</h1>
      <h3 className="fw-normal text-secondary">{title}</h3>
      {children}
    </div>
  );
};

export default ErrorPage;
