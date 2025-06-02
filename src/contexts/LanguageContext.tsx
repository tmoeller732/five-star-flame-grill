
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
    
    // Hero Section
    'hero.title': 'Best New Grill in Toms River, NJ',
    'hero.subtitle': 'Serving the finest American classics, Spanish delights, and fresh salads since 2025',
    'hero.orderPickup': 'Order Pickup',
    'hero.orderDelivery': 'Order Delivery',
    'hero.openDaily': 'Open 7 Days a Week | Daily Specials',
    
    // Menu Page
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Savor the finest flavors prepared on our signature grill. From hearty breakfasts to authentic Mexican cuisine, each dish is crafted with premium ingredients and expert technique.',
    'menu.breakfast': 'Breakfast',
    'menu.lunch': 'Lunch/Dinner',
    'menu.bowls': 'Bowls & Salads',
    'menu.breakfastMenu': 'Breakfast Menu',
    'menu.lunchMenu': 'Lunch/Dinner Menu',
    'menu.bowlsMenu': 'Bowls & Salads',
    'menu.addToOrder': 'Add to Order',
    'menu.mostPopular': 'Most Popular Items',
    
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
    
    // Order dropdown
    'order.title': 'Choose how to order',
    'order.pickup': 'Order Pickup',
    'order.grubhub': 'Order on GrubHub',
    'order.doordash': 'Order on DoorDash',
    
    // CTA Section
    'cta.title': 'Quality Food at Affordable Prices',
    'cta.subtitle': 'Whether you\'re joining us for breakfast, lunch, or dinner, we\'re ready to serve you delicious meals made from high-quality ingredients. Open seven days a week for dine-in, pick-up or delivery.',
    'cta.orderNow': 'Order Now',
    'cta.callNow': '(856) 559-4938',
    
    // Order Partners
    'orderPartners.title': 'Affordable Quality, Easy Access',
    'orderPartners.subtitle': 'Open seven days a week with easy options for both pick-up and delivery. Enjoy our quality meals at reasonable prices, delivered right to your door.',
    
    // Footer
    'footer.about': 'Serving delicious breakfast, lunch, and dinner in Toms River since 2025. Our passion is grilling to perfection.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactUs': 'Contact Us',
    'footer.hours': 'Hours',
    'footer.hoursText': 'Everyday: 6:00 AM - 5:00 PM',
    'footer.copyright': 'All rights reserved.',
    'footer.designedBy': 'Custom Site Designed By:',
    
    // Scrolling Banner
    'banner.call': 'Call (856) 559-4938 to order direct',
    'banner.loyalty': 'Earn 1 point per $1 spent • Get $10 off every 100 points',
    'banner.join': 'Join our loyalty program and save on every order',
    
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
    
    // Hero Section
    'hero.title': 'El Mejor Nuevo Grill en Toms River, NJ',
    'hero.subtitle': 'Sirviendo los mejores clásicos americanos, delicias españolas y ensaladas frescas desde 2025',
    'hero.orderPickup': 'Ordenar para Recoger',
    'hero.orderDelivery': 'Ordenar para Entrega',
    'hero.openDaily': 'Abierto 7 Días a la Semana | Especiales Diarios',
    
    // Menu Page
    'menu.title': 'Nuestro Menú',
    'menu.subtitle': 'Saborea los mejores sabores preparados en nuestra parrilla especial. Desde desayunos abundantes hasta auténtica cocina mexicana, cada plato está elaborado con ingredientes premium y técnica experta.',
    'menu.breakfast': 'Desayuno',
    'menu.lunch': 'Almuerzo/Cena',
    'menu.bowls': 'Bowls y Ensaladas',
    'menu.breakfastMenu': 'Menú de Desayuno',
    'menu.lunchMenu': 'Menú de Almuerzo/Cena',
    'menu.bowlsMenu': 'Bowls y Ensaladas',
    'menu.addToOrder': 'Agregar al Pedido',
    'menu.mostPopular': 'Artículos Más Populares',
    
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
    
    // Order dropdown
    'order.title': 'Elige cómo ordenar',
    'order.pickup': 'Ordenar para Recoger',
    'order.grubhub': 'Ordenar en GrubHub',
    'order.doordash': 'Ordenar en DoorDash',
    
    // CTA Section
    'cta.title': 'Comida de Calidad a Precios Accesibles',
    'cta.subtitle': 'Ya sea que nos acompañes para el desayuno, almuerzo o cena, estamos listos para servirte comidas deliciosas hechas con ingredientes de alta calidad. Abierto siete días a la semana para comer en el lugar, recoger o entrega.',
    'cta.orderNow': 'Ordenar Ahora',
    'cta.callNow': '(856) 559-4938',
    
    // Order Partners
    'orderPartners.title': 'Calidad Accesible, Fácil Acceso',
    'orderPartners.subtitle': 'Abierto siete días a la semana con opciones fáciles tanto para recoger como para entrega. Disfruta nuestras comidas de calidad a precios razonables, entregadas directamente a tu puerta.',
    
    // Footer
    'footer.about': 'Sirviendo delicioso desayuno, almuerzo y cena en Toms River desde 2025. Nuestra pasión es cocinar a la parrilla a la perfección.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactUs': 'Contáctanos',
    'footer.hours': 'Horarios',
    'footer.hoursText': 'Todos los días: 6:00 AM - 5:00 PM',
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.designedBy': 'Sitio Personalizado Diseñado Por:',
    
    // Scrolling Banner
    'banner.call': 'Llama al (856) 559-4938 para ordenar directamente',
    'banner.loyalty': 'Gana 1 punto por cada $1 gastado • Obtén $10 de descuento cada 100 puntos',
    'banner.join': 'Únete a nuestro programa de lealtad y ahorra en cada pedido',
    
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
