import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

const S_URL = import.meta.env.VITE_SUPA_BASE_URL as string;
const S_ANON = import.meta.env.VITE_SUPA_BASE_ANON_KEY as string;

const supabase = createClient(S_URL, S_ANON);

interface SupabaseContextProps {
  supabase: SupabaseClient;
  session: Session | null;
}

const SupabaseContext = createContext<SupabaseContextProps | null>(null);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseContextProps => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
