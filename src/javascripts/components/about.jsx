import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import MD from 'react-markdown';

import 'normalize/normalize.css';
import styles from './about.css';

import abobut_content from 'json-loader!yaml-loader!../../about.yml';

class About extends Component {
  render() {
    return (
      <div className={styles.about}>

        <h1>{abobut_content.title}</h1>
        <MD
          className={styles.abobutContent}
          source={abobut_content.content}
        />

        <h1>find us:</h1>
        <h2><Link to="https://twitter.com/toplapjp" target="_blank">Twitter account</Link></h2>
        <h2><Link to="http://algorave.tokyo" target="_blank">Algorave Tokyo</Link></h2>
        <h2><Link to="https://github.com/tksupercollider" target="_blank">Account on GitHub.com</Link></h2>
      </div>
    )
  }
}

export default About;
