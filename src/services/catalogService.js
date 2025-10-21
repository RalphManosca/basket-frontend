import { catalogAPI } from './api';

export const catalogService = {
  getProducts: async () => {
    return await catalogAPI.get('/products');
  },

  getProduct: async (id) => {
    return await catalogAPI.get(`/products/${id}`);
  }
};
