
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrders } from '../contexts/OrderContext';
import { Clock, CheckCircle, Package, Utensils } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { orders } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock className="text-yellow-500" size={20} />;
      case 'preparing':
        return <Utensils className="text-blue-500" size={20} />;
      case 'ready':
        return <Package className="text-green-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-grill-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-grill-gold mb-8 text-center">
            Order History
          </h1>

          {orders.length === 0 ? (
            <Card className="p-8 bg-card border-gray-700 text-center">
              <h2 className="text-xl font-semibold text-grill-gold mb-4">No Orders Yet</h2>
              <p className="text-gray-300 mb-6">
                You haven't placed any orders yet. Start by browsing our menu!
              </p>
              <Button asChild className="bg-grill-gold hover:bg-grill-orange text-grill-black">
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="p-6 bg-card border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-grill-gold">
                        Order #{order.id.split('_')[1]}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      {getStatusIcon(order.status)}
                      <span className="font-medium">{getStatusText(order.status)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-grill-gold mb-2">Items Ordered</h4>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.totalPrice.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-grill-gold mb-2">Order Info</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Customer:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                        <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                        <p><strong>Total:</strong> ${(order.total * 1.085).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="border-gray-600 text-white hover:bg-gray-800"
                    >
                      <Link to={`/order-tracking?id=${order.id}`}>Track This Order</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8 space-x-4">
            <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Link to="/order-tracking">Track New Order</Link>
            </Button>
            <Button asChild className="bg-grill-gold hover:bg-grill-orange text-grill-black">
              <Link to="/menu">Order Again</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
