import React from 'react';

const Personal = ({ avatar, nickname }) => {
  return(
    <article className="blog-info">
      <section className={avatar ? "user-image" : "user-image char"}>
        {
          avatar
          ? <img src={avatar} alt=""/>
          : <span>{nickname.charAt(0)}</span>
        }

      </section>

      <section className="blog-name">
        <h3>{nickname}</h3>
        <h5>Lorem ipsum dolor sit amet, lorem ipsum</h5>
      </section>
    </article>
  )
}

export default Personal;
