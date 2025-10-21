import { ref, computed } from 'vue';
import { useLocalStoragePersistence } from './useLocalStorage';

const cartItems = ref([]);

// Persist cart to localStorage
useLocalStoragePersistence('cart', cartItems);

export function useCart() {
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(
      item => item.product_id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({
        product_id: product.id,
        product_name: product.name,
        quantity,
        unit_price: product.price,
        image_url: product.image_url
      });
    }
  };

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(
      item => item.product_id !== productId
    );
  };

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(i => i.product_id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + (item.unit_price * item.quantity),
      0
    );
  });

  const cartCount = computed(() => {
    return cartItems.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  });

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
}
