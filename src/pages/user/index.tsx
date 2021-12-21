import React, { useEffect, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { USER } from "../../common/constants";
import { IErrorResponse, IUser } from "../../common/types";
import { getAvatarUrl, toastError } from "../../common/utils";
import DisplayByStatus from "../../components/DisplayByStatus";
import Header from "../../components/header";
import useUserContext from "../../hooks/useUserContext";
import { LoginSuccess } from "../../store/actions";
import { getUser, updateUserInfo } from "./api";
import { ProfilePageStyle } from "./style";

const ProfilePage = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { push } = useHistory();
  const { user: userInfo, dispatch } = useUserContext();
  const {
    isLoading: getUserLoading,
    data: user,
    error,
  } = useQuery(["user", userId], () => getUser(userId), {
    onError: (err: IErrorResponse) => {
      if (err.response.data.statusCode === 401) {
        toastError(err);
        push("/");
      }
    },
  });

  const isMine = userInfo && userInfo.id === user?.id;

  const [studentId, setStudentId] = useState<string>("");
  const [name, setname] = useState<string>("");

  useEffect(() => {
    setStudentId(user?.studentId || "");
    setname(user?.name || "");
  }, [user]);

  const { isLoading, mutateAsync } = useMutation(
    USER.UPDATE_PROFILE,
    updateUserInfo,
    {
      onSuccess: (data) => {
        const newUserInfo: IUser = {
          ...data,
          accessToken: userInfo?.accessToken,
          avatar: user?.avatar || getAvatarUrl(`${data.name}`),
        };
        dispatch(LoginSuccess(newUserInfo));
        toast.success("Update successfully.", {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (error) => {
        const err = error as IErrorResponse;
        toastError(err);
      },
    }
  );

  const handleUpdate = () => {
    if (!name || !studentId) {
      toast.error("Name or StudentID cannot be empty", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    mutateAsync({ studentId, name });
  };

  if (error || getUserLoading) {
    return (
      <>
        <Header />
        <DisplayByStatus
          error={error as IErrorResponse}
          isLoading={getUserLoading}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <ProfilePageStyle>
        <div className={`profile-container ${!isMine ? "mt-10" : ""}`}>
          <div className="profile-banner position-relative">
            <Image
              height={128}
              src={user?.avatar || getAvatarUrl(`${user?.name}`)}
              roundedCircle
              alt="logo"
              className="profile-avatar mb-2"
            />
          </div>
          <div className="text-center pt-4 pb-2">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              className={`profile-name ${isMine ? " active" : ""}`}
              readOnly={!isMine}
            />
            <p className="profile-email">
              <i className="bi bi-envelope me-2" />
              {user?.email}
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <input
              className={`profile-student-id ${isMine ? " active" : ""}`}
              placeholder="Input your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              readOnly={!isMine}
            />
            {isMine && (
              <Button className="classroom-btn" onClick={handleUpdate}>
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Please wait...
                  </>
                ) : (
                  <>Update</>
                )}
              </Button>
            )}
          </div>
        </div>
      </ProfilePageStyle>
    </>
  );
};

export default ProfilePage;
