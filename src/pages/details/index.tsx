import React, { useContext } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Image,
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
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import Options from "../../components/Options";
import { RoomDetailsStyle } from "../../components/styled/CommonStyle";
import { OptionItem } from "../../components/styled/OptionStyle";
import { CodeCard, PostNotifyCard } from "../../components/styled/RoomStyle";
import { store } from "../../store/store";
import MembersPage from "./MembersPage";
import { CopyToClipboard } from "react-copy-to-clipboard";

const RoomDetailsPage = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const {
    state: { user },
  } = useContext(store);

  const copyToClipBoard = (value: string) => {
    toast.success(`Copied ${value}`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const RoomDetailsNav = (
    <Nav
      defaultActiveKey={`${location.pathname}`}
      className="d-flex flex-row order-last order-sm-2 flex-nowrap flex-fill overflow-auto justify-content-mobile justify-content-start"
    >
      <div className="d-flex flex-row order-last order-sm-2 justify-content-center flex-fill flex-grow-2">
        <Link to={`${url}`}>
          <Nav.Item className="px-3 text-nowrap">
            <Nav.Link href={`${url}`}>News</Nav.Link>
          </Nav.Item>
        </Link>
        <Link to={`${url}/tasks`}>
          <Nav.Item className="px-3 text-nowrap">
            <Nav.Link href={`${url}/tasks`}>Homeworks</Nav.Link>
          </Nav.Item>
        </Link>
        <Link to={`${url}/members`}>
          <Nav.Item className="px-3 text-nowrap">
            <Nav.Link href={`${url}/members`}>Members</Nav.Link>
          </Nav.Item>
        </Link>
        <Link to={`${url}/scores`}>
          <Nav.Item className="px-3 text-nowrap">
            <Nav.Link href={`${url}/scores`}>Scores</Nav.Link>
          </Nav.Item>
        </Link>
      </div>
    </Nav>
  );
  return (
    <>
      <Header roomDetailsNav={RoomDetailsNav} />
      <RoomDetailsStyle className="py-4">
        <ToastContainer />
        <Switch>
          <Route path={`${path}/tasks`}>Homeworks page</Route>
          <Route path={`${path}/members`} component={MembersPage} />
          <Route path={`${path}/scores`}>Scores page</Route>
          <Route path={path}>
            <Row className="d-flex align-items-end rounded justify-content-between flex-column g-0 banner notify-item">
              <div className="d-flex flex-row justify-content-end">
                <DropdownButton
                  variant="light"
                  title="Tùy chỉnh"
                  className="m-3"
                  align="end"
                >
                  <Dropdown.Item>Đổi ảnh bìa</Dropdown.Item>
                </DropdownButton>
              </div>

              <div className="text-white p-3">
                <h1 className="class-name">Ten Lop</h1>
                <h4 className="fw-normal mb-0 mt-1 class-description">Mo ta</h4>
              </div>
            </Row>
            <Row className="notify-items">
              <Col md={3}>
                <CodeCard className="w-100 notify-item">
                  <Options
                    icon={
                      <i className="bi bi-three-dots-vertical align-middle fs-5"></i>
                    }
                    menuCenter={true}
                    className="position-absolute mx-2 end-0 mt-2"
                  >
                    <CopyToClipboard
                      text={"Link"}
                      onCopy={() => copyToClipBoard("invitation link")}
                    >
                      <OptionItem>
                        <i className="bi bi-link fs-5 me-3" />
                        Copy invitation link
                      </OptionItem>
                    </CopyToClipboard>
                    <CopyToClipboard
                      text={"Code"}
                      onCopy={() => copyToClipBoard("code")}
                    >
                      <OptionItem>
                        <i className="bi bi-clipboard fs-5 me-3" />
                        Copy code
                      </OptionItem>
                    </CopyToClipboard>
                    <OptionItem>
                      <i className="bi bi-arrow-counterclockwise fs-5 me-3" />
                      Reset code
                    </OptionItem>
                  </Options>
                  <Card.Body>
                    <Card.Title className="fs-6 text-normal">Mã lớp</Card.Title>
                    <Card.Text className="code">ABCDEF</Card.Text>
                  </Card.Body>
                </CodeCard>
              </Col>
              <Col>
                <PostNotifyCard className="w-100 notify-item">
                  <div className="w-100 h-100 d-flex align-items-center">
                    <div className="avatar d-flex align-items-center justify-content-center">
                      <Image
                        src={
                          user?.avatar ||
                          "https://ui-avatars.com/api/?background=0D8ABC&color=fff"
                        }
                        roundedCircle
                        height={40}
                      />
                    </div>
                    <div className="d-flex flex-grow-1 text-secondary pe-2">
                      Notify some information to your class
                    </div>
                  </div>
                </PostNotifyCard>
              </Col>
            </Row>
          </Route>
        </Switch>
      </RoomDetailsStyle>
    </>
  );
};

export default RoomDetailsPage;
