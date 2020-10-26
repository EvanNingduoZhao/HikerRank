import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <div className="App">
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
        </Router>
    </div>
  );
}

export default App;
