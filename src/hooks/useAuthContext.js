import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('auth', null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate('/dashboard');
  };

  const logout = async () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}