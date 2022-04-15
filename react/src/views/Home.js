import React, { Fragment } from "react";

import Hero from "../components/Hero";
import StateSwitcher from "../components/StateSwitcher";

const Home = ({ casinoData, casino }) => (
  <Fragment>
    <Hero casino={casino} />
    <hr />
    <StateSwitcher casinoData={casinoData} />
  </Fragment>
);

export default Home;
