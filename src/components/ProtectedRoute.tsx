import { Redirect, Route, RouteProps } from "react-router";
import useUserContext from "../hooks/useUserContext";

export default function ProtectedRoute({
  children,
  ...routeProps
}: RouteProps) {
  const { user } = useUserContext();
  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
