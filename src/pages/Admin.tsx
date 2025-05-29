
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import OrdersManagement from '../components/admin/OrdersManagement';
import CustomersManagement from '../components/admin/CustomersManagement';
import DashboardOverview from '../components/admin/DashboardOverview';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-grill-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-grill-black">
        <Header />
        <main className="pt-36 pb-16 min-h-screen bg-grill-black">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
              <p className="text-white">You don't have permission to access the admin panel.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | 5 Star Grill</title>
        <meta name="description" content="Admin panel for managing orders and customers at 5 Star Grill." />
      </Helmet>
      
      <Header />
      
      <main className="pt-36 pb-16 min-h-screen bg-grill-black">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-grill-gold mb-8">Admin Panel</h1>
            
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-600">
                <TabsTrigger 
                  value="dashboard" 
                  className="text-white data-[state=active]:bg-grill-gold data-[state=active]:text-grill-black"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="text-white data-[state=active]:bg-grill-gold data-[state=active]:text-grill-black"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="customers" 
                  className="text-white data-[state=active]:bg-grill-gold data-[state=active]:text-grill-black"
                >
                  Customers
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <DashboardOverview />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <OrdersManagement />
              </TabsContent>
              
              <TabsContent value="customers" className="mt-6">
                <CustomersManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Admin;
