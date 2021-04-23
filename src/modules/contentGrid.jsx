import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Content from './contentDetails';

export default function ContentGrid({ posts }) {
  const [open, setState] = useState(0);
  let openData = (i) => setState(i + 1);

  return (
    <div className="content_grid">
      {open > 0 && (
        <div>
          <Content data={posts} index={open} />
          <div
            className="open_close"
            role="button"
            onClick={() => {
              openData(-1);
            }}
            onKeyDown={() => {
              openData(-1);
            }}
            tabIndex={0}
          >
            <b>X</b>
          </div>
        </div>
      )}
      {posts.map((post, i) => (
        <div className="content_box" key={i}>
          <div
            className="content_item"
            role="gridcell"
            onClick={() => {
              openData(i);
            }}
            onKeyDown={() => {
              openData(i);
            }}
            tabIndex={i + 1}
          >
            <div className="content_feature">
              {post.video ? (
                <video className="lazy" autoPlay muted loop playsInline poster={post.poster.childImageSharp.resize.src}>
                  <source data-src={post.video} type="video/webm" />
                </video>
              ) : (
                <img src={post.poster.childImageSharp.original.src} />
              )}
            </div>
            <div className="content_text">
              {post.title && <h1>{post.title}</h1>}
              {post.subtitle && <p>{post.subtitle}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
