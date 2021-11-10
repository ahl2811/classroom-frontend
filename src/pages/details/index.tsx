import React from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Row,
} from "react-bootstrap";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Header from "../../components/Header";

const RoomDetailsPage = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();

  const RoomDetailsNav = (
    <Nav
      defaultActiveKey={`${location.pathname}`}
      className="d-flex flex-row order-last flex-nowrap flex-fill overflow-auto justify-content-mobile"
    >
      <Link to={`${url}`}>
        <Nav.Item className="pe-1 text-nowrap">
          <Nav.Link href={`${url}`}>Bảng tin</Nav.Link>
        </Nav.Item>
      </Link>
      <Link to={`${url}/tasks`}>
        <Nav.Item className="px-1 text-nowrap">
          <Nav.Link href={`${url}/tasks`}>Bài tập trên lớp</Nav.Link>
        </Nav.Item>
      </Link>
      <Link to={`${url}/members`}>
        <Nav.Item className="px-1 text-nowrap">
          <Nav.Link href={`${url}/members`}>Mọi người</Nav.Link>
        </Nav.Item>
      </Link>
      <Link to={`${url}/scores`}>
        <Nav.Item className="ps-1 text-nowrap">
          <Nav.Link href={`${url}/scores`}>Số điểm</Nav.Link>
        </Nav.Item>
      </Link>
    </Nav>
  );
  return (
    <>
      <Header roomDetailsNav={RoomDetailsNav} />
      <Container style={{ maxWidth: 1000 }} className="py-4">
        <Switch>
          <Route path={`${path}/tasks`}>Bai tap</Route>
          <Route path={`${path}/members`}>ThanhVien</Route>
          <Route path={`${path}/scores`}>Diem</Route>
          <Route path={path}>
            <Row
              style={{ backgroundColor: "Teal", minHeight: 240 }}
              className="d-flex align-items-end rounded justify-content-between flex-column g-0"
            >
              <div className="d-flex flex-row justify-content-end">
                <DropdownButton
                  variant="dark"
                  title="Tùy chỉnh"
                  className="m-3"
                >
                  <Dropdown.Item>Đổi ảnh bìa</Dropdown.Item>
                </DropdownButton>
              </div>

              <div className="text-white p-3">
                <h1>Ten Lop</h1>
                <h4 className="fw-normal mb-0 mt-1">Mo ta</h4>
              </div>
            </Row>
            <Row className="mt-2">
              <Col sm={2}>Col1</Col>
              <Col>Col2</Col>
            </Row>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default RoomDetailsPage;
