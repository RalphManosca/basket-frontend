<template>
  <div class="flex items-center justify-center" :class="sizeClass">
    <div
      class="animate-spin rounded-full border-t-2 border-b-2 border-blue-600"
      :class="spinnerSize"
      role="status"
      aria-label="Loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});

const sizeClass = computed(() => {
  return {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24'
  }[props.size];
});

const spinnerSize = computed(() => {
  return {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }[props.size];
});
</script>
