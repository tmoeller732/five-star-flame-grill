
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Navigate } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

const Checkout = () => {
  const { state } = useCart();
  const { t } = useLanguage();

  // Redirect to menu if cart is empty
  if (state.items.length === 0) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="min-h-screen bg-grill-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-36 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-grill-gold mb-8 text-center">
            {t('checkout.title')}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <CheckoutForm />
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
};

export default Checkout;
