const DEBUG = false;
const KEYS = {
  KYC_DONE_AT: "KYC_DONE_@_"
}

const isTruthy = (val) => val === true || val === 'true';

/**
* Handler that will set in a Access Token a custom claim that identifies if KYC is done for a target client
* during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  if (DEBUG) {
    console.log(`Client metadata: ${event.client.metadata}, App metadata: ${event.user.app_metadata}`);
  }
  if (event.authorization) {
    const isKycDone = isTruthy(event.user.app_metadata[KEYS.KYC_DONE_AT + event.client.name]);
    api.accessToken.setCustomClaim(`https://yusasaki-casino/${event.client.client_id}/kycdone`, isKycDone);
  }
};
