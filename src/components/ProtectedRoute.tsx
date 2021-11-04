import { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { store } from '../store/store';

export default function ProtectedRoute({
  children,
  ...routeProps
}: RouteProps) {
  const {
    state: {
      userState: { user },
    },
  } = useContext(store);
  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
