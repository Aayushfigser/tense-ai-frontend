// src/contexts/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
