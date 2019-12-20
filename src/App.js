import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Views/login.jsx";
import Index from "./Views/index";
import SignupPage from "./Views/signup";
import Tasks from "./Views/tasks";
import NewTask from "./components/newTaskCom/newTask";
import EditPage from "./components/EditTaskCompo/editTask";
import PrivateRoute from "./Route/privateRoute";
import ControlPanal from "./Views/controlPanel.jsx";
import NotFoundPage from "./Views/notFoundPage";

function App() {
  const Protected = () => <Tasks />;
  const controlPannelVar = () => <ControlPanal />;
  const NewTaskVAr = () => <NewTask />;
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
        <PrivateRoute path="/newTask" component={NewTaskVAr} />
        <PrivateRoute path="/controlPanel" component={controlPannelVar} />
        <Route path="/editTask" component={EditPage} />
        <PrivateRoute path="/protected" component={Protected} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
