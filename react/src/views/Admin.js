import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { isAdmin } from "../utils/user";
import { getKycRequirement, updateKycRequirement } from "../utils/apiService";

export const ProfileComponent = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
    isKycRequired: false,
    buttonText: "",
  });

  useEffect(async () => {
    try {
      const token = await getAccessTokenSilently();
      const { responseData, isKycRequired } = await getKycRequirement(token);

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData.message,
        isKycRequired,
        buttonText: isKycRequired
          ? "Press here to DISABLE KYC"
          : "Press here to ENABLE KYC",
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  }, []);

  const onClick = async () => {
    try {
      const token = await getAccessTokenSilently();

      const { responseData, isKycRequired } = await updateKycRequirement(
        token,
        !state.isKycRequired
      );

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData.message,
        isKycRequired,
        buttonText: isKycRequired
          ? "Press here to DISABLE KYC"
          : "Press here to ENABLE KYC",
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <Container className="mb-5">
      {isAdmin(user) && (
        <>
          <Row>
            <Highlight>{JSON.stringify(state.apiMessage, null, 2)}</Highlight>
          </Row>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col>
              <Button color="primary" onClick={onClick}>
                {state.buttonText}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
