/*
  digest.jsx
*/
import React, { Component } from 'react';
import { Link } from 'react-router';
// import { render } from 'react-dom';
// import PropTypes from 'prop-types';
import DigestPost from './post.jsx';

import PostLoader from '../../lib/PostLoader';

import post_data from '../../../data.json';

import styles from './index.css';

class Digest extends Component {
  constructor(props) {
    super(props);
    this.mapItem = this.mapItem.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.post_rows = [];
    this.state = this.initInitialState();
  }

  initInitialState() {
    return { posts: null };
  }

  componentDidMount() {
    Promise.all([
      this.getPosts(post_data.slice(0, 5)),
    ])
    .then(() => {
      this.setState({
        posts: this.post_rows
      })
    });
  }

  mapItem(item, index=0) {
    return new Promise((resolve) => {
      var date = item.date;
        if (!date) {
          date = item.path.slice(0, 10);
        }

      new PostLoader(item.path)
        .then((res) => {
          const key = Date.now() + Math.random() * index;
          const contents = <DigestPost title={res.attributes.title} id={index} date={date} body={res.body} key={key} path={res.path} layout={res.attributes.layout}/>;
          resolve(contents);
        });
    });
  }

  getPosts(data) {
    const all = data.map((item, i) => {
        return this.mapItem(item, i)
          .then((res) => {
            this.post_rows.push(res);
          });
        });
    return Promise.all(all);
  }

  render() {
    return (
      <div className={styles.digest}>
        <div className={styles.posts}>        
          {this.state.posts}
        </div>
      </div>
    );
  }
}

export default Digest;
