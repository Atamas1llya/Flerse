import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

const DemoHeader = ({ token, redirectToFeed }) => {
  if (token) redirectToFeed('/');
  return(
    <header id="demo-header">
      <span>Flerse</span>
      <span>
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
      </span>
    </header>
  )
}

const mapState = ({ token }) => ({ token });

const mapDispatch = dispatch => ({
  redirectToFeed: () => dispatch(push('/feed'))
})

export default connect(mapState, mapDispatch)(DemoHeader);
