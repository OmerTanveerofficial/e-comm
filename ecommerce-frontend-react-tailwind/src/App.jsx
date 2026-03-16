import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './components/Footer.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { CartProvider } from './CartContext.jsx';
import { WishlistProvider } from './WishlistContext.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Sale from './pages/Sale.jsx';
import NewArrivals from './pages/NewArrivals.jsx';
import Wishlist from './pages/Wishlist.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
              <Navbar onSearch={setSearchQuery} />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products searchQuery={searchQuery} />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/sale" element={<Sale />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
