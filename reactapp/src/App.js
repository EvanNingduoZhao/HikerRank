import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import history from "./component/history";
import Profile from "./component/Profile/Profile";
import Trail from "./component/Trail/Trail";

function App() {
  return (
    <div className="App">
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile" component={Profile} />
                <Route path="/trail" component={Trail} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
