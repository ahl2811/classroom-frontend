import React from "react";
import { Button, Image } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useHistory, useLocation, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Logo from "../../assets/images/logo-classroom.svg";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomMembersResponse } from "../../common/types";
import Header from "../../components/header";
import { getRoomMembers, joinRoom } from "./api";
import { JoinClassPageStyle } from "./style";

const JoinClassPage = () => {
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const params = new URLSearchParams(search);
  const code = params.get("code") || "";
  const role = params.get("role") || "student";

  const { isLoading } = useQuery<IRoomMembersResponse, IErrorResponse>(
    ROOM.MEMBERS,
    () => getRoomMembers(`${id}`),
    {
      onSuccess: () => {
        history.push(`/classrooms/${id}/streams`);
      },
      retry: 1,
    }
  );

  const { isLoading: joinRoomLoading, mutateAsync } = useMutation(
    ROOM.JOIN,
    () => joinRoom({ id, role: `${role}`, code: `${code}` }),
    {
      onSuccess: () => {
        history.push(`/classrooms/${id}/streams`);
      },
      onError: () => {
        toast.error(
          "Sorry! You don't have a submission to join this classroom",
          { position: "top-center" }
        );
      },
    }
  );

  const handleJoinClass = () => {
    mutateAsync();
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <JoinClassPageStyle>
        <div className="join-class-container">
          <div className="join-class-banner">
            <Image height={128} src={Logo} alt="logo" />
            <h2>Classroom</h2>
            <p>
              Classroom helps classes communicate, save time, and stay
              organized.
            </p>
          </div>
          <div className="text-center py-4">
            <p>
              You are joining the class as a{" "}
              <span className="fw-bold">{role}</span>.
            </p>
            <Button
              className="classroom-btn"
              onClick={handleJoinClass}
              disabled={joinRoomLoading}
            >
              Join class
            </Button>
            <p className="text-secondary mt-4 join-class-footer">
              By joining, you agree to share contact information with people in
              your class
            </p>
          </div>
        </div>
      </JoinClassPageStyle>
    </>
  );
};

export default JoinClassPage;
