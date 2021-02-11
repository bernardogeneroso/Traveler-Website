import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Main from "../pages/Main";

import City from "../pages/City";
import CityEdit from "../pages/City/Edit";

import Cities from "../pages/Cities";
import CreateCityStage01 from "../pages/Cities/Create/Stage01";
import CreateCityStage02 from "../pages/Cities/Create/Stage02";

import Place from "../pages/Place";

import SignIn from "../pages/SignIn";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />

      <Route path="/cities" component={Cities} exact />
      <Route path="/cities/stage01/create" component={CreateCityStage01} />
      <Route path="/cities/stage02/create" component={CreateCityStage02} />

      <Route path="/city/:id" component={City} exact />
      <Route path="/city/edit/:id" component={CityEdit} />

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
