import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

const [token, setToken] = useState(() => {
  return localStorage.getItem("accessToken");
});

  const login = (userData, accessToken) => {
  setUser(userData);
  setToken(accessToken);

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  localStorage.setItem(
    "accessToken",
    accessToken
  );
};

 const logout = () => {
  setUser(null);
  setToken(null);

  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
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