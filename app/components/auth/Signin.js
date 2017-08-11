import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import DemoHeader from '../Header';
import { signin } from '../../actions/auth';


class Signin extends Component {
  constructor() {
    super();
    this.getCredentials = this.getCredentials.bind(this);
    this.signin = this.signin.bind(this);
  }

  getCredentials() {
    return {
      email: document.getElementById('signin-email').value,
      password: document.getElementById('signin-password').value
    }
  }

  signin(e) {
    e.preventDefault();

    const credentials = this.getCredentials();
    this.props.signin(credentials);
  }

  render() {
    return(
      <div>
        <DemoHeader />

        <Grid className='grid'>
          <Row className="show-grid">
            <Col xs={0} md={3} />
            <Col xs={12} md={6}>

              <form onSubmit={this.signin}>

                <FormGroup>
                  <ControlLabel>Ваша почта</ControlLabel>
                  <FormControl id="signin-email" placeholder="geralt@gmail.com" required />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Ваш пароль</ControlLabel>
                  <FormControl id="signin-password" placeholder="Ciri2Love" type="password" required />
                </FormGroup>

                <Button type="submit">Вход</Button>
              </form>

            </Col>
            <Col xs={0} md={3} />
          </Row>
        </Grid>

      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  signin: credentials => dispatch(signin(credentials))
});


export default connect(false, mapDispatch)(Signin);
