import { ref } from 'vue';
import { catalogService } from '@/services/catalogService';

export function useProducts() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await catalogService.getProducts();
      products.value = response.data.data;
    } catch (err) {
      error.value = 'Failed to load products. Please try again.';
      console.error('Fetch products error:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await catalogService.getProduct(id);
      return response.data.data;
    } catch (err) {
      error.value = 'Product not found.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById
  };
}
