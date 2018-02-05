/*
  container.jsx
*/
import React, { Component } from 'react';
// import { render } from 'react-dom';
import Contents from './contents.jsx';
import PropTypes from 'prop-types';
import PostLoader from '../lib/PostLoader';

class Container extends Component {
  constructor(props) {
    super(props);
    this.mapItem = this.mapItem.bind(this);
    this.assigin = this.assigin.bind(this);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {rows: []};
  }

  mapItem(item, i=0) {
    return new Promise((resolve) => {
      // var title = item.title;
      // const image = './images/' + item.image;
      var date = item.date;
      if (!date) {
        date = item.path.slice(0, 10);
      }
      new PostLoader(item.path)
        .then((res) => {
          const key = Date.now() + i + Math.random() * 9999;
          let contents = <Contents title={res.attributes.title} date={date} body={res.body} key={key} path={res.path} layout={res.attributes.layout}/>;
          resolve(contents);
        });
    });
  }
  componentDidMount() {
    this.assigin();
  }

  componentWillReceiveProps(props_) {
    this.assigin(props_);
  }

  assigin(props_) {
    const curennt_props = props_ || this.props;
    let new_rows = [];
    var all;
    if (this.props.multiple) {
      all = curennt_props.currentData.map((item, i) => {
        return this.mapItem(item, i)
          .then((res) => {
            new_rows.push(res);
          });
      });
    } else {
      all = this.mapItem(curennt_props.currentData[0], Number.MAX_VALUE)
        .then((res) => {
          new_rows.push(res);
        });
      all = [all];
    }
    Promise.all(all)
      .then(() => {
        this.setState({rows: new_rows});
        // this.forceUpdate();
      });
  }

  render() {
    return (
      <div>
        {this.state.rows}
      </div>
    );
  }
}

Container.propTypes = {
  multiple: PropTypes.bool.isRequired,
  currentData: PropTypes.array.isRequired
};

Container.defaultProps = {
  multiple: false,
  currentData: []
};

export default Container;
