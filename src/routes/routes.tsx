import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./private.routes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import CreateProductsPage from "../pages/CreateProducts";
import EditProducts from "../pages/EditProducts";
import Register from "../pages/Register";
import MarkUp from "../pages/MarkUp";
import Sales from "../pages/Sales";
import CreateSalesPage from "../pages/CreateSales";

interface RoutesProps {
  loggedIn: boolean;
}

const Routes: React.FC<RoutesProps> = ({ loggedIn }) => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          exact
          path="/dashboard"
          isAuth={loggedIn}
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path="/products"
          isAuth={loggedIn}
          component={Products}
        />
        <PrivateRoute
          exact
          path="/products/create"
          isAuth={loggedIn}
          component={CreateProductsPage}
        />
        <PrivateRoute
          exact
          path="/products/edit/:id"
          isAuth={loggedIn}
          component={EditProducts}
        />
        <PrivateRoute
          exact
          path="/markup"
          isAuth={loggedIn}
          component={MarkUp}
        />
        <PrivateRoute exact path="/sales" isAuth={loggedIn} component={Sales} />
        <PrivateRoute
          exact
          path="/sales/create"
          isAuth={loggedIn}
          component={CreateSalesPage}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
