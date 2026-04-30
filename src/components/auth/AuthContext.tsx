"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { addToast } = useToast();

    // Persist login state
    useEffect(() => {
        const savedState = localStorage.getItem('katsuanime_isLoggedIn');
        if (savedState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('katsuanime_isLoggedIn', 'true');
        addToast('Başarıyla giriş yapıldı.', 'success');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('katsuanime_isLoggedIn');
        addToast('Çıkış yapıldı.', 'info');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
