import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../pages/Main";
const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
    </Switch>
  );
};

export default Routes;
