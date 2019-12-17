import React from "react";
import Cookie from "js-cookie";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={props =>
      !Cookie.get("token") ? <Redirect to="/login" /> : <Component />
    }
  />
);

export default PrivateRoute;
