
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from '@/hooks/use-toast';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: itemId, quantity: newQuantity }
    });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  const formatPrice = (price: number) => {
    return `KSH ${price.toLocaleString()}`;
  };

  const shippingCost = state.total >= 5000 ? 0 : 500;
  const finalTotal = state.total + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
            </span>
            {state.items.length > 0 && (
              <Badge variant="secondary">{state.itemCount} items</Badge>
            )}
          </SheetTitle>
          
          {state.items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {state.items.map((item) => {
                  const itemKey = `${item.id}-${item.size}-${item.color}`;
                  return (
                    <div key={itemKey} className="flex gap-3 p-3 bg-card rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md bg-gray-100"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-sm">
                            {formatPrice(item.price)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[1.5rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(itemKey)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  
                  {state.total < 5000 && (
                    <p className="text-xs text-muted-foreground">
                      Add {formatPrice(5000 - state.total)} more for free shipping
                    </p>
                  )}
                  
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
