import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const AutoLogin = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const wasAuthenticated = query.get("authenticated") === "true";

  useEffect(async () => {
    if (wasAuthenticated && !isAuthenticated) {
      await loginWithRedirect();
    }
  }, []);

  return null;
};

export default AutoLogin;
