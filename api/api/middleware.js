const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const getConfig = require("../config");
const auth0Service = require("../services/auth0service");
const { domain, audience } = getConfig();

/**
 * Verifies the JWT signature
 */
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});

/**
 * Check if the user has completed the KYC if required by the client.
 * @param req 
 * @param res 
 * @param next 
 */
const checkKyc = async (req, res, next) => {
  const clientId = req.params.clientId;
  const kycDoneClaimKey = `https://yusasaki-casino/${clientId}/kycdone`;
  if (!kycDoneClaimKey) {
    return res.status(400).send(`Cannot find a client: ${clientId}`);
  }

  const isKycDone = req.user[kycDoneClaimKey] === true;
  const isKycRequired = await auth0Service.isKycRequired(clientId);

  if (isKycRequired && !isKycDone) {
    return res
      .status(401)
      .send({ message: "You must complete KYC before calling the API!" });
  }

  next();
};

/**
 * Check if the user has a required permission (scope) to invoke the API.
 * @param requiredScope 
 */
const checkRequiredScope = (requiredScope) => (req, res, next) => {
  const scopes = req.user.scope;

  if (!scopes.includes(requiredScope)) {
    return res.status(403).send(`Forbidden - Insufficient scope`);
  }

  next();
};

module.exports = {
  checkJwt,
  checkKyc,
  checkRequiredScope,
};
