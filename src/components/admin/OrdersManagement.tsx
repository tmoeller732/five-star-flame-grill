
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, Filter, Eye, Printer } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';

interface OrderWithCustomer {
  id: string;
  items: any[];
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

const OrdersManagement = () => {
  const [orders, setOrders] = useState<OrderWithCustomer[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderWithCustomer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!inner(first_name, last_name, email, phone)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedOrders: OrderWithCustomer[] = (data || []).map((order) => ({
        id: order.id,
        items: Array.isArray(order.items) ? order.items : [],
        total: order.total,
        grand_total: order.grand_total,
        status: order.status || 'pending',
        created_at: order.created_at || '',
        special_instructions: order.special_instructions || undefined,
        profiles: order.profiles
      }));

      setOrders(convertedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const orderDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          orderDate.setDate(now.getDate());
          filtered = filtered.filter(order => 
            new Date(order.created_at).toDateString() === orderDate.toDateString()
          );
          break;
        case 'week':
          orderDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(order => 
            new Date(order.created_at) >= orderDate
          );
          break;
        case 'month':
          orderDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(order => 
            new Date(order.created_at) >= orderDate
          );
          break;
      }
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive"
      });
    }
  };

  const handleViewOrder = (order: OrderWithCustomer) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleQuickPrint = (order: OrderWithCustomer) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(0, 8)} - 5 Star Grill</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
            .section { margin-bottom: 15px; }
            .item { border-bottom: 1px solid #eee; padding: 5px 0; }
            .total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>5 Star Grill</h2>
            <p>Order #${order.id.slice(0, 8)} - ${new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div class="section">
            <strong>Customer:</strong> ${order.profiles.first_name} ${order.profiles.last_name}<br>
            <strong>Status:</strong> ${order.status.toUpperCase()}
          </div>
          <div class="section">
            ${order.items.map(item => `
              <div class="item">
                ${item.name} (${item.quantity}) - $${item.totalPrice.toFixed(2)}
                ${item.customizations && item.customizations.length > 0 ? `<br><small>+ ${item.customizations.join(', ')}</small>` : ''}
              </div>
            `).join('')}
          </div>
          <div class="total">
            Total: $${order.grand_total.toFixed(2)}
          </div>
          ${order.special_instructions ? `<div class="section"><strong>Instructions:</strong> ${order.special_instructions}</div>` : ''}
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    toast({
      title: "Order Printed",
      description: `Order #${order.id.slice(0, 8)} sent to printer.`,
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!inner(first_name, last_name, email, phone)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedOrders: OrderWithCustomer[] = (data || []).map((order) => ({
        id: order.id,
        items: Array.isArray(order.items) ? order.items : [],
        total: order.total,
        grand_total: order.grand_total,
        status: order.status || 'pending',
        created_at: order.created_at || '',
        special_instructions: order.special_instructions || undefined,
        customer_phone: order.customer_phone || undefined,
        pickup_time: order.pickup_time || undefined,
        profiles: order.profiles
      }));

      setOrders(convertedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center">Loading orders...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-400 flex items-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-grill-gold">Order ID</TableHead>
                <TableHead className="text-grill-gold">Customer</TableHead>
                <TableHead className="text-grill-gold">Items</TableHead>
                <TableHead className="text-grill-gold">Total</TableHead>
                <TableHead className="text-grill-gold">Status</TableHead>
                <TableHead className="text-grill-gold">Date</TableHead>
                <TableHead className="text-grill-gold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-gray-600">
                  <TableCell className="text-white font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <p className="font-medium">
                        {order.profiles.first_name} {order.profiles.last_name}
                      </p>
                      <p className="text-sm text-gray-400">{order.profiles.email}</p>
                      {order.profiles.phone && (
                        <p className="text-sm text-gray-400">{order.profiles.phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div className="text-sm">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      {order.special_instructions && (
                        <p className="text-xs text-gray-400 mt-1">
                          Note: {order.special_instructions}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-grill-gold font-semibold">
                    ${order.grand_total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => handleQuickPrint(order)}
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default OrdersManagement;
