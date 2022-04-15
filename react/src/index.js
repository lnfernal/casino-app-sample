import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/auth0_provider.auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  audience: config.audience,
  redirectUri: window.location.origin,
  scope: "update:kycrequirement",
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
