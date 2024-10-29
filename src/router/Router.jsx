import { BrowserRouter, Route, Routes } from "react-router-dom";

import SmartRoute from "./SmartRoute";
import AdminPage from "pages/AdminPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <SmartRoute requiresAuth={true}>
              <AdminPage />
            </SmartRoute>
          }
        />
        <Route
          path="/login"
          element={
            <SmartRoute requiresAuth={false}>
              <LoginPage />
            </SmartRoute>
          }
        />
        <Route
          path="/register"
          element={
            <SmartRoute requiresAuth={false}>
              <RegisterPage />
            </SmartRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
