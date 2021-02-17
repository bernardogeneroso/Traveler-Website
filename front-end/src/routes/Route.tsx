import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  children,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/cities",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
