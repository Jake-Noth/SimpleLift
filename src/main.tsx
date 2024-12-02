import { createRoot } from 'react-dom/client'
import App from './components/App/App.tsx'
import { SupabaseProvider } from '../useSupaBaseContext.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </React.StrictMode>
)
