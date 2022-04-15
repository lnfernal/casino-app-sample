import React from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";

import { getConfig } from "../config";
const { clientId, nyCasino, alCasino, coCasino } = getConfig();

const getLink = (targetClientId) => {
  if (nyCasino.clientId === targetClientId) {
    return nyCasino.link;
  }
  if (alCasino.clientId === targetClientId) {
    return alCasino.link;
  }
  if (coCasino.clientId === targetClientId) {
    return coCasino.link;
  }
};

const StateSwitcher = ({ casinoData }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="next-steps my-5">
      <h2 className="my-5 text-center">Switch to Different State</h2>
      <Row className="d-flex justify-content-between">
        {casinoData.map((col, i) => (
          <Col key={i} md={3} className="mb-4">
            <h6 className="mb-3">
              {col.clientId === clientId ? (
                col.title
              ) : (
                <a href={`${getLink( col.clientId)}?authenticated=${isAuthenticated}`} >
                  <FontAwesomeIcon icon="link" className="mr-2" />
                  {col.title}
                </a>
              )}
            </h6>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StateSwitcher;
