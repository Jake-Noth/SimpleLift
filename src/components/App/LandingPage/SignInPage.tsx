import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabase } from '../../../../useSupaBaseContext'


export default function SignInPage() {

 const { supabase } = useSupabase()
  
 return (<Auth supabaseClient={supabase} providers = {[]} appearance={{ theme: ThemeSupa }} />)
  
  
}