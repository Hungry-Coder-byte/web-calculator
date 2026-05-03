import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

const calculationSchema = z.object({
  expression: z.string().nonempty(),
});

interface CalculationResult {
  result: number;
}

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      calculationSchema.parse({ expression });
      const response = await axios.post<CalculationResult>('/api/calculate', { expression });
      setResult(response.data.result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError('Invalid input. Please enter a valid expression.');
      } else if (axios.isAxiosError(err)) {
        setError('Failed to calculate. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Web Calculator</h1>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Enter expression (e.g., 2 + 2)"
      />
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white rounded p-2 mb-4"
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {result !== null && <p className="text-lg">Result: {result}</p>}
    </div>
  );
};

export default Calculator;