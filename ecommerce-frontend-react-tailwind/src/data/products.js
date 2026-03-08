export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

export const products = [
  {
    id: '1',
    name: 'Modern Wireless Headphones',
    description:
      'Noise-cancelling over-ear headphones with 30 hours battery life.',
    price: 129.99,
    category: 'Electronics',
    image:
      'https://images.pexels.com/photos/3945634/pexels-photo-3945634.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    badge: 'Bestseller',
    featured: true
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch',
    description:
      'Track your fitness, notifications, and sleep with style.',
    price: 179.0,
    category: 'Electronics',
    image:
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    badge: 'New',
    featured: true
  },
  {
    id: '3',
    name: 'Premium Cotton Hoodie',
    description: 'Ultra-soft hoodie for daily comfort and style.',
    price: 59.99,
    category: 'Fashion',
    image:
      'https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    badge: 'Popular',
    featured: true
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable chair designed for long working sessions.',
    price: 249.99,
    category: 'Home',
    image:
      'https://images.pexels.com/photos/6964072/pexels-photo-6964072.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    featured: false
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Keeps drinks cold for 24 hours and hot for 12.',
    price: 24.5,
    category: 'Sports',
    image:
      'https://images.pexels.com/photos/7864463/pexels-photo-7864463.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    featured: false
  },
  {
    id: '6',
    name: 'Running Sneakers',
    description: 'Lightweight sneakers for daily runs and workouts.',
    price: 89.0,
    category: 'Sports',
    image:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    featured: false
  },
  {
    id: '7',
    name: 'Decorative Table Lamp',
    description: 'Warm ambient light for your bedroom or office.',
    price: 39.99,
    category: 'Home',
    image:
      'https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    featured: false
  },
  {
    id: '8',
    name: 'Slim Fit Jeans',
    description: 'Classic mid-rise slim fit denim.',
    price: 69.99,
    category: 'Fashion',
    image:
      'https://images.pexels.com/photos/7671162/pexels-photo-7671162.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    featured: false
  }
];

export const getProductById = id => products.find(p => p.id === id);