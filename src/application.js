import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Books from './books';
import Home from './home';

class Application extends Component {

  render() {
    return (
    <Router>
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="p-2 text-dark" to="/">CPSC 2650 Library</Link></h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-dark" to="/books">Books</Link>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default Application;
