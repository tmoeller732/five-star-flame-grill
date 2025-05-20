
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root")!;
const queryClient = new QueryClient();

const app = (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

// Use hydration for SSR in production
if (import.meta.env.PROD && root.innerHTML.trim().length) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
