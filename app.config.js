
// app.config.js

// Configuration file for Expo app - handles environment variables

import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL, // <-- I use this to inject my backend API URL from environment variables
    },
  };
};