import api from "configs/apiConfig";

export const productsQuery = {
  getProducts: (params) => api.get("/products", { params }),

  getProduct: (id) => api.get(`/products/${id}`),

  createProduct: (productData) => api.post("/products", productData),

  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),

  deleteProduct: (id) => api.delete(`/products/${id}`),
};
