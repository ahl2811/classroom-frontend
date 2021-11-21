import React from "react";
import { Image, Button } from "react-bootstrap";
import Header from "../components/Header";
import { ProfilePageStyle } from "../components/styled/CommonStyle";
import useUserContext from "../hooks/useUserContext";

const ProfilePage = () => {
  const { user } = useUserContext();
  return (
    <>
      <Header />
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
            <h2>{user?.name}</h2>
            <p className="profile-email">
              <i className="bi bi-envelope me-2" />
              {user?.email}
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <input
              className="profile-student-id"
              placeholder="Input your student ID"
            />
            <Button className="classroom-btn">Update</Button>
          </div>
        </div>
      </ProfilePageStyle>
    </>
  );
};

export default ProfilePage;
