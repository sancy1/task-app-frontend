

// src/config/api.ts

import Constants from 'expo-constants';

export const apiConfig = {
  baseURL: Constants.expoConfig?.extra?.apiUrl as string,
};


