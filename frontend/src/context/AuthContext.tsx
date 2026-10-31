import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Child, User } from '../types';

interface AuthContextType {
  user: User | null;
  children: Child[];
  activeChild: Child | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    fullName?: string;
    parentPin?: string;
    childName?: string;
    childAge?: number;
  }) => Promise<void>;
  logout: () => void;
  setActiveChild: (child: Child) => void;
  refreshUser: () => Promise<void>;
  verifyParentPin: (pin: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [activeChild, setActiveChildState] = useState<Child | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('milo_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setActiveChild = (child: Child) => {
    setActiveChildState(child);
    localStorage.setItem('milo_active_child_id', child.id);
  };

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      setUser(res.user);
      setChildrenList(res.children || []);

      const savedChildId = localStorage.getItem('milo_active_child_id');
      const found = res.children?.find((c) => c.id === savedChildId);
      if (found) {
        setActiveChildState(found);
      } else if (res.children && res.children.length > 0) {
        setActiveChildState(res.children[0]);
      }
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    localStorage.setItem('milo_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setChildrenList(res.children || []);
    if (res.children && res.children.length > 0) {
      setActiveChild(res.children[0]);
    }
  };

  const register = async (payload: {
    email: string;
    password: string;
    fullName?: string;
    parentPin?: string;
    childName?: string;
    childAge?: number;
  }) => {
    const res = await api.register(payload);
    localStorage.setItem('milo_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setChildrenList(res.children || []);
    if (res.children && res.children.length > 0) {
      setActiveChild(res.children[0]);
    }
  };

  const logout = () => {
    localStorage.removeItem('milo_token');
    localStorage.removeItem('milo_active_child_id');
    setToken(null);
    setUser(null);
    setChildrenList([]);
    setActiveChildState(null);
  };

  const verifyParentPin = async (pin: string): Promise<boolean> => {
    try {
      const res = await api.verifyPin(pin);
      return res.valid === true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        children: childrenList,
        activeChild,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        setActiveChild,
        refreshUser,
        verifyParentPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
