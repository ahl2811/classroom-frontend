import React from "react";
import { Nav } from "react-bootstrap";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../components/header";
import MembersPage from "./members";
import NewsPage from "./news";
import { RoomDetailsStyle } from "./style";

const RoomDetailsPage = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();

  const RoomDetailsNav = (
    <Nav
      defaultActiveKey={`${location.pathname}`}
      className="d-flex flex-row order-last order-sm-2 flex-nowrap flex-fill overflow-auto justify-content-mobile justify-content-start"
    >
      <div className="d-flex flex-row order-last order-sm-2 justify-content-center flex-fill flex-grow-2">
        <Nav.Item className="text-nowrap">
          <Link to={`${url}`}>
            <Nav.Link href={`${url}`}>News</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item className="text-nowrap">
          <Link to={`${url}/tasks`}>
            <Nav.Link href={`${url}/tasks`}>Homeworks</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item className="text-nowrap">
          <Link to={`${url}/members`}>
            <Nav.Link href={`${url}/members`}>Members</Nav.Link>
          </Link>
        </Nav.Item>
        <Nav.Item className="text-nowrap">
          <Link to={`${url}/scores`}>
            <Nav.Link href={`${url}/scores`}>Scores</Nav.Link>
          </Link>
        </Nav.Item>
      </div>
    </Nav>
  );
  return (
    <>
      <Header roomDetailsNav={RoomDetailsNav} />
      <RoomDetailsStyle>
        <ToastContainer />
        <Switch>
          <Route path={`${path}/tasks`}>Homeworks page</Route>
          <Route path={`${path}/members`} component={MembersPage} />
          <Route path={`${path}/scores`}>Scores page</Route>
          <Route path={path} component={NewsPage} />
        </Switch>
      </RoomDetailsStyle>
    </>
  );
};

export default RoomDetailsPage;
