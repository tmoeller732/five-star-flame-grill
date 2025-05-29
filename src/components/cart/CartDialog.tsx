
import React, { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  console.log('CartDialog - isMobile:', isMobile, 'cartItems:', state.items.length);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm flex flex-col h-full">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Your Cart ({state.itemCount} items)
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 mt-4">
            <CartContent onClose={handleClose} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Your Cart ({state.itemCount} items)
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          <CartContent onClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
