import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivationPage from "./pages/auth/activation";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import RoomDetailsPage from "./pages/details";
import JoinClassPage from "./pages/details/join";
import ErrorPage from "./pages/error";
import GradeStructurePage from "./pages/grade-structure";
import RoomsPage from "./pages/rooms";
import ProfilePage from "./pages/user";
import { AppProvider } from "./store";

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
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Router>
            <Switch>
              <ProtectedRoute path="/" exact>
                <RoomsPage />
              </ProtectedRoute>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/activation" component={ActivationPage} />
              <ProtectedRoute path="/classrooms/:id/join">
                <JoinClassPage />
              </ProtectedRoute>
              <ProtectedRoute path="/classrooms/:id/grade-structure">
                <GradeStructurePage />
              </ProtectedRoute>
              <ProtectedRoute path="/classrooms/:id">
                <RoomDetailsPage />
              </ProtectedRoute>
              <ProtectedRoute path="/user/:id">
                <ProfilePage />
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
      <ToastContainer />
    </>
  );
}

export default App;
