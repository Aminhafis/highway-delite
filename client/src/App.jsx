import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Helmet } from 'react-helmet';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Helmet>
        <title>BookIt – HD Booking</title>
        <meta name="description" content="Beautiful, modern booking experience inspired by Figma. Fully responsive and SEO-optimized." />
      </Helmet>
      <Navbar />
      <main className="flex-1 px-2 md:px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
