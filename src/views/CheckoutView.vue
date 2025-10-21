<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div v-if="cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-600 mb-4">Your cart is empty</p>
      <router-link to="/" class="text-blue-600 hover:underline">
        Continue Shopping
      </router-link>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-gray-50 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div v-for="item in cartItems" :key="item.product_id" class="flex justify-between py-2">
          <span>{{ item.product_name }} × {{ item.quantity }}</span>
          <span class="font-semibold">${{ (item.unit_price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your@email.com"
        />
        <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {{ loading ? 'Processing...' : 'Place Order' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { checkoutService } from '@/services/checkoutService';

const router = useRouter();
const { cartItems, cartTotal, clearCart } = useCart();

const email = ref('');
const emailError = ref('');
const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  if (!email.value || !email.value.includes('@')) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  loading.value = true;
  error.value = '';
  emailError.value = '';

  try {
    const response = await checkoutService.createOrder({
      user_email: email.value,
      items: cartItems.value
    });

    const orderId = response.data.data.id;
    clearCart();
    router.push(`/orders/${orderId}/confirmation`);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to place order. Please try again.';
    console.error('Checkout error:', err);
  } finally {
    loading.value = false;
  }
};
</script>
