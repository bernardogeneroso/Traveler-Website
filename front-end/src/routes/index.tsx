import React from "react";
import { Switch, Redirect } from "react-router-dom";

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

import SignIn from "../pages/SignIn";

const Routes: React.FC = () => {
  return (
    <Switch>
      <RouteCheck path="/" component={Main} exact />

      <RouteCheck path="/categories" component={Categories} exact isPrivate />
      <RouteCheck
        path="/categories/create"
        component={CreateCategorie}
        isPrivate
      />
      <RouteCheck
        path="/categories/edit/:id"
        component={EditCategorie}
        isPrivate
      />

      <RouteCheck path="/cities" component={Cities} exact />
      <RouteCheck
        path="/cities/stage01/create"
        component={CreateCityStage01}
        isPrivate
      />
      <RouteCheck
        path="/cities/stage02/create"
        component={CreateCityStage02}
        isPrivate
      />

      <RouteCheck path="/city/:id" component={City} exact />
      <RouteCheck path="/city/edit/:id" component={CityEdit} isPrivate />

      <RouteCheck path="/place/:id" component={Place} exact />
      <RouteCheck path="/place/edit/:id" component={PlaceEdit} isPrivate />

      <RouteCheck path="/signin" component={SignIn} />

      {
        <RouteCheck
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
