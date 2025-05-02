
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Contact 5 Star Grill in Toms River, NJ for reservations, inquiries, or feedback. Visit us at 1681 Lakewood Rd or call (856) 559-4938." />
        <meta name="keywords" content="restaurant contact, reservations, location, hours, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or want to make a reservation? Reach out to us!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-playfair text-grill-gold mb-4">Location & Hours</h2>
              
              <div className="mb-6">
                <h3 className="text-xl mb-2">Address</h3>
                <p className="text-gray-300">
                  1681 Lakewood Rd<br />
                  Toms River, NJ 08755
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl mb-2">Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div>Monday - Friday</div>
                  <div>7:00 AM - 10:00 PM</div>
                  <div>Saturday</div>
                  <div>8:00 AM - 11:00 PM</div>
                  <div>Sunday</div>
                  <div>8:00 AM - 9:00 PM</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl mb-2">Contact</h3>
                <p className="text-gray-300 mb-1">
                  Phone: <a href="tel:+18565594938" className="text-grill-gold hover:text-grill-orange transition-colors">(856) 559-4938</a>
                </p>
                <p className="text-gray-300">
                  Email: <a href="mailto:info@5stargrill.com" className="text-grill-gold hover:text-grill-orange transition-colors">info@5stargrill.com</a>
                </p>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-playfair text-grill-gold mb-4">Send Us a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-grill-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-grill-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-grill-gold"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-grill-gold hover:bg-grill-orange text-grill-black transition-colors rounded-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Google Maps embed */}
          <div className="mt-12 max-w-4xl mx-auto bg-card rounded-lg overflow-hidden">
            <div className="aspect-video w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.7206212291705!2d-74.19199592335172!3d40.16818287176042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c19a46e01109cd%3A0xe348cd15cea557f8!2s1681%20Lakewood%20Rd%2C%20Toms%20River%2C%20NJ%2008755%2C%20USA!5e0!3m2!1sen!2sus!4v1714645073798!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="5 Star Grill Location" 
                className="w-full h-full"
                aria-label="Google Maps showing the location of 5 Star Grill at 1681 Lakewood Rd, Toms River, NJ 08755"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
