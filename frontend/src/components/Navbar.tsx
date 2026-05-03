import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Web Calculator</h1>
        <div>
          <Link to="/" className="text-white hover:text-gray-300 mx-2">Home</Link>
          <Link to="/calculator" className="text-white hover:text-gray-300 mx-2">Calculator</Link>
          <Link to="/history" className="text-white hover:text-gray-300 mx-2">History</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;