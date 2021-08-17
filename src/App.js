import React from "react";

import {Route} from "react-router-dom"

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./containers/Dashboard.component";
import Login from "./containers/loginPage.component";



function App() {
  return (
    <div className="App container py-3">
      <Route exact path='/' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
    </div>
  );
}

export default App;
