import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../pages/Main";
import Cities from "../pages/Cities";
import City from "../pages/City";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/cities" component={Cities} />
      <Route path="/city/:city" component={City} />
    </Switch>
  );
};

export default Routes;
