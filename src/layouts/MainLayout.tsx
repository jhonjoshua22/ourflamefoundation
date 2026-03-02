import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust paths to your components
import Footer from './components/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* This is where the specific page content (Scoretable, Home, etc.) will render */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
