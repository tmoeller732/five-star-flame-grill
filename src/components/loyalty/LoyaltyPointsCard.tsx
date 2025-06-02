
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Star, Gift } from 'lucide-react';

interface LoyaltyData {
  current_balance: number;
  points_earned: number;
  points_redeemed: number;
}

interface Coupon {
  id: string;
  coupon_code: string;
  discount_amount: number;
  is_used: boolean;
  expires_at: string;
}

const LoyaltyPointsCard: React.FC = () => {
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
      fetchCoupons();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching loyalty data:', error);
        return;
      }

      setLoyaltyData(data || { current_balance: 0, points_earned: 0, points_redeemed: 0 });
    } catch (error) {
      console.error('Error fetching loyalty data:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('user_coupons')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card border-gray-700">
        <div className="text-white">Loading loyalty information...</div>
      </Card>
    );
  }

  const pointsToNextReward = loyaltyData ? 100 - (loyaltyData.current_balance % 100) : 100;
  const progressPercentage = loyaltyData ? ((loyaltyData.current_balance % 100) / 100) * 100 : 0;

  return (
    <Card className="p-6 bg-card border-gray-700">
      <h2 className="text-xl font-bold text-grill-gold mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2" />
        Loyalty Rewards
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Current Points</span>
            <span className="text-2xl font-bold text-grill-gold">
              {loyaltyData?.current_balance || 0}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress to next $10 reward</span>
              <span>{pointsToNextReward} points to go</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-grill-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-lg font-bold text-grill-gold">
              {loyaltyData?.points_earned || 0}
            </div>
            <div className="text-sm text-gray-400">Total Earned</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-lg font-bold text-grill-gold">
              {loyaltyData?.points_redeemed || 0}
            </div>
            <div className="text-sm text-gray-400">Points Used</div>
          </div>
        </div>

        {coupons.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Available Coupons
            </h3>
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-gray-800 p-3 rounded-lg border border-grill-gold">
                <div className="flex justify-between items-center">
                  <div>
                    <Badge className="bg-grill-gold text-grill-black">
                      ${coupon.discount_amount} OFF
                    </Badge>
                    <p className="text-white text-sm mt-1">
                      Code: <span className="font-mono">{coupon.coupon_code}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Expires: {new Date(coupon.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-800 p-4 rounded-lg border border-grill-gold/30">
          <h4 className="text-grill-gold font-medium mb-2">How it works:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Earn 1 point for every $1 spent</li>
            <li>• Get a $10 coupon for every 100 points</li>
            <li>• Coupons expire after 6 months</li>
            <li>• Only members earn loyalty points</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default LoyaltyPointsCard;
