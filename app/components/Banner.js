import React from 'react';
import DemoHeader from './Header';

export default () => {
  return(
    <div id="banner">
      <DemoHeader />
      <main>
        <article id="banner-info">
          <i className="material-icons">code</i>
          <span>Сервис в разработке</span>
        </article>
        <article id="banner-social">
          <a href="https://twitter.com/flerse_com" target="_blank">
            Twitter
          </a>
          <a href="https://vk.com/bo_ox" target="_blank">
            VK
          </a>
        </article>
      </main>
    </div>
  )
}
