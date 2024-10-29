import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminPage from "pages/AdminPage";
import LoginPage from "pages/LoginPage";
import SmartRoute from "./SmartRoute";
import RegisterForm from "components/templates/RegisterForm";

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
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
