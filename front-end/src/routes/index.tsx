import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import RouteCheck from "./Route";

import Main from "../pages/Main";

import Categories from "../pages/Categories";
import CreateCategorie from "../pages/Categories/Create";
import EditCategorie from "../pages/Categories/Edit";

import City from "../pages/City";
import CityEdit from "../pages/City/Edit";

import Cities from "../pages/Cities";
import CreateCityStage01 from "../pages/Cities/Create/Stage01";
import CreateCityStage02 from "../pages/Cities/Create/Stage02";

import Place from "../pages/Place";
import PlaceEdit from "../pages/Place/Edit";

import Evaluation from "../pages/Evaluations";

import SignIn from "../pages/SignIn";

const Routes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <RouteCheck path="/" comp={Main} exact />

      <RouteCheck path="/evaluations" comp={Evaluation} isPrivate />

      <RouteCheck path="/categories" comp={Categories} exact isPrivate />
      <RouteCheck path="/categories/create" comp={CreateCategorie} isPrivate />
      <RouteCheck path="/categories/edit/:id" comp={EditCategorie} isPrivate />

      <RouteCheck path="/cities" comp={Cities} exact />
      <RouteCheck
        path="/cities/stage01/create"
        comp={CreateCityStage01}
        isPrivate
      />
      <RouteCheck
        path="/cities/stage02/create"
        comp={CreateCityStage02}
        isPrivate
      />

      <RouteCheck path="/city/:id" comp={City} exact />
      <RouteCheck path="/city/edit/:id" comp={CityEdit} isPrivate />

      <RouteCheck path="/place/:id" comp={Place} exact />
      <RouteCheck path="/place/edit/:id" comp={PlaceEdit} isPrivate />

      <RouteCheck path="/signin" comp={SignIn} />

      {
        <Route
          path="*"
          render={() => {
            return <Redirect to="/cities" />;
          }}
        />
      }
    </Switch>
  );
};

export default Routes;
