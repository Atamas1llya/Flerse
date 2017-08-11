import React from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Actions = ({ own, subscribed, showEditor, subscribe }) => {
  if (own) {

    return(
      <article className="blog-actions">
        <ButtonGroup>
          <Button onClick={showEditor}>New article</Button>
        </ButtonGroup>

        <ButtonGroup>
          <LinkContainer to="/settings">
            <Button>Edit profile</Button>
          </LinkContainer>
        </ButtonGroup>
      </article>
    )

  } else {

    return(
      <article className="blog-actions">
        <ButtonGroup>
          <Button>Like</Button>
          <Button>123</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={subscribe}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</Button>
        </ButtonGroup>
      </article>
    )

  }
}

export default Actions;
