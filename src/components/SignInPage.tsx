import {useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const S_URL = import.meta.env.VITE_SUPA_BASE_URL;
const S_ANON = import.meta.env.VITE_SUPA_BASE_ANON_KEY;

const supabase = createClient(S_URL, S_ANON)


export default function SignInPage({setSession}:any) {

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  
 return (<Auth supabaseClient={supabase} providers = {[]} appearance={{ theme: ThemeSupa }} />)
  
  
}