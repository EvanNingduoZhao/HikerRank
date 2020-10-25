import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./About";
import Home from "./Home";

function App() {
  return (
    <div className="App">
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
        </Router>
    </div>
  );
}

export default App;
