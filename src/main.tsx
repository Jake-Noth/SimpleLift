import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'
import { SupabaseProvider } from '../useSupaBaseContext.tsx'


createRoot(document.getElementById('root')!).render(
  
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  
)
