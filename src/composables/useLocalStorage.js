import { watch } from 'vue';

export function useLocalStoragePersistence(key, data) {
  // Load from localStorage on init
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      data.value = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored data:', e);
    }
  }

  // Watch for changes and persist
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );
}
