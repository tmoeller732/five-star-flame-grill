
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Search, User, Mail, Phone, Calendar } from 'lucide-react';

interface CustomerWithStats {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
}

const CustomersManagement = () => {
  const [customers, setCustomers] = useState<CustomerWithStats[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch order statistics for each customer
      const customersWithStats: CustomerWithStats[] = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('grand_total, created_at')
            .eq('user_id', profile.id);

          if (ordersError) {
            console.error('Error fetching orders for customer:', ordersError);
            return {
              ...profile,
              totalOrders: 0,
              totalSpent: 0
            };
          }

          const totalOrders = orders?.length || 0;
          const totalSpent = orders?.reduce((sum, order) => sum + order.grand_total, 0) || 0;
          const lastOrderDate = orders?.length > 0 
            ? orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].created_at
            : undefined;

          return {
            ...profile,
            totalOrders,
            totalSpent,
            lastOrderDate
          };
        })
      );

      setCustomers(customersWithStats);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch customer data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(customer =>
      customer.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCustomers(filtered);
  };

  if (loading) {
    return (
      <div className="text-white text-center">Loading customers...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-grill-gold">Customer Management</h3>
          <div className="text-sm text-gray-400">
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-grill-gold">{customers.length}</p>
            </div>
            <User className="w-8 h-8 text-grill-gold" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Customers</p>
              <p className="text-2xl font-bold text-grill-gold">
                {customers.filter(c => c.totalOrders > 0).length}
              </p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg. Orders per Customer</p>
              <p className="text-2xl font-bold text-grill-gold">
                {customers.length > 0 
                  ? (customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length).toFixed(1)
                  : '0'
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg. Customer Value</p>
              <p className="text-2xl font-bold text-grill-gold">
                ${customers.length > 0 
                  ? (customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2)
                  : '0.00'
                }
              </p>
            </div>
            <User className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="p-6 bg-card border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-grill-gold">Customer</TableHead>
                <TableHead className="text-grill-gold">Contact</TableHead>
                <TableHead className="text-grill-gold">Total Orders</TableHead>
                <TableHead className="text-grill-gold">Total Spent</TableHead>
                <TableHead className="text-grill-gold">Last Order</TableHead>
                <TableHead className="text-grill-gold">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-gray-600">
                  <TableCell className="text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-grill-gold rounded-full flex items-center justify-center">
                        <span className="text-grill-black font-semibold">
                          {customer.first_name?.charAt(0) || customer.email?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {customer.first_name || customer.last_name 
                            ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim()
                            : 'No name'
                          }
                        </p>
                        <p className="text-sm text-gray-400">ID: {customer.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-400">{customer.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      customer.totalOrders > 0 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {customer.totalOrders}
                    </span>
                  </TableCell>
                  <TableCell className="text-grill-gold font-semibold">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    {customer.lastOrderDate 
                      ? new Date(customer.lastOrderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : 'Never'
                    }
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    {new Date(customer.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CustomersManagement;
