export function getConfig() {
  return {
    domain: process.env.REACT_APP_DOMAIN,
    clientId: process.env.REACT_APP_CLIENT_ID,
    audience: process.env.REACT_APP_AUDIENCE,
    kycMessage: process.env.REACT_APP_KYC_MESSAGE,
    apiOrigin: process.env.REACT_APP_API_ORIGIN || "http://localhost:8080",

    nyCasino: {
      link: process.env.REACT_APP_NY_CASINO_LINK,
      clientId: process.env.REACT_APP_NY_CASINO_CLIENT_ID,
    },

    alCasino: {
      link: process.env.REACT_APP_AL_CASINO_LINK,
      clientId: process.env.REACT_APP_AL_CASINO_CLIENT_ID,
    },

    coCasino: {
      link: process.env.REACT_APP_CO_CASINO_LINK,
      clientId: process.env.REACT_APP_CO_CASINO_CLIENT_ID,
    },

  };
}
