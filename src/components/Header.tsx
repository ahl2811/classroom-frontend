import React, { ReactNode, useState } from "react";
import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { Logout } from "../store/actions";
import ModalCreateRoom from "./modals/ModalCreateRoom";
import Options from "./Options";
import { StyledHeader } from "./styled/CommonStyle";
import { OptionItem } from "./styled/OptionStyle";

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

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <StyledHeader bg="white" expand="none" sticky="top">
      <Container
        fluid
        className="d-flex justify-content-between flex-wrap py-2"
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
                    <OptionItem>Join a class</OptionItem>
                    <OptionItem onClick={() => setShowRoomCreation(true)}>
                      Create new class
                    </OptionItem>
                  </Options>
                )}
              </>
            ) : (
              <Options
                icon={<i className="bi bi-gear icon fs-5 fw-bold" />}
                className="position-relative"
              >
                <OptionItem onClick={handleLogout}>Settings</OptionItem>
              </Options>
            )}
          </Nav.Item>
          <Nav.Item>
            <Options
              icon={<Image src={user?.avatar} width={32} />}
              className="position-relative user mx-2"
              menuCenter={true}
            >
              <OptionItem>
                <i className="bi bi-person-lines-fill fs-5 me-3" /> View profile
              </OptionItem>
              <OptionItem onClick={handleLogout}>
                <i className="bi bi-box-arrow-right fs-5 me-3" /> Sign out
              </OptionItem>
            </Options>
          </Nav.Item>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="ms-2" />
          <Navbar.Offcanvas
            className="ps-1"
            id="offcanvasNavbar"
            placement="end"
            style={{ maxWidth: 280 }}
          >
            <Offcanvas.Header
              closeButton
              className="justify-content-end"
            ></Offcanvas.Header>
            <Offcanvas.Body>
              <Options
                icon={<Image src={user?.avatar} width={32} />}
                className="position-relative user ms-2"
              >
                <OptionItem onClick={handleLogout}> Đăng xuất</OptionItem>
              </Options>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Nav>
      </Container>
      <ModalCreateRoom
        show={showRoomCreation}
        onHide={() => setShowRoomCreation(false)}
        centered
      />
    </StyledHeader>
  );
}
