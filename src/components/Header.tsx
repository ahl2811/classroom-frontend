import React, { ReactNode, useContext, useState } from "react";
import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from "../store/actions";
import { store } from "../store/store";
import RoomCreation from "./modals/RoomCreation";
import Options from "./Options";
import { StyledHeader } from "./styled/CommonStyle";
import { OptionItem } from "./styled/OptionStyle";

interface IHeader {
  roomDetailsNav?: ReactNode;
  title?: string;
}
export default function Header({
  roomDetailsNav,
  title = "Classroom",
}: IHeader) {
  const {
    state: { user },
    dispatch,
  } = useContext(store);
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
              <Dropdown align="end">
                <Dropdown.Toggle variant="success">Add class</Dropdown.Toggle>
                <Dropdown.Menu className="position-absolute">
                  <Dropdown.Item>Join a class</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowRoomCreation(true)}>
                    Create new class
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Options
                icon={<i className="bi bi-gear icon fs-5 fw-bold" />}
                className="position-relative"
              >
                <OptionItem onClick={handleLogout}>Cài đặt</OptionItem>
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
      <RoomCreation
        show={showRoomCreation}
        onHide={() => setShowRoomCreation(false)}
        centered
      />
    </StyledHeader>
  );
}
