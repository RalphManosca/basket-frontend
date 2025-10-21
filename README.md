# Cinch E-Commerce Frontend

Hey there! This is a clean, modern e-commerce frontend that I built using Vue.js 3 and Tailwind CSS. Think of it as your typical online shopping experience—browse products, toss them in your cart, and checkout. Simple as that.

## What's Under the Hood?

I went with a solid, modern stack that makes development a breeze:

- **Vue.js 3** with the Composition API (because who wants to deal with the Options API anymore?)
- **Vue Router** for smooth page transitions
- **Axios** to talk to our backend services
- **Tailwind CSS** for styling (utility classes FTW)
- **Vite** as the build tool (crazy fast compared to Webpack)

## What Can You Do Here?

- Browse products in a nice grid layout
- Click into product details to see more info
- Add stuff to your cart (it sticks around even if you refresh—thanks localStorage!)
- Checkout and place orders
- Works great on your phone, tablet, or desktop
- Toast notifications so you know what's happening

## What You'll Need

Before getting started, make sure you've got:

- **Node.js** v18 or newer
- **npm** (comes with Node) or **yarn** if that's your thing
- The backend services running locally:
  - Catalog Service at `http://localhost:8001`
  - Checkout Service at `http://localhost:8002`

## Getting It Running

### First Time Setup

1. **Grab the code** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd basket-frontend
   ```

2. **Install all the dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:

   Copy the example file:
   ```bash
   cp .env.example .env
   ```

   Then open `.env` and make sure the API URLs point to your backend services:
   ```env
   VITE_CATALOG_API_URL=http://localhost:8001/api
   VITE_CHECKOUT_API_URL=http://localhost:8002/api
   VITE_APP_NAME=Cinch E-Commerce
   ```

### Running Locally

Fire up the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser. You'll get hot module replacement, so changes show up instantly without refreshing.

### Building for Production

When you're ready to ship it:

```bash
npm run build
```

Want to preview what the production build looks like?

```bash
npm run preview
```

Your optimized files will be sitting in the `dist/` folder.

## Running with Docker

If you prefer containers (and honestly, who doesn't?), I've got you covered.

### Quick Start

Build the image:
```bash
docker build -t cinch-frontend .
```

Run it:
```bash
docker run -p 8080:80 cinch-frontend
```

Then head to `http://localhost:8080` and you're good to go!

### Docker Compose

Want to run the whole stack together? Here's a sample `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_CATALOG_API_URL=http://catalog:8001/api
      - VITE_CHECKOUT_API_URL=http://checkout:8002/api
    depends_on:
      - catalog
      - checkout
```

## How It's Organized

Here's the lay of the land:

```
basket-frontend/
├── src/
│   ├── assets/           # Images, global CSS, that kind of stuff
│   ├── components/       # All the Vue components
│   │   ├── cart/        # Shopping cart bits
│   │   ├── common/      # Stuff I reuse everywhere
│   │   ├── layout/      # Header, footer, etc.
│   │   └── products/    # Product cards and grids
│   ├── composables/      # Reusable logic (Vue's version of hooks)
│   ├── router/           # Page routing setup
│   ├── services/         # API calls live here
│   ├── views/            # Actual pages
│   ├── App.vue           # The root component
│   └── main.js           # Where it all starts
├── public/               # Static files that don't get processed
├── .env.example          # Template for environment variables
├── Dockerfile            # For containerizing the app
├── nginx.conf            # Web server config for production
├── tailwind.config.js    # Tailwind customization
├── vite.config.js        # Build tool settings
└── package.json          # Dependencies and scripts
```

## The Important Pieces

### Composables (Reusable Logic)
- **useCart** - Manages your shopping cart state
- **useProducts** - Fetches products from the API
- **useToast** - Shows those nice popup notifications
- **useLocalStorage** - Keeps your cart around between visits

### API Services
- **catalogService** - Talks to the product catalog backend
- **checkoutService** - Handles order creation

### Main Pages
- **HomeView** - Browse all the products
- **ProductDetailView** - Deep dive into a single product
- **CartView** - Review what's in your cart
- **CheckoutView** - Enter email and place your order
- **OrderConfirmationView** - Success! Here's your order

## How It Talks to the Backend

This frontend connects to two separate backend services. Here's what they look like:

### Catalog Service (`http://localhost:8001/api`)

**Get all products:**
```javascript
GET /api/products

// Returns:
{
  success: true,
  data: [
    {
      id: 1,
      name: "Product Name",
      description: "Description",
      price: 29.99,
      stock: 100,
      image_url: "https://...",
      created_at: "2025-01-15T10:30:00Z"
    }
    // ... more products
  ]
}
```

**Get a specific product:**
```javascript
GET /api/products/:id
```

### Checkout Service (`http://localhost:8002/api`)

**Create an order:**
```javascript
POST /api/orders

// Send this:
{
  user_email: "user@example.com",
  items: [
    {
      product_id: 1,
      product_name: "Product Name",
      quantity: 2,
      unit_price: 29.99
    }
  ]
}

// Get back:
{
  success: true,
  data: {
    id: 123,
    user_email: "user@example.com",
    total_amount: 59.98,
    status: "completed",
    items: [...],
    created_at: "2025-01-15T10:30:00Z"
  }
}
```

## Browser Support

Works great on all modern browsers:
- Chrome, Firefox, Safari, and Edge (latest versions)

## Performance Tweaks

I've added a few optimizations to keep things snappy:

- Route components load on-demand (lazy loading)
- Smart component memoization with `v-memo`
- Code gets split into smaller chunks
- Gzip compression in production
- Static assets are cached
- Optimized bundle with Terser minification

## Troubleshooting

### "Can't connect to the backend!"

First, let's make sure the backend services are actually running:

```bash
curl http://localhost:8001/api/products
curl http://localhost:8002/api/orders
```

If those don't work, start up your backend services first. Also double-check your `.env` file—make sure the URLs are correct. Oh, and peek at the browser console for any CORS errors.

### Cart keeps disappearing

Your browser might be blocking localStorage. Here's what to check:

1. Open DevTools → Application → Local Storage
2. Make sure localStorage isn't disabled
3. Try clearing your browser cache and reloading

### Build failing?

Sometimes npm gets confused. This usually fixes it:

```bash
# Nuke everything and start fresh
rm -rf node_modules package-lock.json
npm install

# Clear Vite's cache too
rm -rf .vite
```

## Want to Contribute?

Cool! Here's the flow:

1. Fork this repo
2. Create a branch: `git checkout -b feature/my-cool-feature`
3. Make your changes and commit: `git commit -m 'Add my cool feature'`
4. Push it up: `git push origin feature/my-cool-feature`
5. Open a Pull Request

## Need Help?

Run into issues? Open an issue on GitHub and I'll take a look!
