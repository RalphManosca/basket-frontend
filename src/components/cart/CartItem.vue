<template>
  <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
    <img
      :src="item.image_url || 'https://via.placeholder.com/100'"
      :alt="item.product_name"
      class="w-20 h-20 object-cover rounded"
    />

    <div class="flex-1">
      <h3 class="font-semibold text-gray-800">{{ item.product_name }}</h3>
      <p class="text-gray-600">${{ item.unit_price.toFixed(2) }}</p>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="decrementQuantity"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        :disabled="item.quantity <= 1"
      >
        -
      </button>

      <input
        type="number"
        :value="item.quantity"
        @input="handleQuantityChange"
        min="1"
        class="w-16 px-2 py-1 border border-gray-300 rounded text-center"
      />

      <button
        @click="incrementQuantity"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
      >
        +
      </button>
    </div>

    <div class="text-right">
      <p class="font-bold text-gray-800">
        ${{ (item.unit_price * item.quantity).toFixed(2) }}
      </p>

      <button
        @click="handleRemove"
        class="text-red-600 hover:text-red-800 text-sm mt-1 transition-colors"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const { updateQuantity, removeFromCart } = useCart();

const handleQuantityChange = (event) => {
  const newQuantity = parseInt(event.target.value) || 1;
  updateQuantity(props.item.product_id, newQuantity);
};

const incrementQuantity = () => {
  updateQuantity(props.item.product_id, props.item.quantity + 1);
};

const decrementQuantity = () => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.product_id, props.item.quantity - 1);
  }
};

const handleRemove = () => {
  removeFromCart(props.item.product_id);
};
</script>
