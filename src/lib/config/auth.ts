export const authConfig = {
  isEnabled: process.env.AUTH0_SECRET ? true : false,
  auth0: {
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  },
};
