import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { updateProfile, changeAvatar, getProfile } from '../../actions/user/profile';


class Avatar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  loadImage() {
    const image = document.getElementById('settings-avatar-new').files[0];
    this.setState({
      userAvatarPreview: image
    })

    const ext = image.type.split('/')[1];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        newAvatar: reader.result,
        newAvatarName: image.name,
        newAvatarExt: ext
      });
    }

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  cancelLoadImage() {
    this.setState({
      newAvatar: undefined,
      newAvatarName: undefined,
      newAvatarExt: undefined
    })
    document.getElementById('settings-avatar-new').files[0] = undefined;
  }

  changeAvatar() {
    const { changeAvatar, token, getProfile } = this.props;
    const { newAvatar, newAvatarExt } = this.state;

    this.setState({
      updating: true
    })

    changeAvatar(token, {
      image: newAvatar,
      ext: newAvatarExt
    })
      .then(() => {
        getProfile(token);
        this.setState({
          updating: false,
          newAvatar: undefined,
          newAvatarName: undefined,
          newAvatarExt: undefined
        })
      })
  }

  render() {
    const { avatar, nickname } = this.props.user;
    const { newAvatar, updating } = this.state;
    return(
      <article id="settings-avatar">
        <i className="material-icons">face</i>
        <section className={newAvatar ? "user-image" : (avatar ? "user-image" : "user-image char")}>
          {
            newAvatar || avatar
            ? <img src={newAvatar || avatar} alt=""/>
            : <span>{nickname.charAt(0)}</span>
          }
        </section>

        <section>
          <input type="file" name="settings-avatar-new" id="settings-avatar-new" className="input-file" accept="image/jpeg,image/png,image/jpg" onChange={() => this.loadImage()} />
          { newAvatar ? null : <label htmlFor="settings-avatar-new" className="btn btn-link">Load new image</label>}
          { newAvatar ? <Button bsStyle="success" onClick={() => this.changeAvatar()} disabled={updating}>Save</Button> : null }
          { newAvatar ? <Button bsStyle="warning" onClick={() => this.cancelLoadImage()} disabled={updating}>Cancel</Button> : null }
        </section>
      </article>
    )
  }
}

const mapState = ({ token, user }) => ({
  token,
  user
})

const mapDispatch = dispatch => ({
  updateProfile: (token, profile) => dispatch(updateProfile(token, profile)),
  changeAvatar: (token, avatar) => changeAvatar(token, avatar),
  getProfile: token => dispatch(getProfile(token))
})

export default connect(mapState, mapDispatch)(Avatar);
