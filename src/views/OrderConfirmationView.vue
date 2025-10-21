<template>
  <div class="container mx-auto px-4 py-8 max-w-3xl">
    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {{ error }}
      <router-link to="/" class="ml-4 text-red-800 underline hover:no-underline">
        Back to Home
      </router-link>
    </div>

    <div v-else-if="order" class="text-center">
      <div class="mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p class="text-gray-600">Thank you for your purchase</p>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg mb-8 text-left">
        <h2 class="text-xl font-semibold mb-4">Order Details</h2>

        <div class="space-y-2 mb-4">
          <p><span class="font-semibold">Order ID:</span> {{ order.id }}</p>
          <p><span class="font-semibold">Email:</span> {{ order.user_email }}</p>
          <p><span class="font-semibold">Status:</span>
            <span class="text-green-600 font-semibold">{{ order.status }}</span>
          </p>
          <p><span class="font-semibold">Order Date:</span> {{ formatDate(order.created_at) }}</p>
        </div>

        <div class="border-t pt-4 mt-4">
          <h3 class="font-semibold mb-3">Items</h3>
          <div v-for="item in order.items" :key="item.product_id" class="flex justify-between py-2">
            <span>{{ item.product_name }} × {{ item.quantity }}</span>
            <span class="font-semibold">${{ (item.unit_price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="border-t pt-4 mt-4 flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span class="text-green-600">${{ Number(order.total_amount).toFixed(2) }}</span>
        </div>
      </div>

      <div class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
        <p>A confirmation email has been sent to <strong>{{ order.user_email }}</strong></p>
      </div>

      <router-link
        to="/"
        class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { checkoutService } from '@/services/checkoutService';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const route = useRoute();
const order = ref(null);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    const response = await checkoutService.getOrder(route.params.id);
    order.value = response.data.data;
  } catch (err) {
    error.value = 'Failed to load order details.';
    console.error('Failed to load order:', err);
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
