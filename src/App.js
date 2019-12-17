import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Views/login";
import Index from "./Views";
import SignupPage from "./Views/signup";
import Tasks from "./Views/tasks";
import NewTask from "./Views/newTask";
import Page from "./components/page";
import PrivateRoute from "./Route/privateRoute";
import Cookie from "js-cookie";

function App() {
  const Protected = () => <Tasks />;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        {/* <Route exact path="/tasks">
          <Tasks />
        </Route> */}
        <Route exact path="/newTask">
          <NewTask />
        </Route>
        <Route path="/page" component={Page} />
        <PrivateRoute path="/protected" component={Protected} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
