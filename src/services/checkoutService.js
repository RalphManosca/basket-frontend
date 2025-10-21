import { checkoutAPI } from './api';

export const checkoutService = {
  createOrder: async (orderData) => {
    return await checkoutAPI.post('/orders', orderData);
  },

  getOrder: async (orderId) => {
    return await checkoutAPI.get(`/orders/${orderId}`);
  }
};
