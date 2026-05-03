import create from 'zustand';
import axios from 'axios';

interface AuthState {
  user: null | { id: string; email: string };
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      set({ user: response.data.user, isLoading: false });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Login failed' });
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
  },
}));

export default useAuthStore;