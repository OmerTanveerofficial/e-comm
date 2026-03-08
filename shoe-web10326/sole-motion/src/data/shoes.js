export const shoeFilters = [
    'All',
    'Men',
    'Women',
    'Unisex',
    'Running',
    'Casual',
    'Athletic'
  ];
  
  export const shoes = [
    {
      id: 's1',
      name: 'AeroStride Runner',
      description:
        'Lightweight running shoe with responsive cushioning tuned for daily miles.',
      price: 11999,
      tag: 'New Arrival',
      category: 'Running',
      gender: 'Men',
      image:
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's2',
      name: 'CityFlex Sneaker',
      description:
        'Minimal everyday sneaker that moves seamlessly from studio to street.',
      price: 10499,
      tag: 'Bestseller',
      category: 'Casual',
      gender: 'Unisex',
      image:
        'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's3',
      name: 'CloudStep Trainer',
      description:
        'Breathable mesh upper with plush foam midsole for all-day sessions.',
      price: 9499,
      tag: 'Trending',
      category: 'Athletic',
      gender: 'Women',
      image:
        'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's4',
      name: 'StreetWave High',
      description: 'High-top silhouette with bold profile and premium leather.',
      price: 14999,
      category: 'Casual',
      gender: 'Men',
      image:
        'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's5',
      name: 'StudioGlide Slip-On',
      description: 'Hands-free slip-on design with a snug, sock-like fit.',
      price: 9999,
      category: 'Casual',
      gender: 'Women',
      image:
        'https://images.pexels.com/photos/1821362/pexels-photo-1821362.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's6',
      name: 'PulseTrack Sprint',
      description: 'Aggressive traction and midfoot plate for explosive sprints.',
      price: 13999,
      category: 'Running',
      gender: 'Unisex',
      image:
        'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's7',
      name: 'CoreLift Trainer',
      description:
        'Stable base for lifting days and cross-training, with lateral support.',
      price: 12999,
      category: 'Athletic',
      gender: 'Men',
      image:
        'https://images.pexels.com/photos/1000431/pexels-photo-1000431.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 's8',
      name: 'VelvetStride Luxe',
      description: 'Suede upper, plush lining, and soft steps for long walks.',
      price: 11499,
      category: 'Casual',
      gender: 'Women',
      image:
        'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  export const formatPrice = (pkr) =>
  `Rs. ${pkr.tString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;