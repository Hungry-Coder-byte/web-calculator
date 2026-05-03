import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

const Calculator = lazy(() => import('./pages/Calculator'));
const History = lazy(() => import('./pages/History'));
const Landing = lazy(() => import('./pages/Landing'));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;