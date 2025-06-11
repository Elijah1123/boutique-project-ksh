
import { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';

const Men = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Men's Collection</h1>
          <p className="text-lg text-muted-foreground">
            Sharp and contemporary styles for the modern gentleman
          </p>
        </div>
        <ProductGrid filterCategory="men" />
      </div>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Men;
