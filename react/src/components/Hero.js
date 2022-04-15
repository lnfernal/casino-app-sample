import React, { useState } from "react";
import { Button } from "reactstrap";
import logo from "../assets/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { getDiscountCoupon } from "../utils/apiService";

const Hero = ({ casino }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    showResult: false,
    isCallingApi: false,
    apiMessage: "",
    error: null,
  });

  const callApi = async () => {
    try {
      setState({
        ...state,
        showResult: false,
        apiMessage: null,
        isCallingApi: true,
      });

      const token = await getAccessTokenSilently();
      const responseData = await getDiscountCoupon(token);

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData.message,
        isCallingApi: false,
      });
    } catch (error) {
      setState({
        ...state,
        apiMessage: error.message,
        isCallingApi: false,
        error: error.error,
      });
    }
  };

  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />

      <h1 className="mb-4">{casino.title}</h1>
      <p className="lead">
        {isAuthenticated ? (
          <Button color="primary" onClick={callApi} className="mt-5">
            Get a Welcome Coupon!
          </Button>
        ) : (
          "Please login to gamble!"
        )}
        {state.isCallingApi && (
          <span style={{ display: "block" }}>Loading...</span>
        )}
        {state.showResult && (
          <span style={{ display: "block" }}>{state.apiMessage}</span>
        )}
      </p>
    </div>
  );
};

export default Hero;
