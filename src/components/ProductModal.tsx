
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ShoppingCart, Minus, Plus, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { dispatch } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize,
          color: selectedColor
        }
      });
    }
    toast({
      title: 'Added to cart!',
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    onClose();
  };

  const handleWishlistToggle = () => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500">New</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-red-500">Sale</Badge>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.8) 127 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Size</h4>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Color</h4>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="font-semibold mb-2">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="icon" onClick={handleWishlistToggle}>
                <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping on orders over KSH 5,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
