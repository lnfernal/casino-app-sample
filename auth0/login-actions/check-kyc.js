const DEBUG = false;
const KEYS = {
  KYC_REQUIRED: "KYC_REQUIRED",
  KYC_DONE_AT: "KYC_DONE_@_",
}

const isTruthy = (val) => val === true || val === 'true'

/**
* Handler that will be called during the execution of a PostLogin flow.
* We use the following values to determine whether we ask for KYC consent or not. 
* - KYC_REQUIRED - this is a client metadata that determines whether the application requires KYC at all.
* - KYC_DONE_@_{clientName} - this is a user app metadata indicating whether the user has already passed the KYC.
*
* The KYC step is only required if:
* 1. the target application requires KYC (ie. KYC_REQUIRED == true), and
* 2. the user hasn't done the KYC yet with the target application. (ie. KYC_DONE_@_{clientName} == false)
* 
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  if (DEBUG) {
    console.log(`Client metadata: ${event.client.client_id}, App metadata: ${event.user.app_metadata}`);
  }

  const isKycRequired = isTruthy(event.client.metadata[KEYS.KYC_REQUIRED]);
  const isKycDone = isTruthy(event.user.app_metadata[KEYS.KYC_DONE_AT + event.client.name]);

  if (DEBUG) {
    console.log(`client: ${event.client.name}, isKycRequired: ${isKycRequired}, isKycDone: ${isKycDone}`);
  }

  if (isKycRequired && !isKycDone) {
    // redirect the user to KYC step.
    api.redirect.sendUserTo(`${event.request.query.redirect_uri}/kyc`);
  }

};

/**
* Handler that will be invoked when this action is resuming after an external redirect.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onContinuePostLogin = async (event, api) => {
  // mark the KYC done for the target application by storing the flag in user's app metadata
  api.user.setAppMetadata(KEYS.KYC_DONE_AT + event.client.name, true)
};
