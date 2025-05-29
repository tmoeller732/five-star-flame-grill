
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Order {
  id: string;
  items: any[];
  total: number;
  grand_total: number;
  status: string;
  created_at: string;
  special_instructions?: string;
}

const Account = () => {
  const { user, signOut, updateProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || user?.email || '',
        phone: data.phone || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { error } = await updateProfile({
        firstName: profile.first_name,
        lastName: profile.last_name,
        phone: profile.phone
      });

      if (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }

    setUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
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

  return (
    <>
      <Helmet>
        <title>My Account | 5 Star Grill</title>
        <meta name="description" content="Manage your account, view order history, and update your profile at 5 Star Grill." />
      </Helmet>
      
      <Header />
      
      <main className="pt-36 pb-16 min-h-screen bg-grill-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-grill-gold mb-8">My Account</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <Card className="p-6 bg-card border-gray-700">
                <h2 className="text-xl font-bold text-grill-gold mb-4">Profile Information</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.first_name}
                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.last_name}
                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                  >
                    {updating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
                
                <Separator className="my-6 bg-gray-600" />
                
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                >
                  Sign Out
                </Button>
              </Card>

              {/* Order History */}
              <Card className="p-6 bg-card border-gray-700">
                <h2 className="text-xl font-bold text-grill-gold mb-4">Order History</h2>
                
                {orders.length === 0 ? (
                  <p className="text-gray-400">No orders yet. Start by browsing our menu!</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-white">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-grill-gold">${order.grand_total.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.status === 'completed' ? 'bg-green-900 text-green-300' :
                              order.status === 'confirmed' ? 'bg-blue-900 text-blue-300' :
                              order.status === 'preparing' ? 'bg-yellow-900 text-yellow-300' :
                              order.status === 'ready' ? 'bg-purple-900 text-purple-300' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                        {order.special_instructions && (
                          <div className="text-sm text-gray-400 mt-1">
                            Note: {order.special_instructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Account;
