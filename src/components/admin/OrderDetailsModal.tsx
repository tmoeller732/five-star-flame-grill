
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, Calendar, Phone, Mail, User } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  totalPrice: number;
}

interface OrderWithCustomer {
  id: string;
  items: OrderItem[];
  total: number;
  grand_total: number;
  status: string;
  created_at: string;
  special_instructions?: string;
  customer_phone?: string;
  pickup_time?: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
}

interface OrderDetailsModalProps {
  order: OrderWithCustomer | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(0, 8)} - 5 Star Grill</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #000;
              background: #fff;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #000; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
            }
            .order-info { 
              margin-bottom: 20px; 
            }
            .customer-info { 
              margin-bottom: 20px; 
              border: 1px solid #ccc; 
              padding: 10px; 
            }
            .items { 
              margin-bottom: 20px; 
            }
            .item { 
              border-bottom: 1px solid #eee; 
              padding: 10px 0; 
            }
            .item:last-child { 
              border-bottom: none; 
            }
            .total { 
              border-top: 2px solid #000; 
              padding-top: 10px; 
              font-weight: bold; 
            }
            .customizations { 
              color: #666; 
              font-size: 12px; 
              margin-top: 5px; 
            }
            .instructions { 
              background: #f5f5f5; 
              padding: 10px; 
              margin-top: 20px; 
              border-left: 4px solid #ffd700; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>5 Star Grill</h1>
            <h2>Order Receipt</h2>
            <p>Order #${order.id.slice(0, 8)}</p>
            <p>${new Date(order.created_at).toLocaleString()}</p>
          </div>
          
          <div class="customer-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.profiles.first_name} ${order.profiles.last_name}</p>
            <p><strong>Email:</strong> ${order.profiles.email}</p>
            ${order.profiles.phone ? `<p><strong>Phone:</strong> ${order.profiles.phone}</p>` : ''}
            ${order.customer_phone ? `<p><strong>Order Phone:</strong> ${order.customer_phone}</p>` : ''}
            ${order.pickup_time ? `<p><strong>Pickup Time:</strong> ${new Date(order.pickup_time).toLocaleString()}</p>` : ''}
          </div>
          
          <div class="order-info">
            <h3>Order Status: ${order.status.toUpperCase()}</h3>
          </div>
          
          <div class="items">
            <h3>Order Items</h3>
            ${order.items.map(item => `
              <div class="item">
                <div style="display: flex; justify-content: space-between;">
                  <span><strong>${item.name}</strong> (Qty: ${item.quantity})</span>
                  <span>$${item.totalPrice.toFixed(2)}</span>
                </div>
                ${item.customizations && item.customizations.length > 0 ? 
                  `<div class="customizations">Customizations: ${item.customizations.join(', ')}</div>` : ''
                }
              </div>
            `).join('')}
          </div>
          
          <div class="total">
            <div style="display: flex; justify-content: space-between;">
              <span>Subtotal:</span>
              <span>$${order.total.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Tax:</span>
              <span>$${(order.grand_total - order.total).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px;">
              <span>Total:</span>
              <span>$${order.grand_total.toFixed(2)}</span>
            </div>
          </div>
          
          ${order.special_instructions ? `
            <div class="instructions">
              <h4>Special Instructions:</h4>
              <p>${order.special_instructions}</p>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px;">
            <p>Thank you for your order!</p>
            <p>5 Star Grill - Toms River, NJ</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-grill-gold text-xl">
            Order Details - #{order.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Order Information</h3>
              <div className="text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(order.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-600 text-white' :
                    order.status === 'ready' ? 'bg-blue-600 text-white' :
                    order.status === 'preparing' ? 'bg-yellow-600 text-black' :
                    order.status === 'confirmed' ? 'bg-orange-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                {order.pickup_time && (
                  <div className="mt-2">
                    <strong>Pickup Time:</strong> {new Date(order.pickup_time).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Customer Information</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{order.profiles.first_name} {order.profiles.last_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{order.profiles.email}</span>
                </div>
                {order.profiles.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{order.profiles.phone}</span>
                  </div>
                )}
                {order.customer_phone && order.customer_phone !== order.profiles.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Order Phone: {order.customer_phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-grill-gold">Customizations:</p>
                          <ul className="list-disc list-inside text-sm text-gray-300 ml-2">
                            {item.customizations.map((custom, idx) => (
                              <li key={idx}>{custom}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-grill-gold">${item.totalPrice.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-600" />

          {/* Special Instructions */}
          {order.special_instructions && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Special Instructions</h3>
              <div className="bg-yellow-900/20 border border-yellow-600 p-3 rounded-lg">
                <p className="text-yellow-200">{order.special_instructions}</p>
              </div>
            </div>
          )}

          {/* Order Totals */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax:</span>
                <span>${(order.grand_total - order.total).toFixed(2)}</span>
              </div>
              <Separator className="bg-gray-600" />
              <div className="flex justify-between text-lg font-semibold text-grill-gold">
                <span>Total:</span>
                <span>${order.grand_total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handlePrint}
              className="bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Order
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
