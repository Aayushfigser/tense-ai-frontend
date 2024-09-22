// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [auth, setAuth] = useState(null);

    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthProvider;
