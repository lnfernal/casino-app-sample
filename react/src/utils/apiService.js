import { getConfig } from "../config";

const { apiOrigin, clientId, nyCasino, alCasino, coCasino } = getConfig();

const isTruthy = (val) => val === true || val === "true";

const getClientInfo = async (targetClientId) => {
  const response = await fetch(`${apiOrigin}/api/public/${targetClientId}`);
  const responseData = await response.json();
  return responseData;
};

const getCasinoData = async () => {
  const response = await Promise.all([
    getClientInfo(nyCasino.clientId),
    getClientInfo(alCasino.clientId),
    getClientInfo(coCasino.clientId),
  ]);
  const responseData = response.map((a) => ({ ...a.message }));
  return responseData;
};

const getDiscountCoupon = async (token) => {
  const response = await fetch(`${apiOrigin}/api/user/${clientId}/coupon`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseData = await response.json();
  return responseData;
};

const getKycRequirement = async (token) => {
  const response = await fetch(`${apiOrigin}/api/admin/${clientId}/kyc`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseData = await response.json();
  const isKycRequired = isTruthy(responseData.message["KYC_REQUIRED"]);
  return { responseData, isKycRequired };
};

const updateKycRequirement = async (token, enable) => {
  const response = await fetch(
    `${apiOrigin}/api/admin/${clientId}/kyc?enable=${enable}`,
    { headers: { Authorization: `Bearer ${token}` }, method: "PATCH" }
  );

  const responseData = await response.json();
  const isKycRequired = isTruthy(responseData.message["KYC_REQUIRED"]);
  return { responseData, isKycRequired };
};

export {
  getCasinoData,
  getKycRequirement,
  updateKycRequirement,
  getDiscountCoupon,
};
