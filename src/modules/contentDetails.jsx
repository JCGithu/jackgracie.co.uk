import React, { useEffect } from 'react';
import toolList from '../data/tools.json';

export default function ContentDetails({ data, index }) {
  let post = data[index - 1];

  useEffect(() => {
    function windowResize() {
      if (document.getElementById('embed')) {
        let embed = document.getElementById('embed');
        console.log(embed);
        console.log(embed.parentElement.getBoundingClientRect());
        let bounding = embed.parentElement.getBoundingClientRect();
        if (bounding.width > bounding.height * 1.78) {
          embed.style.width = `${bounding.height * 1.78}px`;
          embed.style.height = `${bounding.height}px`;
        } else {
          embed.style.height = `${bounding.width * 0.5618}px`;
          embed.style.width = `${bounding.width}px`;
        }
      }
    }

    window.addEventListener('resize', windowResize);
    windowResize();
  });

  function featureCheck(post) {
    if (post.feature.video) {
      return <video autoPlay muted loop playsInline src={post.feature.url} />;
    }
    if (post.feature.embed) {
      return <iframe id="embed" src={post.feature.url} title={post.title}></iframe>;
    }
    if (post.feature.image) {
      return <img src={post.feature.image.childImageSharp.original.src} alt={post.title} />;
    }
    return <img src={post.poster.childImageSharp.original.src} alt={post.title} />;
  }

  return (
    <div className="open">
      <div className="open_feature">
        {featureCheck(post)}
        <div>
          <p>Loading...</p>
        </div>
      </div>
      <div className="open_content">
        <div className="open_content_left">
          {post.title && <h1 style={post.accent && { '--accent': `${post.accent}` }}>{post.title}</h1>}
          {post.description && (
            <div>
              <p>{post.description}</p>
            </div>
          )}
        </div>
        <div className="open_content_right" style={post.accent && { borderColor: `${post.accent}` }}>
          {post.links &&
            post.links.map((link) => (
              <span className="links">
                {link.url && <a href={link.url}>{link.text}</a>}
                <br />
              </span>
            ))}
          {post.client && (
            <span>
              <b>Client:</b> {post.client}
            </span>
          )}
          <br />
          {post.tools && (
            <span>
              Tools: <br />
            </span>
          )}
          {post.tools &&
            post.tools.map((tool) => (
              <span>
                <img src={toolList[tool]} alt={tool} />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
