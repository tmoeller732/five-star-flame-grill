
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Order = () => {
  return (
    <>
      <Helmet>
        <title>Online Ordering | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Order online from 5 Star Grill in Toms River, NJ. Enjoy our delicious breakfast, lunch, and dinner options with easy pickup or delivery." />
        <meta name="keywords" content="online ordering, food delivery, pickup, restaurant, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Online Ordering</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Order your favorite 5 Star Grill dishes for pickup or delivery. 
              Ordering is quick, easy, and secure.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <p className="text-center text-xl mb-8">
              Our online ordering system is coming soon!
            </p>
            
            <div className="text-center">
              <p className="mb-4">For now, please call us to place your order:</p>
              <a href="tel:+18565594938" className="text-2xl font-medium text-grill-gold hover:text-grill-orange transition-colors">
                (856) 559-4938
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Order;
