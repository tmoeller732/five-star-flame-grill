
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrders } from '../contexts/OrderContext';
import { Clock, CheckCircle, Package, Utensils } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const { getOrderById } = useOrders();

  const handleSearch = () => {
    const order = getOrderById(orderId.trim());
    if (order) {
      setSearchedOrder(order);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="text-yellow-500" size={24} />;
      case 'preparing':
        return <Utensils className="text-blue-500" size={24} />;
      case 'ready':
        return <Package className="text-green-500" size={24} />;
      case 'completed':
        return <CheckCircle className="text-green-600" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Ready for Pickup';
      case 'completed':
        return 'Order Completed';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="min-h-screen bg-grill-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-grill-gold mb-8 text-center">
            Track Your Order
          </h1>

          <Card className="p-6 bg-card border-gray-700 mb-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="orderId" className="text-white">
                  Enter Your Order ID
                </Label>
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="ORDER_1234567890"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
              >
                Track Order
              </Button>
            </div>
          </Card>

          {notFound && (
            <Card className="p-6 bg-red-900/20 border-red-600 text-center">
              <p className="text-red-400">
                Order not found. Please check your order ID and try again.
              </p>
            </Card>
          )}

          {searchedOrder && (
            <Card className="p-6 bg-card border-gray-700">
              <div className="space-y-6">
                <div className="text-center">
                  {getStatusIcon(searchedOrder.status)}
                  <h2 className="text-2xl font-bold text-grill-gold mt-2">
                    {getStatusText(searchedOrder.status)}
                  </h2>
                  <p className="text-gray-300 mt-1">
                    Order ID: {searchedOrder.id}
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-semibold text-grill-gold mb-2">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Customer:</strong> {searchedOrder.customerInfo.firstName} {searchedOrder.customerInfo.lastName}</p>
                    <p><strong>Phone:</strong> {searchedOrder.customerInfo.phone}</p>
                    <p><strong>Order Date:</strong> {new Date(searchedOrder.orderDate).toLocaleString()}</p>
                    <p><strong>Estimated Pickup:</strong> {searchedOrder.estimatedPickupTime}</p>
                    <p><strong>Total:</strong> ${(searchedOrder.total * 1.085).toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h3 className="font-semibold text-grill-gold mb-2">Items Ordered</h3>
                  <div className="space-y-2">
                    {searchedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${item.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {searchedOrder.status === 'ready' && (
                  <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-green-400 mb-2">Ready for Pickup!</h3>
                    <p className="text-green-200 text-sm">
                      Your order is ready. Please come to our location to pick it up.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Link to="/order-history">View Order History</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
