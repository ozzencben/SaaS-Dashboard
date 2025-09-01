// context/auth/AuthProvider.jsx
import { useEffect, useState } from "react";
import { api } from "../../api/Api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // LOGIN
  const login = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", userData);
      const { user, token } = res.data; // ✅ backend'de 'user' var

      localStorage.setItem("accessToken", token);

      setUser(user);
      setAccessToken(token);
      return res.data;
    } catch (err) {
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", userData);
      const { user, token } = res.data; // ✅ backend'de 'user' var

      localStorage.setItem("accessToken", token);

      setUser(user);
      setAccessToken(token);
      return res.data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setAccessToken(null);
  };

  // AUTO LOGIN (token ile kullanıcıyı yükle)
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
          setUser(null);
          setAccessToken(null);
          setLoading(false);
          return;
        }

        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setAccessToken(token);
      } catch (err) {
        console.error("loadUser error:", err.response?.data || err.message);
        if (
          err.response?.status === 401 ||
          err.response?.status === 403 ||
          err.response?.status === 404
        ) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
