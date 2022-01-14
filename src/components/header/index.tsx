import React, { ReactNode, useState } from "react";
import {
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { Logout } from "../../store/actions";
import ModalCreateRoom from "../../pages/rooms/components/ModalCreateRoom";
import Options from "../options";
import { OptionItem } from "../options/style";
import { HeaderStyle } from "./style";
import { OffCanvasStyle } from "./style/offcanvas";
import ModalJoinClass from "../../pages/rooms/components/ModalJoinClass";
import { NotificationContainer } from "./style/notification";
import Notification from "../Notification";

interface IHeader {
  roomDetailsNav?: ReactNode;
  title?: string;
  isHome?: boolean;
}
export default function Header({
  roomDetailsNav,
  title = "Classroom",
  isHome = false,
}: IHeader) {
  const { user, dispatch } = useUserContext();
  const [showRoomCreation, setShowRoomCreation] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(Logout());
    history.push("/login");
  };

  return (
    <HeaderStyle bg="white" expand="none" sticky="top">
      <Container
        fluid
        className="d-flex justify-content-between flex-wrap py-2 px-0"
      >
        <Nav className="order-first">
          <Link to="/">
            <Navbar.Brand className="text-dark me-0 brand">
              {title}
            </Navbar.Brand>
          </Link>
        </Nav>
        {roomDetailsNav}
        <Nav className="justify-content-end order-2 order-md-last flex-nowrap flex-row">
          <Nav.Item>
            {!roomDetailsNav ? (
              <>
                {isHome && (
                  <Options
                    icon={
                      <i className="bi bi-plus-circle-dotted icon fs-5 fw-bold" />
                    }
                    className="position-relative"
                  >
                    <OptionItem onClick={() => setShowJoinClass(true)}>
                      Join a class
                    </OptionItem>
                    <OptionItem onClick={() => setShowRoomCreation(true)}>
                      Create new class
                    </OptionItem>
                  </Options>
                )}
              </>
            ) : (
              <Options
                icon={<i className="bi bi-bell-fill icon fs-5 fw-bold" />}
                className="position-relative"
                menuCenter={true}
                badge={true}
              >
                <NotificationContainer>
                  <Notification
                    isRead={true}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                  <Notification
                    isRead={false}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                  <Notification
                    isRead={true}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                  <Notification
                    isRead={true}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                  <Notification
                    isRead={false}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                  <Notification
                    isRead={true}
                    title="Thong bao"
                    content="Day la content cua thong bao pla pla pla pla ewew"
                  />
                </NotificationContainer>
              </Options>
            )}
          </Nav.Item>
          <Nav.Item>
            <Options
              icon={
                <Image src={user?.avatar} width={32} className="opt-image" />
              }
              className="position-relative user mx-2"
              menuCenter={true}
            >
              <Link to={`/user/${user?.id}`} className="link-item">
                <OptionItem>
                  <i className="bi bi-person-lines-fill fs-5 me-3" /> View
                  profile
                </OptionItem>
              </Link>
              <Link to={`/user/change-password`} className="link-item">
                <OptionItem>
                  <i className="bi bi-key-fill fs-5 me-3" /> Change password
                </OptionItem>
              </Link>
              <OptionItem onClick={handleLogout}>
                <i className="bi bi-box-arrow-right fs-5 me-3" /> Sign out
              </OptionItem>
            </Options>
          </Nav.Item>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="ms-2" />
          <OffCanvasStyle
            id="offcanvasNavbar"
            placement="end"
            style={{ maxWidth: 280 }}
          >
            {/* <Offcanvas.Header
              closeButton
              className="justify-content-end"
            ></Offcanvas.Header> */}
            <Offcanvas.Body>
              <div className="oc-user">
                <Link to="/user/profile">
                  <div
                    key={user?.id}
                    className="w-100 h-100 d-flex align-items-center oc-person"
                  >
                    <div className="avatar d-flex align-items-center justify-content-center me-2">
                      <Image
                        src={
                          user?.avatar ||
                          `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`
                        }
                        roundedCircle
                        height={36}
                      />
                    </div>
                    <div className="d-flex flex-grow-1 flex-column text-truncate ms-1">
                      <div className="name">{user?.name}</div>
                      <div className="text-secondary text-truncate email">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="text-center p-2">
                  <Button variant="light" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right fs-6 me-2" /> Sign out
                  </Button>
                </div>
              </div>
            </Offcanvas.Body>
          </OffCanvasStyle>
        </Nav>
      </Container>
      <ModalCreateRoom
        show={showRoomCreation}
        onHide={() => setShowRoomCreation(false)}
        centered
      />
      <ModalJoinClass
        show={showJoinClass}
        onHide={() => setShowJoinClass(false)}
        centered
      />
    </HeaderStyle>
  );
}
