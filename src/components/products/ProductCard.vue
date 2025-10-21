<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <router-link :to="`/products/${product.id}`">
      <img
        :src="product.image_url || 'https://via.placeholder.com/300'"
        :alt="product.name"
        class="w-full h-48 object-cover"
      />
    </router-link>

    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        {{ product.name }}
      </h3>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-green-600">
          ${{ product.price.toFixed(2) }}
        </span>

        <button
          @click="handleAddToCart"
          :disabled="product.stock === 0"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>

      <p class="text-sm text-gray-500 mt-2">
        {{ product.stock }} in stock
      </p>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addToCart } = useCart();
const { showToast } = useToast();

const handleAddToCart = () => {
  addToCart(props.product, 1);
  showToast(`${props.product.name} added to cart`, 'success');
};
</script>
