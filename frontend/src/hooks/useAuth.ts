import { useState } from 'react';
import axios from 'axios';

interface AuthResponse {
  token: string;
}

interface UseAuth {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const useAuth = (): UseAuth => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<AuthResponse>('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
  };

  return { login, logout, loading, error };
};

export default useAuth;