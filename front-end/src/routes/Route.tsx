import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

import { useAuth } from "../hooks/Auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  comp: React.ComponentType<RouteComponentProps>;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  comp: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={(props) => {
        if (isPrivate && !!user) {
          return <Component {...props} />;
        }

        if (isPrivate && !user) {
          return (
            <Redirect
              to={{
                pathname: "/cities",
                state: { from: props.location },
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default Route;
