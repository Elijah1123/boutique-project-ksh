
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from '@/hooks/use-toast';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes[0] || 'M',
        color: product.colors[0] || 'Default'
      }
    });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      toast({
        title: 'Added to wishlist!',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const formatPrice = (price: number) => {
    return `KSH ${price.toLocaleString()}`;
  };

  return (
    <>
      <div 
        className="group relative bg-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {product.originalPrice && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Size/Color indicators */}
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{product.colors.length} color{product.colors.length !== 1 ? 's' : ''}</span>
            <span>{product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
