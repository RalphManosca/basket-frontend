<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300"
      :class="getToastClass(toast.type)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast';

const { toasts } = useToast();

const getToastClass = (type) => {
  const classes = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600'
  };
  return classes[type] || classes.info;
};
</script>
