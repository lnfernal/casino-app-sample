import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getConfig } from "../config";

export const KycComponent = () => {
  const { domain, kycMessage } = getConfig();
  const [state, setState] = useState({
    concentChecked: false,
  });

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const stateParam = query.get("state");
  const continueUrl = `https://${domain}/continue?state=${stateParam}`;

  const onConcentChecked = (e) => {
    setState({
      ...state,
      concentChecked: e.target.checked,
    });
  };

  const onContinueClicked = async () => {
    window.location.href = continueUrl;
  };

  return (
    <div className="mb-5">
      <h1>KYC</h1>
      <Form>
        <FormGroup check inline>
          <Input
            type="checkbox"
            onChange={onConcentChecked}
            checked={state.concentChecked}
          />
          <Label check>{kycMessage}</Label>
        </FormGroup>
      </Form>
      <Button
        color="primary"
        className="mt-5"
        onClick={onContinueClicked}
        disabled={!state.concentChecked}
      >
        Continue
      </Button>
    </div>
  );
};

export default KycComponent;
