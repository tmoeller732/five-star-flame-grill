
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Add safeguard to detect deployment environment and handle accordingly
const isProduction = window.location.hostname !== 'localhost';
if (isProduction) {
  // Get cached version from localStorage
  const cachedVersion = localStorage.getItem('siteVersion');
  const currentVersion = '1.0.8'; // Increment this to trigger a cache clear when deploying updates
  
  // If version changed or first visit, clear cache
  if (cachedVersion !== currentVersion) {
    console.log('New version detected, updating cache');
    // Don't clear menuItemsWithImages anymore since we want consistent images
    // Only update version number
    localStorage.setItem('siteVersion', currentVersion);
  }
}

const root = document.getElementById("root")!;

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
