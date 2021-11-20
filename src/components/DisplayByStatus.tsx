import React from "react";
import { IErrorResponse } from "../common/types";
import ErrorPage from "../pages/ErrorPage";

interface IProps {
  isLoading: boolean;
  error: IErrorResponse | null;
}

const DisplayByStatus = ({ error, isLoading }: IProps) => {
  if (error) {
    const { statusCode, message } = error.response.data;
    return <ErrorPage statusCode={statusCode} title={message} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return null;
};

export default DisplayByStatus;
