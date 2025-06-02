
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const guestFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type GuestFormData = z.infer<typeof guestFormSchema>;

interface GuestCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guestData: GuestFormData) => void;
}

const GuestCheckoutModal: React.FC<GuestCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema)
  });

  const handleFormSubmit = async (data: GuestFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Guest checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-grill-black border-grill-gold">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-grill-gold">
            Guest Checkout
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              <strong>Note:</strong> Guest orders don't earn loyalty points. 
              Create an account to earn 1 point per dollar spent!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-600 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              {isSubmitting ? 'Processing...' : 'Continue as Guest'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuestCheckoutModal;
