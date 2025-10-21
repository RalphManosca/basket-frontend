<template>
  <header class="bg-white shadow-md sticky top-0 z-40">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold text-blue-600">Cinch E-Commerce</h1>
        </router-link>

        <nav class="flex items-center space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-blue-600 transition-colors"
            active-class="text-blue-600 font-semibold"
          >
            Products
          </router-link>

          <router-link
            to="/cart"
            class="relative flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="ml-1">Cart</span>
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCart } from '@/composables/useCart';

const { cartCount } = useCart();
</script>
