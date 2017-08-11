import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import Avatar from './settings/Avatar';

const Settings = () => {
  return(
    <Grid className='grid'>
      <Row className="show-grid">

        <Col xs={0} md={3}>
          <Button bsSize="large" block>Profile</Button>
        </Col>

        <Col xs={12} md={6}>
          <Avatar />
        </Col>

        <Col xs={0} md={3}>

        </Col>

      </Row>
    </Grid>
  )
}

export default Settings;
