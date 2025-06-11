
import { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const NewArrivals = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
          <p className="text-lg text-muted-foreground">
            Discover our latest collection of trendy clothing
          </p>
        </div>
        <ProductGrid filterCategory="new" />
      </div>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default NewArrivals;
