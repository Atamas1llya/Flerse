import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProfile } from './actions/user/profile';

class App extends Component {
  componentDidMount() {
    const { token, getProfile } = this.props;
    getProfile(token);
  }
  render() {
    return(
      <div className='fadeIn animated'>
        {this.props.children}
      </div>
    )
  }
}

const mapState = ({ token }, { children }) => ({ token, children })

const mapDispatch = dispatch => ({
  getProfile: token => dispatch(getProfile(token))
})

export default connect(mapState, mapDispatch)(App);
