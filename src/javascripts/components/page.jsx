/*
  page.jsx
*/
import React, { Component } from 'react';
// import { render } from 'react-dom';
import PropTypes from 'prop-types';

import Container from './container.jsx';
import Paginator from './paginator.jsx';
import scrollTop from '../lib/ScrollTop.js';

import data from '../../data.json';

const NUM_POST_PAR_A_PAGE = 5;

class Page extends Component {
  constructor(props) {
    super(props);
    // console.log('initial', this.props.id , this.props.params.id)
    this.state = this.getDefaultState.bind(this)();
    this.getCurrentRange = this.getCurrentRange.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }
  getDefaultState() {
    return {currentPage: this.props.id || this.props.params.id, currentRange: {from: 1, to: NUM_POST_PAR_A_PAGE}};
  }

  getCurrentRange() {
    const from = (this.state.currentPage - 1) * NUM_POST_PAR_A_PAGE;
    const to = from + NUM_POST_PAR_A_PAGE - 1;
    return {from: from, to: to};
  }

  getCurrentData() { // generate datas for each page..
    const from = this.getCurrentRange().from;
    const to = this.getCurrentRange().to;
    return data.slice(from, to);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps::',nextProps.params.id)
    this.setState({currentPage: nextProps.params.id});
  }

  onPageChanged(page) {
    this.setState({currentPage: page});
    scrollTop();
  }

  render() {
    // console.log('paeg::currentPage::pre',this.state.currentPage)
    var currentRange = this.getCurrentRange();
    var currentData = this.getCurrentData();
    // console.log('paeg::currentPage',this.state.currentPage,currentRange,currentData[0]);
    return (
      <div>
        <div className="container">
          <Container multiple={true} currentData={currentData}/>
          <Paginator currentPage={currentRange.from / NUM_POST_PAR_A_PAGE + 1} dataLength={data.length} postParARange={NUM_POST_PAR_A_PAGE} onChange={this.onPageChanged}/>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  currentPage: PropTypes.number
};

Page.defaultProps = {data: data};

export default Page;
