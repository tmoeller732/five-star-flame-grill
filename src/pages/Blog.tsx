
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Read the latest updates, recipes, and culinary insights from 5 Star Grill in Toms River, NJ." />
        <meta name="keywords" content="restaurant blog, food blog, recipes, culinary insights, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Blog</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our latest culinary insights, recipes, and restaurant updates.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <p className="text-center text-xl">
              Our blog is coming soon with exciting recipes and culinary insights!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Blog;
