import React, { useMemo } from "react";
import { Nav } from "react-bootstrap";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Header from "../../components/header";
import useMembers from "../../hooks/useMembers";
import useUserContext from "../../hooks/useUserContext";
import GradesPage from "../grades";
import StudentScoresPage from "../scores";
import MembersPage from "./members";
import NewsPage from "./news";

const RoomDetailsPage = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { isTeacher } = useMembers(id);
  const { user } = useUserContext();
  console.log("user", user);
  const RoomDetailsNav = useMemo(
    () => (
      <Nav
        defaultActiveKey={`${location.pathname}`}
        className="d-flex flex-row order-last order-sm-2 flex-nowrap flex-fill overflow-auto justify-content-mobile justify-content-start"
      >
        <div className="d-flex flex-row order-last order-sm-2 justify-content-center flex-fill flex-grow-2">
          <Nav.Item className="text-nowrap">
            <Link to={`${url}`}>
              <Nav.Link href={`${url}`}>Stream</Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item className="text-nowrap">
            <Link to={`${url}/members`}>
              <Nav.Link href={`${url}/members`}>People</Nav.Link>
            </Link>
          </Nav.Item>
          {isTeacher ? (
            <Nav.Item className="text-nowrap">
              <Link to={`${url}/grades`}>
                <Nav.Link href={`${url}/grades`}>Grades</Nav.Link>
              </Link>
            </Nav.Item>
          ) : (
            <Nav.Item className="text-nowrap">
              <Link to={`${url}/scores?studentId=${user?.studentId}`}>
                <Nav.Link href={`${url}/scores`}>Scores</Nav.Link>
              </Link>
            </Nav.Item>
          )}
        </div>
      </Nav>
    ),
    [isTeacher, location.pathname, url, user?.studentId]
  );

  return (
    <>
      <Header roomDetailsNav={RoomDetailsNav} />
      <Switch>
        <Route path={`${path}/members`} component={MembersPage} />
        <Route path={`${path}/grades`} component={GradesPage} />
        <Route path={`${path}/scores`} component={StudentScoresPage} />

        <Route path={path} component={NewsPage} />
      </Switch>
    </>
  );
};

export default RoomDetailsPage;
