/*
  constents.jsx
*/

import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router';
import MD from 'react-markdown';
import codeBlock from './codeblock.jsx';

import styles from './contents.css';

class Constents extends Component {
  render() {
    const hide_date = (this.props.layout === 'project') ? styles.hiding : '';
    return (
      <div className={`${styles.contents}`}>
        <div className={styles.title}>
          <Link to={`/post/${this.props.path}`}>
          <h2>
            {this.props.title}
          </h2>
          </Link>
          {` : `}
          <spawn className={`${styles.date} ${hide_date}`}>
            <h3> {this.props.date} </h3>
          </spawn>
        </div>        

        <div className={styles.content}>
          <MD
            source={this.props.body}
            escapeHtml={false}
            renderers={{
              CodeBlock: codeBlock,
              Code: codeBlock
            }}
          />
        </div>
      </div>
    );
  }
}

export default Constents;
