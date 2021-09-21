


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
// import About from './components/About';
import Projects from './components/Projects';
// import Origami from './components/Origami';
// import Home from './components/Home';

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <Navbar>
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
            <LinkContainer to="/origami"><Nav.Link>Origami</Nav.Link></LinkContainer>
            <LinkContainer to="/"><Nav.Link>Projects</Nav.Link></LinkContainer>
          </Navbar>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route> */}
          {/* <Route path="/origami">
            <Origami />
          </Route> */}
          <Route path="/">
            <Projects />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}