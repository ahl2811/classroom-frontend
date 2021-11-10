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
    <StyledHeader bg="white" expand="sm" sticky="top">
      <Container
        fluid
        className="d-flex justify-content-between flex-wrap py-1"
      >
        <Nav className="order-first">
          <Link to="/">
            <Navbar.Brand className="text-dark me-0">{title}</Navbar.Brand>
          </Link>
        </Nav>
        {roomDetailsNav}

        <Nav className="justify-content-end order-2 order-md-last flex-nowrap flex-row">
          <Nav.Item>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success">Thêm lớp học</Dropdown.Toggle>
              <Dropdown.Menu className="position-absolute">
                <Dropdown.Item>Tham gia lớp học</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowRoomCreation(true)}>
                  Tạo lớp học
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
          <Navbar.Collapse>
            <Nav.Item>
              <Options
                icon={<Image src={user?.avatar} width={32} />}
                className="position-relative user"
              >
                <OptionItem onClick={handleLogout}> Đăng xuất</OptionItem>
              </Options>
            </Nav.Item>
          </Navbar.Collapse>
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
