import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CalculationHistory {
  id: string;
  expression: string;
  result: number;
  createdAt: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<CalculationHistory[]>('/api/history');
      setHistory(response.data);
    } catch (err) {
      setError('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete('/api/history');
      setHistory([]);
    } catch (err) {
      setError('Failed to clear history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Calculation History</h1>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item.id} className="p-4 border rounded shadow">
            <div>{item.expression} = {item.result}</div>
            <div className="text-gray-500 text-sm">{new Date(item.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleClearHistory}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear History
      </button>
    </div>
  );
};

export default History;