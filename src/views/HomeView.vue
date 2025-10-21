<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Our Products</h1>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      {{ error }}
      <button @click="fetchProducts" class="ml-4 text-red-800 underline hover:no-underline">
        Retry
      </button>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-600 text-lg">No products available at the moment.</p>
    </div>

    <ProductGrid v-else :products="products" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProducts } from '@/composables/useProducts';
import ProductGrid from '@/components/products/ProductGrid.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const { products, loading, error, fetchProducts } = useProducts();

onMounted(() => {
  fetchProducts();
});
</script>
