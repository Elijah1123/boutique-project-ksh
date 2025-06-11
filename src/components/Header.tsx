
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  const navigation = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Women', href: '/women' },
    { name: 'Men', href: '/men' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Sale', href: '/sale' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b">
          <p>Free shipping on orders over KSH 5,000</p>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
            <a href="#" className="hover:text-foreground transition-colors">Track Order</a>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StyleHub
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors font-medium ${
                  location.pathname === item.href ? 'text-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Icons */}
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-colors font-medium py-2 ${
                    location.pathname === item.href ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
