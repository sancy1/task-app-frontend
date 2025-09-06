
// app.config.js

import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: process.env.API_URL, // <-- this reads your .env
    },
  };
};
