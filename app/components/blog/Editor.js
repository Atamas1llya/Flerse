import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

import { newStory } from '../../actions/user/stories';

class Editor extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  newStory(e) {
    e.preventDefault();
    const story = this.getStoryFields();
    const { image, ext } = this.state;

    Object.assign(story, {
      image,
      ext,
      published: true
    })

    const { token, nickname, newStory, getUser, closeEditor } = this.props;

    this.setState({ sending: true });

    newStory(token, story)
      .then(() => {
        this.setState({ sending: false });
        getUser(nickname);
        closeEditor();
      });
  }

  loadImage({target}) {
    const image = target.files[0];
    const ext = image.type.split('/')[1];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        image: reader.result,
        imageName: image.name,
        ext
      });
    }

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getStoryFields() {
    return {
      title: document.getElementById('blog-new-title').value,
      body: document.getElementById('blog-new-body').value,
      date: Date.now()
    }
  }


  render() {
    const { sending, imageName } = this.state;
    const { closeEditor } = this.props;
    return(
      <article className="blog-new-article fadeIn animated">
        <form onSubmit={e => this.newStory(e)}>

          <FormGroup>
            <FormControl disabled={sending} id="blog-new-title" placeholder="История с Марса" autoComplete="off" required />
          </FormGroup>


          <FormGroup>
            <FormControl disabled={sending} componentClass="textarea" id="blog-new-body" placeholder="Жил-был на пёс на Марсе, и звали его..." required />
          </FormGroup>

          <FormGroup>
            <input type="file" name="blog-preview" id="blog-preview" className="input-file" onChange={() => this.loadImage()} accept="image/jpeg,image/png,image/jpg" />
            <label htmlFor="blog-preview" className="btn btn-default" disabled={sending}>Choose a preview image</label>
            { imageName }
          </FormGroup>

          <Button type="submit" disabled={sending}>Send</Button>
          <Button onClick={closeEditor} disabled={sending}>Cancel</Button>
          <Button className="pull-right go-to-editor" disabled={sending}>Редактор</Button>

        </form>
      </article>
    )
  }
}
const mapState = ({ token, user }) => ({
  token,
  nickname: user.nickname
})

const mapDispatch = dispatch => ({
  newStory: (token, story, nickname) => newStory(token, story, nickname)
})

export default connect(mapState, mapDispatch)(Editor);
