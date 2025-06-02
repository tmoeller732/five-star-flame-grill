
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.order': 'Order',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.signIn': 'Sign In',
    'nav.admin': 'Admin',
    
    // Account page
    'account.title': 'My Account',
    'account.profile': 'Profile Information',
    'account.firstName': 'First Name',
    'account.lastName': 'Last Name',
    'account.email': 'Email',
    'account.phone': 'Phone',
    'account.language': 'Preferred Language',
    'account.english': 'English',
    'account.spanish': 'Spanish',
    'account.updateProfile': 'Update Profile',
    'account.updating': 'Updating...',
    'account.signOut': 'Sign Out',
    'account.orderHistory': 'Order History',
    'account.noOrders': 'No orders yet. Start by browsing our menu!',
    'account.reorder': 'Reorder',
    'account.items': 'items',
    'account.item': 'item',
    
    // Checkout
    'checkout.title': 'Complete Your Order',
    'checkout.orderDetails': 'Order Details',
    'checkout.orderingAs': 'Ordering as:',
    'checkout.updateProfile': 'Update your profile information in your account settings if needed.',
    'checkout.specialInstructions': 'Special Instructions (Optional)',
    'checkout.specialInstructionsPlaceholder': 'Any special requests, dietary restrictions, or cooking preferences... (max 500 characters)',
    'checkout.characters': 'characters',
    'checkout.estimatedWaitTime': 'Estimated Wait Time',
    'checkout.minutes': 'minutes',
    'checkout.basedOnTotal': 'Based on your order total of',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.paymentDescription': 'Payment will be collected upon pickup. We accept cash and all major credit cards.',
    'checkout.placeOrder': 'Place Order',
    'checkout.processing': 'Processing Order...',
    
    // Order Summary
    'orderSummary.title': 'Order Summary',
    'orderSummary.qty': 'Qty:',
    'orderSummary.customizations': 'Customizations:',
    'orderSummary.subtotal': 'Subtotal:',
    'orderSummary.tax': 'Tax (6.625%):',
    'orderSummary.total': 'Total:',
    'orderSummary.pickupInfo': 'Pickup Information',
    'orderSummary.estimatedPickup': 'Estimated pickup time:',
    'orderSummary.pickupTime': '15-20 minutes',
    'orderSummary.callReady': 'We\'ll call you when your order is ready for pickup at our location.',
    
    // Common
    'common.loading': 'Loading...',
    'common.order': 'Order',
    'common.status': 'Status',
    'common.note': 'Note:',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.menu': 'Menú',
    'nav.order': 'Ordenar',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.cart': 'Carrito',
    'nav.account': 'Cuenta',
    'nav.signIn': 'Iniciar Sesión',
    'nav.admin': 'Admin',
    
    // Account page
    'account.title': 'Mi Cuenta',
    'account.profile': 'Información del Perfil',
    'account.firstName': 'Nombre',
    'account.lastName': 'Apellido',
    'account.email': 'Correo Electrónico',
    'account.phone': 'Teléfono',
    'account.language': 'Idioma Preferido',
    'account.english': 'Inglés',
    'account.spanish': 'Español',
    'account.updateProfile': 'Actualizar Perfil',
    'account.updating': 'Actualizando...',
    'account.signOut': 'Cerrar Sesión',
    'account.orderHistory': 'Historial de Pedidos',
    'account.noOrders': '¡Aún no tienes pedidos. Comienza explorando nuestro menú!',
    'account.reorder': 'Volver a Pedir',
    'account.items': 'artículos',
    'account.item': 'artículo',
    
    // Checkout
    'checkout.title': 'Completa tu Pedido',
    'checkout.orderDetails': 'Detalles del Pedido',
    'checkout.orderingAs': 'Ordenando como:',
    'checkout.updateProfile': 'Actualiza la información de tu perfil en la configuración de tu cuenta si es necesario.',
    'checkout.specialInstructions': 'Instrucciones Especiales (Opcional)',
    'checkout.specialInstructionsPlaceholder': 'Cualquier solicitud especial, restricciones dietéticas o preferencias de cocción... (máx. 500 caracteres)',
    'checkout.characters': 'caracteres',
    'checkout.estimatedWaitTime': 'Tiempo de Espera Estimado',
    'checkout.minutes': 'minutos',
    'checkout.basedOnTotal': 'Basado en tu total de pedido de',
    'checkout.paymentInfo': 'Información de Pago',
    'checkout.paymentDescription': 'El pago se cobrará al recoger. Aceptamos efectivo y todas las tarjetas de crédito principales.',
    'checkout.placeOrder': 'Realizar Pedido',
    'checkout.processing': 'Procesando Pedido...',
    
    // Order Summary
    'orderSummary.title': 'Resumen del Pedido',
    'orderSummary.qty': 'Cant:',
    'orderSummary.customizations': 'Personalizaciones:',
    'orderSummary.subtotal': 'Subtotal:',
    'orderSummary.tax': 'Impuesto (6.625%):',
    'orderSummary.total': 'Total:',
    'orderSummary.pickupInfo': 'Información de Recogida',
    'orderSummary.estimatedPickup': 'Tiempo estimado de recogida:',
    'orderSummary.pickupTime': '15-20 minutos',
    'orderSummary.callReady': 'Te llamaremos cuando tu pedido esté listo para recoger en nuestra ubicación.',
    
    // Common
    'common.loading': 'Cargando...',
    'common.order': 'Pedido',
    'common.status': 'Estado',
    'common.note': 'Nota:',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
