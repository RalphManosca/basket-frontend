<template>
  <div class="bg-gray-50 p-6 rounded-lg sticky top-20">
    <h2 class="text-2xl font-bold mb-6">Order Summary</h2>

    <div class="space-y-3 mb-6">
      <div class="flex justify-between text-gray-700">
        <span>Subtotal ({{ itemCount }} items)</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div class="border-t pt-3 flex justify-between text-xl font-bold">
        <span>Total</span>
        <span class="text-green-600">${{ total.toFixed(2) }}</span>
      </div>
    </div>

    <router-link
      to="/checkout"
      class="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
    >
      Proceed to Checkout
    </router-link>

    <router-link
      to="/"
      class="block w-full text-center text-blue-600 hover:text-blue-800 mt-4 transition-colors"
    >
      Continue Shopping
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const subtotal = computed(() => props.total);

const itemCount = computed(() => {
  return props.items.reduce((count, item) => count + item.quantity, 0);
});
</script>
