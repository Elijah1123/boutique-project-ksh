
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Index from './pages/Index';
import NewArrivals from './pages/NewArrivals';
import Women from './pages/Women';
import Men from './pages/Men';
import Accessories from './pages/Accessories';
import Sale from './pages/Sale';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
