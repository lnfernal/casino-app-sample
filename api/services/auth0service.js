const Auth0 = require("auth0");
const getConfig = require("../config");
const { domain, m2mClientId, m2mClientSecret } = getConfig();

const auth0Client = new Auth0.ManagementClient({
  domain,
  clientId: m2mClientId,
  clientSecret: m2mClientSecret,
  scope: "read:clients update:clients",
});

const KEYS = {
  KYC_REQUIRED: "KYC_REQUIRED",
  TITLE: "TITLE",
  NAV_BG_COLOR: "NAV_BG_COLOR",
};

const isTruthy = (val) => val === true || val === "true";

const getClientInfo = async (clientId) => {
  const data = await auth0Client.getClient({ client_id: clientId });
  return {
    clientId: clientId,
    isKycRequired: data.client_metadata[KEYS.KYC_REQUIRED],
    title: data.client_metadata[KEYS.TITLE],
    navBgColor: data.client_metadata[KEYS.NAV_BG_COLOR]
  }
};

/**
 * Gets the KYC Requirement Flag for the specified client
 * @param {ClientID} clientId
 * @returns client_metadata
 */
const getKycRequirement = async (clientId) => {
  const data = await auth0Client.getClient({ client_id: clientId });
  return data.client_metadata;
};

/**
 * Returns the KYC Requirement Flag for the specified client
 * @param {ClientID} clientId
 * @returns client_metadata
 */
const isKycRequired = async (clientId) => {
  const data = await auth0Client.getClient({ client_id: clientId });
  return isTruthy(data.client_metadata[KEYS.KYC_REQUIRED]);
};

/**
 * Updates the KYC Requirement Flag for the specified client
 * @param {ClientID} clientId
 * @returns client_metadata
 */
const updateKycRequirement = async (clientId, enabled) => {
  const result = await auth0Client.updateClient(
    { client_id: clientId },
    { client_metadata: { [KEYS.KYC_REQUIRED]: enabled } }
  );
  return result.client_metadata;
};

module.exports = {
  getClientInfo,
  getKycRequirement,
  isKycRequired,
  updateKycRequirement,
};
