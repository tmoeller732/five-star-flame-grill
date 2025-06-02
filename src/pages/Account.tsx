
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoyaltyPointsCard from '../components/loyalty/LoyaltyPointsCard';
import MobileBottomNav from '../components/MobileBottomNav';
import { Helmet } from 'react-helmet-async';
import { RotateCcw } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_language?: string;
}

type DatabaseOrder = Database['public']['Tables']['orders']['Row'];

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
  const { addItem } = useCart();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    preferred_language: language
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
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }

      if (data) {
        const profileData = {
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || user?.email || '',
          phone: data.phone || '',
          preferred_language: data.preferred_language || language
        };
        setProfile(profileData);
        
        // Set language from profile
        if (data.preferred_language && (data.preferred_language === 'en' || data.preferred_language === 'es')) {
          setLanguage(data.preferred_language as 'en' | 'es');
        }
      } else {
        setProfile({
          first_name: user?.user_metadata?.first_name || '',
          last_name: user?.user_metadata?.last_name || '',
          email: user?.email || '',
          phone: user?.user_metadata?.phone || '',
          preferred_language: language
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({
        first_name: user?.user_metadata?.first_name || '',
        last_name: user?.user_metadata?.last_name || '',
        email: user?.email || '',
        phone: user?.user_metadata?.phone || '',
        preferred_language: language
      });
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
      
      const convertedOrders: Order[] = (data || []).map((dbOrder: DatabaseOrder) => ({
        id: dbOrder.id,
        items: Array.isArray(dbOrder.items) ? dbOrder.items : [],
        total: dbOrder.total,
        grand_total: dbOrder.grand_total,
        status: dbOrder.status || 'pending',
        created_at: dbOrder.created_at || '',
        special_instructions: dbOrder.special_instructions || undefined
      }));
      
      setOrders(convertedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleReorder = async (order: Order) => {
    try {
      order.items.forEach((item: any) => {
        const cartItem = {
          menuItemId: item.menuItemId || item.id,
          name: item.name,
          description: item.description || '',
          basePrice: item.basePrice || item.price || 0,
          quantity: item.quantity || 1,
          customizations: item.customizations || [],
          category: item.category || 'lunch' as const
        };
        
        addItem(cartItem);
      });

      toast({
        title: "Items Added to Cart",
        description: `${order.items.length} item(s) from order #${order.id.slice(0, 8)} have been added to your cart.`,
      });
    } catch (error) {
      console.error('Error reordering:', error);
      toast({
        title: "Reorder Failed",
        description: "There was an error adding items to your cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Update language preference in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          phone: profile.phone,
          preferred_language: profile.preferred_language
        });

      if (profileError) {
        console.error('Error updating profile in Supabase:', profileError);
      }

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
        // Update language
        if (profile.preferred_language) {
          setLanguage(profile.preferred_language as 'en' | 'es');
        }
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        await fetchProfile();
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
        <div className="text-white">{t('common.loading')}</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{t('account.title')} | 5 Star Grill</title>
        <meta name="description" content="Manage your account, view order history, and track your loyalty points at 5 Star Grill." />
      </Helmet>
      
      <Header />
      
      <main className="pt-36 pb-24 min-h-screen bg-grill-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-grill-gold mb-8">{t('account.title')}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <Card className="p-6 bg-card border-gray-700">
                <h2 className="text-xl font-bold text-grill-gold mb-4">{t('account.profile')}</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">{t('account.firstName')}</Label>
                      <Input
                        id="firstName"
                        value={profile.first_name}
                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">{t('account.lastName')}</Label>
                      <Input
                        id="lastName"
                        value={profile.last_name}
                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">{t('account.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-700 border-gray-600 text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">{t('account.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-white">{t('account.language')}</Label>
                    <Select
                      value={profile.preferred_language}
                      onValueChange={(value) => setProfile({ ...profile, preferred_language: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t('account.english')}</SelectItem>
                        <SelectItem value="es">{t('account.spanish')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={updating}
                    className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                  >
                    {updating ? t('account.updating') : t('account.updateProfile')}
                  </Button>
                </form>
                
                <Separator className="my-6 bg-gray-600" />
                
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                >
                  {t('account.signOut')}
                </Button>
              </Card>

              {/* Loyalty Points */}
              <LoyaltyPointsCard />

              {/* Order History */}
              <Card className="p-6 bg-card border-gray-700">
                <h2 className="text-xl font-bold text-grill-gold mb-4">{t('account.orderHistory')}</h2>
                
                {orders.length === 0 ? (
                  <p className="text-gray-400">{t('account.noOrders')}</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-white">{t('common.order')} #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.created_at).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
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
                        
                        {/* Display ordered items */}
                        <div className="mb-3">
                          <div className="text-sm text-gray-300 space-y-1">
                            {order.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between">
                                <span>{item.quantity}x {item.name}</span>
                                <span>${(item.totalPrice || item.price || 0).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-400 mb-3">
                          {order.items.length} {order.items.length !== 1 ? t('account.items') : t('account.item')}
                        </div>
                        {order.special_instructions && (
                          <div className="text-sm text-gray-400 mb-3">
                            {t('common.note')} {order.special_instructions}
                          </div>
                        )}
                        <Button
                          onClick={() => handleReorder(order)}
                          variant="outline"
                          size="sm"
                          className="w-full border-grill-gold text-grill-gold hover:bg-grill-gold hover:text-grill-black"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {t('account.reorder')}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <MobileBottomNav />
      <Footer />
    </>
  );
};

export default Account;
