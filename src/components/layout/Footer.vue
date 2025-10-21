<template>
  <footer class="bg-gray-800 text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">About Us</h3>
          <p class="text-gray-400">
            Cinch E-Commerce - Your trusted online shopping destination.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <router-link to="/" class="hover:text-white transition-colors">
                Products
              </router-link>
            </li>
            <li>
              <router-link to="/cart" class="hover:text-white transition-colors">
                Cart
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <p class="text-gray-400">
            Email: support@cinch-ecommerce.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Cinch E-Commerce. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
