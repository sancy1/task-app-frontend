
// src/config/api.ts

import Constants from 'expo-constants';

export const apiConfig = {
  baseURL: Constants.expoConfig?.extra?.apiUrl as string,
};

export const API_BASE_URL = apiConfig.baseURL;