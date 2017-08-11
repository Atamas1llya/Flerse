import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

class Story extends Component {
  constructor() {
    super();
    this.getStoryDate = this.getStoryDate.bind(this);
  }

  getStoryDate(story) {
    return moment(story.date).locale('ru').fromNow();
  }

  render() {
    const { story } = this.props;
    const storyDate = this.getStoryDate(story);

    return(
      <article className="feed-story">
        <Link className="story-author" to={"/user/" + story.holder.nickname}>
          <section className={story.holder.avatar ? "author-image" : "author-image char"}>

            {
              story.holder.avatar
              ? <img src={story.holder.avatar} alt=""/>
              : <span>{story.holder.nickname.charAt(0)}</span>
            }

          </section>
          <div className="author-personal">
            <h5>{ story.holder.nickname }</h5>
            <h6>{ storyDate }</h6>
          </div>
        </Link>

        {
          story.preview
          ? <section className="story-image">
              <img src={story.preview} alt=""/>
            </section>
          : null
        }

        <section className="story-body">
          <h4>{ story.title }</h4>
          <p>{ story.body.length > 190 ? story.body.slice(0, 190) + '...' : story.body}</p>
        </section>

      </article>
    )
  }
}

const mapState = (state, story) => ({
  story
})

export default connect(mapState)(Story);
