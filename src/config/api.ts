

// // src/config/api.ts

// // API configuration - retrieves the API URL from Expo constants

// import Constants from 'expo-constants';

// export const apiConfig = {
//   baseURL: Constants.expoConfig?.extra?.apiUrl as string, // I get my backend URL from the app config
// };





// src/config/api.ts

import Constants from 'expo-constants';

export const apiConfig = {
  baseURL: Constants.expoConfig?.extra?.apiUrl as string,
};

export const API_BASE_URL = apiConfig.baseURL;