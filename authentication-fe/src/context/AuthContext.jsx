import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const login = (userData, accessToken) => {
    setUser(userData);

    setToken(accessToken);

    localStorage.setItem(
      "accessToken",
      accessToken
    );
  };

  const logout = () => {
    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "accessToken"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export {
  AuthProvider,
  useAuth,
};