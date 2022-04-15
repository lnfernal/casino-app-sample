/**
* Handler that will set in the ID Token a custom claim for user roles during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  if (event.authorization) {
    api.idToken.setCustomClaim(`https://yusasaki-casino/roles`, event.authorization.roles)
  }
};