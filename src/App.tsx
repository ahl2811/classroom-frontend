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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";
import { AppProvider } from "./store/store";

function App() {
  const queryClient = new QueryClient();
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
            {/* <ProtectedRoute path="/:id">
                <RoomDetailsPage />
              </ProtectedRoute> */}
            <Route path="/classrooms/:id" component={RoomDetailsPage} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
