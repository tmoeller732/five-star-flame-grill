
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// For debugging menu issues:
// Uncomment this line if you need to reset the menu cache
// localStorage.removeItem('menuItemsWithImages');

const root = document.getElementById("root")!;

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
