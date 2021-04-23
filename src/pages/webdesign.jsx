import * as React from 'react';
import '../styles/globals.scss';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import ContentGrid from '../modules/contentGrid';

import web from '../images/web.jpg';

const toolIcons = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg',
    alt: 'HTML',
  },
  {
    url: '/icons/css.svg',
    alt: 'CSS',
    local: true,
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Javascript_Logo.png/640px-Javascript_Logo.png',
    alt: 'JS',
  },
  {
    url: '/icons/tailwind.svg',
    alt: 'Tailwind',
    local: true,
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg',
    alt: 'SASS',
  },
  {
    url: 'https://ui-router.github.io/images/logos/react.png',
    alt: 'react',
  },
  {
    url: 'https://www.gatsbyjs.com/Gatsby-Monogram.svg',
    alt: 'Gatsby',
  },
  {
    url: 'https://www.netlify.com/img/press/logos/logomark.png',
    alt: 'Netlify',
  },
];

const WebDesign = (props) => {
  props.toggleHome(false);
  return (
    <div>
      <Helmet>
        <script src={withPrefix('/scripts/lazyload.js')} type="text/javascript" />
      </Helmet>
      <div className="page_banner">
        <img className="banner_image_center" src={web} alt="webBanner"></img>
        <div className="banner_frame">
          <div className="page_banner_box">
            <h1>Web Design</h1>
            <p>A few sites I've built recently. Including this one!</p>
            <div>
              {toolIcons.map((tool) => (
                <img className="toolIcon" src={tool.local ? tool.url : withPrefix(`${tool.url}`)} alt={tool.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="page_content_box">
        <ContentGrid page="webdesign"></ContentGrid>
      </div>
    </div>
  );
};

export default WebDesign;
