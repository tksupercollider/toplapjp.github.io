/*
  header.jsx
*/

import React, { Component } from 'react';
import { Link } from 'react-router';

import $ from 'jquery';
import styles from './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultStates();
  }

  getDefaultStates() {
    return { subTitle : "" };
  }

  render() {
    let arrow = ">>";
    if (0 === this.state.subTitle.length) {arrow = ""}
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>
            <Link to={`/`}>TOPLAP Japan</Link> {arrow} <span className={styles.subTitle}>{this.state.subTitle}</span>
          </h1>
          <ul>
            <li>
              <Link to="/">[/]</Link>
            </li>
            <li>
              <Link to="/about">[About]</Link>
            </li>
            <li>
              <Link to="/archive">[Archive]</Link>
            </li>
            <li>
              <Link to="https://twitter.com/toplapjp" target="_blank">[Twitter]</Link>
            </li>
            <li>
              <Link to="https://github.com/tksupercollider" target="_blank">[Github]</Link>
            </li>
            <li>
              <Link to="http://algorave.tokyo" target="_blank">[Algorave Tokyo]</Link>
            </li>
          </ul>
        </div>
        <div className={styles.divider}>
          //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        </div>
      </div>
    );
  }
}

export default Header;
