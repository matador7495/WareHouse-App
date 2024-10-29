import api from "configs/apiConfig";

export const authService = {
  registerUser: (userData) => api.post("/auth/register", userData),

  loginUser: (userData) => api.post("/auth/login", userData),
};
