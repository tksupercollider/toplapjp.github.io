/*
  post.jsx
*/
// import { filter } from 'lodash';
import React, { Component } from 'react';
// import { render } from 'react-dom';

import Container from './container.jsx';
// import data from '../../data.json';

class Post extends Component {
  render() {
    const unwraped = [{path: this.props.params.id + '.md'}];
    // const unwraped = currentData;
    return (
      <div>
        <div className="container">
          <Container multiple={false} currentData={unwraped} />
        </div>
      </div>
    );
  }
}

export default Post;
