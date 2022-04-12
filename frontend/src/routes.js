import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register';
import injectContext from "./store/appContext";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </BrowserRouter>
  );
}

export default injectContext(Routes);