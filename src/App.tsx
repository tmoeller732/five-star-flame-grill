
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/admin/AdminRoute";
import WelcomeBackModal from "./components/WelcomeBackModal";
import MobileBottomNav from "./components/MobileBottomNav";
import { useWelcomeBack } from "./hooks/useWelcomeBack";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Create a client for React Query
const queryClient = new QueryClient();

const AppContent = () => {
  const { showWelcomeModal, closeWelcomeModal } = useWelcomeBack();

  return (
    <>
      <ScrollToTop />
      <Toaster />
      <Sonner />
      <WelcomeBackModal 
        isOpen={showWelcomeModal} 
        onClose={closeWelcomeModal}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/order-confirmation" element={
          <ProtectedRoute>
            <OrderConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileBottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
            <TooltipProvider>
              <AppContent />
            </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
