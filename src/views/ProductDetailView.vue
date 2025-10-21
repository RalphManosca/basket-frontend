<template>
  <div class="container mx-auto px-4 py-8">
    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {{ error }}
      <router-link to="/" class="ml-4 text-red-800 underline hover:no-underline">
        Back to Products
      </router-link>
    </div>

    <div v-else-if="product" class="max-w-6xl mx-auto">
      <button @click="router.push('/')" class="mb-4 text-blue-600 hover:text-blue-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Products
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            :src="product.image_url || 'https://via.placeholder.com/600'"
            :alt="product.name"
            class="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>

          <p class="text-4xl font-bold text-green-600 mb-6">
            ${{ product.price.toFixed(2) }}
          </p>

          <p class="text-gray-700 mb-6 leading-relaxed">
            {{ product.description }}
          </p>

          <div class="mb-6">
            <p class="text-gray-600 mb-2">
              <span class="font-semibold">Availability:</span>
              <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'" class="ml-2">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
              </span>
            </p>
          </div>

          <div class="flex items-center gap-4 mb-6">
            <label for="quantity" class="font-semibold">Quantity:</label>
            <input
              id="quantity"
              v-model.number="quantity"
              type="number"
              min="1"
              :max="product.stock"
              class="w-20 px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            @click="handleAddToCart"
            :disabled="product.stock === 0"
            class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import { useToast } from '@/composables/useToast';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const { loading, error, fetchProductById } = useProducts();
const { addToCart } = useCart();
const { showToast } = useToast();

const product = ref(null);
const quantity = ref(1);

onMounted(async () => {
  try {
    product.value = await fetchProductById(route.params.id);
  } catch (err) {
    console.error('Failed to load product:', err);
  }
});

const handleAddToCart = () => {
  addToCart(product.value, quantity.value);
  showToast(`${quantity.value} x ${product.value.name} added to cart`, 'success');
  quantity.value = 1;
};
</script>
