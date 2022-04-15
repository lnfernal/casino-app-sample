require("dotenv").config();

module.exports = () => {
  return {
    domain: process.env.DOMAIN,
    audience: process.env.AUDIENCE,
    m2mClientId: process.env.M2M_CLIENT_ID,
    m2mClientSecret: process.env.M2M_CLIENT_SECRET,
    allowedOrigins: (
      process.env.CORS_ALLOWED_ORIGIN_LIST || "http://localhost:3000"
    ).split(","),
  };
};
