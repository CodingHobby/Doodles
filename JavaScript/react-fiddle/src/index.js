import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import './styles/index.css'

import Archive from './pages/Archive'
import Featured from './pages/Featured'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Settings from './pages/Settings'

ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/archive/:article" component={Archive}></Route>
      <Route exact path="/settings" component={Settings}></Route>
      <Route exact path="/featured" component={Featured}></Route>
    </div>
  </Router>,
  document.getElementById('root')
)