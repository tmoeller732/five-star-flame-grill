
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import CartContent from './CartContent';

interface CartDialogProps {
  children: React.ReactNode;
}

const CartDialog = ({ children }: CartDialogProps) => {
  const { state } = useCart();
  const isMobile = useIsMobile();

  console.log('CartDialog - isMobile:', isMobile, 'cartItems:', state.items.length);
  console.log('CartDialog - rendering, isMobile:', isMobile);

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Your Cart ({state.itemCount} items)
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <CartContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Your Cart ({state.itemCount} items)
          </DialogTitle>
        </DialogHeader>
        <CartContent />
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
