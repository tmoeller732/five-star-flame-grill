
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

const OrderDecisionModal = ({ isOpen, onClose, itemName }: OrderDecisionModalProps) => {
  const navigate = useNavigate();

  const handleCompleteOrder = () => {
    onClose();
    navigate('/checkout');
  };

  const handleContinueOrdering = () => {
    onClose();
    // Stay on current page (menu)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle size={48} className="text-green-500" />
            <DialogTitle className="text-xl">Thank You!</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            <strong>{itemName}</strong> has been added to your cart.
          </p>
          
          <p className="text-sm text-gray-500">
            Would you like to complete your order or continue ordering?
          </p>
          
          <div className="space-y-3 pt-2">
            <Button 
              onClick={handleCompleteOrder}
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              Complete Order
            </Button>
            
            <Button 
              onClick={handleContinueOrdering}
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Continue Ordering
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDecisionModal;
