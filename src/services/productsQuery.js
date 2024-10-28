import api from "configs/apiConfig";

export const productsQuery = {
  getProducts: (params) => api.get("/products", { params }),

  getProductById: (id) => api.get(`/products/${id}`),

  createProduct: (productData) => api.post("/products", productData),

  updateProduct: (productData) => api.put(`/products/${productData.id}`, productData),

  deleteProduct: (id) => api.delete(`/products/${id}`),
};
