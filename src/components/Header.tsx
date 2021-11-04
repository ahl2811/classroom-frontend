import React, { useContext, useState } from 'react';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Logout } from '../store/actions';
import { store } from '../store/store';
import RoomCreation from './modals/RoomCreation';
import Options from './Options';
import { StyledHeader } from './styled/CommonStyle';
import { OptionItem } from './styled/OptionStyle';

export default function Header() {
  const {
    state: {
      userState: { user },
    },
    dispatch,
  } = useContext(store);
  const [showRoomCreation, setShowRoomCreation] = useState(false);

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <StyledHeader bg="light" expand="sm" sticky="top">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand className="text-dark">Classroom</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Item>
              <Dropdown align="end">
                <Dropdown.Toggle variant="success">
                  Thêm lớp học
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Tham gia lớp học</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowRoomCreation(true)}>
                    Tạo lớp học
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item className="ms-2">
              <Options
                icon={<Image src={user?.avatar} width={32} />}
                className="position-relative"
              >
                <OptionItem onClick={handleLogout}> Đăng xuất</OptionItem>
              </Options>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <RoomCreation
        show={showRoomCreation}
        onHide={() => setShowRoomCreation(false)}
        centered
      />
    </StyledHeader>
  );
}
