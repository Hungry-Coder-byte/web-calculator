import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Landing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await axios.get('/api'); // Example API call to check if the backend is running
      } catch (err) {
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Web Calculator</h1>
      <p className="text-lg mb-8">Perform basic arithmetic calculations with ease.</p>
      <Link to="/calculator" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go to Calculator
      </Link>
      <Link to="/history" className="mt-4 text-blue-500 hover:underline">
        View Calculation History
      </Link>
    </div>
  );
};

export default Landing;