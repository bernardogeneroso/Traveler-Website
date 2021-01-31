import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../pages/Main";
import Cities from "../pages/Cities";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/cities" component={Cities} />
    </Switch>
  );
};

export default Routes;
