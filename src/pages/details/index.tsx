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
import GradeStructurePage from "../grade-structure";
import GradesPage from "../grades";
import ReviewsPage from "../reviews";
import StudentScoresPage from "../scores";
import MembersPage from "./members";
import NewsPage from "./news";

const RoomDetailsPage = () => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { isTeacher } = useMembers(id);
  const { user } = useUserContext();
  const pathname = location.pathname;
  const name = pathname.replace(url, "");

  const RoomDetailsNav = useMemo(
    () => (
      <Nav className="d-flex flex-row order-last order-sm-2 flex-nowrap flex-fill overflow-auto justify-content-mobile justify-content-start">
        <div className="d-flex flex-row order-last order-sm-2 justify-content-center flex-fill flex-grow-2">
          <Nav.Item className="text-nowrap">
            <Link to={`${url}/streams`}>
              <span
                className={`nav-link ${
                  name === "/streams" ? "active" : undefined
                }`}
              >
                Streams
              </span>
            </Link>
          </Nav.Item>
          <Nav.Item className="text-nowrap">
            <Link to={`${url}/members`}>
              <span
                className={`nav-link ${
                  name === "/members" ? "active" : undefined
                }`}
              >
                People
              </span>
            </Link>
          </Nav.Item>
          {isTeacher ? (
            <>
              <Nav.Item className="text-nowrap">
                <Link to={`${url}/grades`}>
                  <span
                    className={`nav-link ${
                      name === "/grades" ? "active" : undefined
                    }`}
                  >
                    Grades
                  </span>
                </Link>
              </Nav.Item>
              <Nav.Item className="text-nowrap">
                <Link to={`${url}/reviews`}>
                  <span
                    className={`nav-link ${
                      name === "/reviews" ? "active" : undefined
                    }`}
                  >
                    Reviews
                  </span>
                </Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item className="text-nowrap">
              <Link to={`${url}/scores?studentId=${user?.studentId}`}>
                <span
                  className={`nav-link ${
                    name === "/scores" ? "active" : undefined
                  }`}
                >
                  Scores
                </span>
              </Link>
            </Nav.Item>
          )}
        </div>
      </Nav>
    ),
    [isTeacher, name, url, user?.studentId]
  );

  return (
    <>
      <Header roomDetailsNav={RoomDetailsNav} />
      <Switch>
        <Route path={`${path}/streams`} component={NewsPage} />
        <Route path={`${path}/members`} component={MembersPage} />
        <Route path={`${path}/grades`} component={GradesPage} />
        <Route path={`${path}/reviews`} component={ReviewsPage} />
        <Route path={`${path}/scores`} component={StudentScoresPage} />
        <Route
          path={`${path}/grade-structure`}
          component={GradeStructurePage}
        />
      </Switch>
    </>
  );
};

export default RoomDetailsPage;
