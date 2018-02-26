import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

import 'normalize/normalize.css';
import styles from './about.css';

class About extends Component {
  render() {
    return (
      <div className={styles.about}>
        <p>TOPLAP Japan.</p>
        <h1>find us:</h1>
        <h2><Link to="https://tksc.connpass.com" target="_blank">Connpass.com's group page</Link></h2>
        <h2><Link to="https://github.com/tksupercollider" target="_blank">Account on GitHub.com</Link></h2>
        <h2><Link to="https://twitter.com/toplapjp" target="_blank">Twitter account</Link></h2>
      </div>
    )
  }
}

export default About;
