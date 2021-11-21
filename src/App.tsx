import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import RoomDetailsPage from "./pages/details";
import ErrorPage from "./pages/ErrorPage";
import JoinClassPage from "./pages/JoinClassPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";
import { AppProvider } from "./store/store";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <Switch>
            <ProtectedRoute path="/" exact>
              <RoomsPage />
            </ProtectedRoute>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <ProtectedRoute path="/classrooms/:id/join">
              <JoinClassPage />
            </ProtectedRoute>
            <ProtectedRoute path="/classrooms/:id">
              <RoomDetailsPage />
            </ProtectedRoute>
            <ProtectedRoute path="/user/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
