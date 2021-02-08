import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Main from "../pages/Main";
import Cities from "../pages/Cities";
import City from "../pages/City";
import Place from "../pages/Place";

import SignIn from "../pages/SignIn";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/cities" component={Cities} />
      <Route path="/city/:id" component={City} />
      <Route path="/place/:id" component={Place} />

      <Route path="/signin" component={SignIn} />

      <Route
        path="*"
        render={() => {
          return <Redirect to="/cities" />;
        }}
      />
    </Switch>
  );
};

export default Routes;
