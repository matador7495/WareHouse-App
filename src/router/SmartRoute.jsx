import { Navigate } from "react-router-dom";
import { getCookie } from "utils/cookie";

function SmartRoute({ children, requiresAuth }) {
  const token = getCookie("token");
  if (requiresAuth && !token) return <Navigate to="/login" />;
  if (!requiresAuth && token) return <Navigate to="/" />;
  return children;
}

export default SmartRoute;
