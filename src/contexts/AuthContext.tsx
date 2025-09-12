

// // src/contexts/AuthContext.tsx

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import { User, RegisterData, LoginData } from '../types/auth';
// import { authAPI } from '../services/api';

// interface AuthContextType {
//   user: User | null;
//   accessToken: string | null;
//   isLoading: boolean;
//   login: (data: LoginData) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   logout: () => Promise<void>;
//   refreshToken: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadStoredAuth();
//   }, []);

//   const loadStoredAuth = async () => {
//     try {
//       const storedAccessToken = await SecureStore.getItemAsync('accessToken');
//       const storedUserString = await SecureStore.getItemAsync('user');

//       if (storedAccessToken && storedUserString) {
//         setAccessToken(storedAccessToken);
//         setUser(JSON.parse(storedUserString));
//       }
//     } catch (error) {
//       console.error('Error loading stored auth:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (data: LoginData) => {
//     try {
//       const rawResponse = await authAPI.login(data);

//       // ✅ unwrap .data
//       const response = rawResponse.data;

//       console.log('Login API Response:', rawResponse);
//       console.log('Unwrapped response:', response);

//       // Store tokens and user data - ALL AS STRINGS
//       await SecureStore.setItemAsync('accessToken', String(response.accessToken));
//       await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));
//       await SecureStore.setItemAsync('deviceId', String(response.deviceId || ''));
//       await SecureStore.setItemAsync('user', JSON.stringify(response.user));

//       setAccessToken(response.accessToken);
//       setUser(response.user);
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const register = async (data: RegisterData) => {
//     try {
//       const rawResponse = await authAPI.register(data);

//       // ✅ unwrap .data
//       const response = rawResponse.data;

//       console.log('Register API Response:', rawResponse);
//       console.log('Unwrapped response:', response);

//       await SecureStore.setItemAsync('accessToken', String(response.accessToken));
//       await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));
//       await SecureStore.setItemAsync('deviceId', String(response.deviceId || ''));
//       await SecureStore.setItemAsync('user', JSON.stringify(response.user));

//       setAccessToken(response.accessToken);
//       setUser(response.user);
//     } catch (error) {
//       console.error('Register error:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       if (accessToken) {
//         await authAPI.logout(accessToken);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       await SecureStore.deleteItemAsync('accessToken');
//       await SecureStore.deleteItemAsync('refreshToken');
//       await SecureStore.deleteItemAsync('deviceId');
//       await SecureStore.deleteItemAsync('user');

//       setAccessToken(null);
//       setUser(null);
//     }
//   };

//   const refreshToken = async () => {
//     try {
//       const refreshToken = await SecureStore.getItemAsync('refreshToken');
//       const deviceId = await SecureStore.getItemAsync('deviceId');

//       if (!refreshToken) {
//         throw new Error('No refresh token available');
//       }

//       const response = await authAPI.refreshToken(refreshToken, deviceId || '');

//       await SecureStore.setItemAsync('accessToken', String(response.accessToken));
//       await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));

//       setAccessToken(response.accessToken);
//     } catch (error) {
//       console.error('Refresh token error:', error);
//       await logout();
//       throw error;
//     }
//   };

//   const value: AuthContextType = {
//     user,
//     accessToken,
//     isLoading,
//     login,
//     register,
//     logout,
//     refreshToken,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };





















// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, RegisterData, LoginData } from '../types/auth';
import { authAPI } from '../services/api';
import { useRouter, type Href } from 'expo-router'; // ✅ added router

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // ✅ router hook here

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      const storedUserString = await SecureStore.getItemAsync('user');

      if (storedAccessToken && storedUserString) {
        setAccessToken(storedAccessToken);
        setUser(JSON.parse(storedUserString));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      const rawResponse = await authAPI.login(data);
      const response = rawResponse.data;

      console.log('Login API Response:', rawResponse);
      console.log('Unwrapped response:', response);

      await SecureStore.setItemAsync('accessToken', String(response.accessToken));
      await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));
      await SecureStore.setItemAsync('deviceId', String(response.deviceId || ''));
      await SecureStore.setItemAsync('user', JSON.stringify(response.user));

      setAccessToken(response.accessToken);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const rawResponse = await authAPI.register(data);
      const response = rawResponse.data;

      console.log('Register API Response:', rawResponse);
      console.log('Unwrapped response:', response);

      await SecureStore.setItemAsync('accessToken', String(response.accessToken));
      await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));
      await SecureStore.setItemAsync('deviceId', String(response.deviceId || ''));
      await SecureStore.setItemAsync('user', JSON.stringify(response.user));

      setAccessToken(response.accessToken);
      setUser(response.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await authAPI.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('deviceId');
      await SecureStore.deleteItemAsync('user');

      setAccessToken(null);
      setUser(null);

      // ✅ Redirect user to login screen
      router.replace('/auth/login' as Href);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      const deviceId = await SecureStore.getItemAsync('deviceId');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authAPI.refreshToken(refreshToken, deviceId || '');

      await SecureStore.setItemAsync('accessToken', String(response.accessToken));
      await SecureStore.setItemAsync('refreshToken', String(response.refreshToken));

      setAccessToken(response.accessToken);
    } catch (error) {
      console.error('Refresh token error:', error);
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
