
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string; phone: string }) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (data: { firstName?: string; lastName?: string; phone?: string }) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // If user just signed in and doesn't have a profile, create one
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();
            
            if (!profile) {
              console.log('Creating missing profile for user:', session.user.id);
              await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  first_name: session.user.user_metadata?.first_name || '',
                  last_name: session.user.user_metadata?.last_name || '',
                  email: session.user.email || '',
                  phone: session.user.user_metadata?.phone || ''
                });
            }
          }, 0);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { firstName: string; lastName: string; phone: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
          }
        }
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updateData: { firstName?: string; lastName?: string; phone?: string }) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // First, try to update the existing profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: updateData.firstName,
          last_name: updateData.lastName,
          phone: updateData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      // If profile doesn't exist, create it
      if (profileError && profileError.code === 'PGRST116') {
        console.log('Profile not found, creating new one');
        const { data: newProfileData, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: updateData.firstName,
            last_name: updateData.lastName,
            email: user.email,
            phone: updateData.phone,
          })
          .select()
          .single();
        
        if (createError) {
          console.error('Profile creation error:', createError);
          return { data: null, error: createError };
        }
        
        // Update auth metadata
        await supabase.auth.updateUser({
          data: {
            first_name: updateData.firstName,
            last_name: updateData.lastName,
            phone: updateData.phone,
          }
        });
        
        return { data: newProfileData, error: null };
      }

      if (profileError) {
        console.error('Profile update error:', profileError);
        return { data: null, error: profileError };
      }

      // Also update the auth user metadata to keep it in sync
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: {
          first_name: updateData.firstName,
          last_name: updateData.lastName,
          phone: updateData.phone,
        }
      });

      if (authError) {
        console.error('Auth metadata update error:', authError);
        return { data: profileData, error: authError };
      }

      return { data: profileData, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
