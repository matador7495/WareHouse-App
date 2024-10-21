import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3Mjk1NDA1ODc4NjQiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzI5NTQwNjE5LCJleHAiOjE3Mjk1NDQyMTl9.JggiPtC_jfRWK1uzwfqp9CIVCEq5FKYV_y1ICsXKSXo";

    if (token) request.headers.Authorization = `Bearer ${token}`;

    return request;
  },

  (error) => Promise.reject(error)
);

export default api;
