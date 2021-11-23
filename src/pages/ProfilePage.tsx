import React, { useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { updateUserInfo } from "../api/user";
import { USER } from "../common/constants";
import { IErrorResponse, IUser } from "../common/types";
import { getAvatarUrl, toastError } from "../common/utils";
import Header from "../components/Header";
import { ProfilePageStyle } from "../components/styled/CommonStyle";
import useUserContext from "../hooks/useUserContext";
import { LoginSuccess } from "../store/actions";

const ProfilePage = () => {
  const { user, dispatch } = useUserContext();
  const [studentId, setStudentId] = useState<string>(user?.studentId || "");
  const [name, setname] = useState<string>(user?.name || "");

  const { isLoading, mutateAsync } = useMutation(
    USER.UPDATE_PROFILE,
    updateUserInfo,
    {
      onSuccess: (data) => {
        const newUserInfo: IUser = {
          ...data,
          accessToken: user?.accessToken,
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
      }
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

  return (
    <>
      <Header />
      <ToastContainer />
      <ProfilePageStyle>
        <div className="profile-container">
          <div className="profile-banner position-relative">
            <Image
              height={128}
              src={user?.avatar}
              roundedCircle
              alt="logo"
              className="profile-avatar mb-2"
            />
          </div>
          <div className="text-center pt-4 pb-2">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="profile-name"
            />
            <p className="profile-email">
              <i className="bi bi-envelope me-2" />
              {user?.email}
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <input
              className="profile-student-id"
              placeholder="Input your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
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
          </div>
        </div>
      </ProfilePageStyle>
    </>
  );
};

export default ProfilePage;
