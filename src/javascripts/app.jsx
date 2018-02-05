/*
  app.jsx
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Redirect,
  IndexRoute,
  browserHistory
} from 'react-router';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Page from './components/page.jsx';
import Post from './components/post.jsx';
import About from './components/about.jsx';
import Digest from './components/digest/index.jsx';
import NotFound404 from './components/notfound404.jsx';
import scrollTop from './lib/ScrollTop.js';

import 'normalize/normalize.css';
import styles from './app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.onMenuChange = this.onMenuChange.bind(this);
    this.getDigest = this.getDigest.bind(this);
  }
  onCloseMenu() {
    this.refs.header.setState({toggleMenu: false});
    scrollTop();
  }
  onMenuChange(state) {
    if (this.refs.menu) {
      this.refs.menu.setChangeState(state);
    }
  }
  getDigest() {
    let digest;
    if (this.props.location.pathname === '/') {
      digest = <Digest ref="digest"/>;
    }
    return digest;
  }

  render() {
    return (
      <div className={styles.app}>
        <Header onMenuChange={this.onMenuChange} ref="header" />
        <main>
          {this.props.children}
        </main>
        {this.getDigest()}
        <Footer />
      </div>
    );
  }
}

class Inbox extends Component {
  render() {
    return (
      <div className={styles.subtitle}>
        {this.props.children}
      </div>
    );
  }
}

var routes = (
  <Route exact path= '/' component={ App }>
    <IndexRoute component={ Page }/>

    <Route path="top" component={ Inbox }>
      <Redirect from="archive/:id" to="/archive/:id" />
    </Route>

    <Route component={ Inbox }>
      <Route path='about' component={ About } />
    </Route>

    <Route component={ Inbox }>
      <Route path='archive/:id' component={ Page } />
    </Route>

    <Redirect from="archive" to="/archive/1" component={ Inbox } />

    <Route>
      <Route path='post/:id' component={ Post } />
    </Route>

    <Route path='*' component={ NotFound404 } />
  </Route>
);

ReactDOM.render(
  // TODO: routing in gh-pages
  <Router routes={ routes } basename={ `PUBLIC_URL` } history={ browserHistory }/>
  ,document.getElementById('app')
);

export default App;
