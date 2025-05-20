
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function render(url: string) {
  const queryClient = new QueryClient();
  const helmetContext = {};
  
  // Wrap the app with all necessary providers for SSR
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
