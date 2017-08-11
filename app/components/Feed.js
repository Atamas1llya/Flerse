import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeed, getSubscribedFeed } from '../actions/feed';

import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';

import Story from './Story';

class Feed extends Component {
  componentDidMount() {
    this.props.getFeed();
    if (this.props.token) {
      this.props.getSubscribedFeed(this.props.token);
    }
  }
  render() {
    const { feed, token } = this.props;
    return(

      <Grid className='grid'>
        <Row className="show-grid">
          <Col xs={0} md={3} />
          <Col xs={12} md={6}>

          <Tabs defaultActiveKey={1} id="feed-tabs">
            <Tab eventKey={1} title="Home">
              <main>
                {
                  feed.common.map(story => <Story {...story} key={story._id} />)
                }
              </main>
            </Tab>
            {
              token
              ? <Tab eventKey={2} title="Subscribes">
                  <main>
                    {
                      feed.subscribed.map(story => <Story {...story} key={story._id} />)
                    }
                  </main>
                </Tab>
              : null
            }
          </Tabs>

          </Col>
          <Col xs={0} md={3} />
        </Row>
      </Grid>
    )
  }
}

const mapState = ({ feed, token }) => ({ feed, token });

const mapDispatch = dispatch => ({
  getFeed: () => dispatch(getFeed()),
  getSubscribedFeed: token => dispatch(getSubscribedFeed(token))
});

export default connect(mapState, mapDispatch)(Feed);
