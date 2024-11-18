import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SupabaseProvider } from './CustomHooks/useSupaBaseContext.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </React.StrictMode>
)
