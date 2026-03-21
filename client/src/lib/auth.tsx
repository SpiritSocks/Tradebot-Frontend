import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
  getAccessToken: () => null,
  getRefreshToken: () => null,
  setTokens: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const isLoggedIn = !!accessToken;

  const login = useCallback((access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setAccessToken(access);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
  }, []);

  const getAccessToken = useCallback(() => {
    return localStorage.getItem("access_token");
  }, []);

  const getRefreshToken = useCallback(() => {
    return localStorage.getItem("refresh_token");
  }, []);

  const setTokens = useCallback((access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setAccessToken(access);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, login, logout, getAccessToken, getRefreshToken, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
