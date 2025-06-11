
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';
import { Search, Filter } from 'lucide-react';

interface ProductGridProps {
  filterCategory?: string;
}

const ProductGrid = ({ filterCategory }: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = products.filter(product => {
    // Apply filter category if provided
    if (filterCategory) {
      if (filterCategory === 'new' && !product.isNew) return false;
      if (filterCategory === 'sale' && !product.isSale) return false;
      if (filterCategory === 'women' && !product.category.toLowerCase().includes('dress') && product.category !== 'Dresses') return false;
      if (filterCategory === 'men' && (product.category === 'Dresses' || product.category.toLowerCase().includes('dress'))) return false;
      if (filterCategory === 'accessories' && !['Shoes'].includes(product.category)) return false;
    }

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'under-3000') matchesPrice = product.price < 3000;
    else if (priceRange === '3000-5000') matchesPrice = product.price >= 3000 && product.price <= 5000;
    else if (priceRange === 'above-5000') matchesPrice = product.price > 5000;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'newest': 
      default: 
        return a.isNew ? -1 : b.isNew ? 1 : 0;
    }
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {!filterCategory && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked collection of premium clothing with prices in Kenyan Shillings
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-3000">Under KSH 3,000</SelectItem>
                <SelectItem value="3000-5000">KSH 3,000 - 5,000</SelectItem>
                <SelectItem value="above-5000">Above KSH 5,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Showing {sortedProducts.length} of {products.length} products
            </p>
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
