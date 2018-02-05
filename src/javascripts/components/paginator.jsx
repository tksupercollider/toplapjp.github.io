/*
  paginator.jsx
*/

import React, { Component } from 'react';
// import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './paginator.css';

const MAX_VISIBLE_COUNT = 5;

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState.bind(this)();
    this.onClicked = this.onClicked.bind(this);
  }

  getDefaultState() {
    return { currentPage: this.props.currentPage };
  }

  getPageMax() {
    return Math.floor(this.props.dataLength / this.props.postParARange) + 1;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
    }
  }

  onClicked(newPage) {
    this.setState({currentPage: newPage});
    this._onChange(newPage);
  }

  _onChange(page) {
    // console.log('pagenator::onchnage::newpage',page);
    this.props.onChange(page);
  }

  render() {
    const currentLocation = window.location.pathname;
    // console.log(currentLocation);
    const p = this.props;
    const s = this.state;
    const max = this.getPageMax();
    var className = this.props.className || '';
    var skip = 0;

    if (s.currentPage > p.maxVisible - 1 && s.currentPage < max) {
      skip = s.currentPage - p.maxVisible + 1;
    } else if (s.currentPage === max) {
      skip = s.currentPage - p.maxVisible;
    }
    const num_show_page_num = Math.min(max, p.maxVisible);

    var iterator = Array.apply(null, Array(num_show_page_num)).map(function(v, i) {
      return skip + i + 1;
    });

    var previousPage = 1;
    if (s.currentPage > 1) {
      previousPage = s.currentPage - 1;
    }
    var nextPage = 1;
    if (s.currentPage < max) {
      nextPage = s.currentPage + 1;
    }
    const pev_hiding = (s.currentPage === 1) ? styles.hiding : '';
    const prev_class_name = s.currentPage === 1 ? 'disabled' : '';

    const next_hiding = (max === s.currentPage) ? styles.hiding : '';
    const next_class_name = s.currentPage === p.max ? 'disabled' : '';

    const notdisplaying = (currentLocation === '/') ? styles.notdisplaying : '';

    return (
      <nav className={`${styles.paginator} ${notdisplaying}`}>
        <ul className={`${styles.pagination} ${className}`}>
          <li className={`${styles.lists} ${prev_class_name} ${pev_hiding}`}>
            <Link to={'/archive/' + previousPage} onClick={this.onClicked.bind(this, previousPage)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Prev</span>
            </Link>
          </li>
          {iterator.map(function(page) {
            const className = s.currentPage === page ? styles.active : '';
            const hiding = (page <= 0) ? styles.hiding : '';
            return (
              <li key={page}
                className={`${styles.lists} ${className} ${hiding}`}>
                <Link to={'/archive/' + page} onClick={this.onClicked.bind(this, page)}>
                  {page}
                </Link>
              </li>
            );
          }, this)}
          <li className={`${styles.lists} ${next_class_name} ${next_hiding}`}>
            <Link to={'/archive/' + nextPage} onClick={this.onClicked.bind(this, nextPage)}>
              <span className="sr-only">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Paginator.propTypes = {
  dataLength: PropTypes.number.isRequired,
  postParARange: PropTypes.number.isRequired,
  maxVisible: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

Paginator.defaultProps = {
  currentPage: 0,
  dataLength: 0,
  postParARange: 0,
  maxVisible: MAX_VISIBLE_COUNT,
  onChange: undefined
};

export default Paginator;
