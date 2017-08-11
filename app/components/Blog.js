import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, ButtonGroup, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import { getUser } from '../actions/users';
import { newStory } from '../actions/user/stories';
import { subscribe, unsubscribe } from '../actions/user/subscribes';

import { LinkContainer } from 'react-router-bootstrap';

import Personal from './blog/Personal';
import Actions from './blog/Actions';
import Editor from './blog/Editor';

import Story from './Story';

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      stories: []
    }
    this.getUser = this.getUser.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.nickname);
  }

  componentWillReceiveProps(props) {
    if (props.nickname !== this.props.nickname) {
      this.getUser(props.nickname);
    }
  }

  getUser(nickname) {
    const { token  } = this.props;
    getUser(token, nickname)
      .then(user => {
        this.setState(user);
        console.log(user);
      })
  }

  subscribe() {
    const { token } = this.props;
    const { _id } = this.state;

    if (this.state.subscribed) {
      unsubscribe(token, _id)
       .then(() => {
         this.setState({
           subscribed: false
         })
       })
    } else {
      subscribe(token, _id)
       .then(() => {
         this.setState({
           subscribed: true
         })
       })
    }
  }

  render() {
    const { nickname, avatar, status, editor, imageName, stories, subscribed, sending } = this.state;
    let { user } = this.props;
    return(
      <div className="user-blog">
        <Grid className='grid'>
          <Row className="show-grid">
          
            <Col xs={0} md={3} />

            <Col xs={12} md={6}>

              <Personal avatar={avatar} nickname={nickname} />
              <Actions own={user.nickname === nickname} subscribed={subscribed} showEditor={() => this.setState({editor: !this.state.editor})} subscribe={this.subscribe} />
              { !editor || <Editor closeEditor={() => this.setState({editor: false})} getUser={this.getUser} /> }

              <article>
                { stories.map(story => <Story {...story} key={story._id} holder={this.state} />) }
              </article>

            </Col>

            <Col xs={0} md={3} />

          </Row>
        </Grid>
      </div>
    )
  }
}

const mapState = ({ token, user }, { params }) => ({
  token,
  user,
  nickname: params.nickname
})

const mapDispatch = dispatch => ({
  newStory: (token, story, nickname) => newStory(token, story, nickname)
})
export default connect(mapState, mapDispatch)(Blog);
