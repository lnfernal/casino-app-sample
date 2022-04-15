import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import KycComponent from "./views/Kyc";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import AutoLogin from "./components/AutoLogin";
import { getCasinoData } from "./utils/apiService";
import { getConfig } from "./config";

initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();
  const [state, setState] = useState({
    casinoData: [],
    targetCasino: undefined,
    isCasinoDataLoading: false 
  });
  const { clientId } = getConfig();

  useEffect(async () => {
    setState({
      ...state,
      isCasinoDataLoading: true
    })
    const casinoData = await getCasinoData();
    setState({
      ...state,
      casinoData,
      targetCasino: casinoData.find((a) => a.clientId === clientId),
      isCasinoDataLoading: false
    });
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading || state.isCasinoDataLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <AutoLogin />
      <div id="app" className="d-flex flex-column h-100">
        <NavBar casino={state.targetCasino} />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact render={() => <Home casinoData={state.casinoData} casino={state.targetCasino} />} />
            <Route path="/profile" component={Profile} />
            <Route path="/kyc" component={KycComponent} />
            <Route path="/admin" exact component={Admin} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
