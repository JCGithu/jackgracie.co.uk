import * as React from 'react';
import '../styles/globals.scss';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import ContentGrid from '../modules/contentGrid';

import bannerImage from '../images/videoBanner.jpg';

const toolIcons = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg', alt: 'aftereffects' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg', alt: 'premiere' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Audition_CC_icon_%282020%29.svg', alt: 'audition' },
  {
    url:
      'https://1.bp.blogspot.com/-XozOmc9zS8k/X0-wbx5WJiI/AAAAAAAAZeQ/5cbw56AA0kYHSSIfqA_7wI7TsUNrbYBNACLcBGAsYHQ/s1600/iZotope%2BRX%2B8%2BAdvanced%2BFull%2Bversion.png',
    alt: 'izotope',
  },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Ableton_Live_logo.png', alt: 'ableton' },
];

const Video = () => {
  return (
    <div>
      <Helmet>
        <script src={withPrefix('/scripts/lazyload.js')} type="text/javascript" />
      </Helmet>
      <div className="page_banner">
        <img className="banner_image_top" src={bannerImage} alt="videoBanner"></img>
        <div className="banner_frame">
          <div className="page_banner_box">
            <h1>Video</h1>
            <p>
              Here are a some projects I've produced, shot, or edited. <br /> Details are included in the individual
              project cards.
            </p>
            <div>
              {toolIcons.map((tool) => (
                <img className="toolIcon" src={tool.url} alt={tool.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="page_content_box">
        <ContentGrid page="video"></ContentGrid>
      </div>
    </div>
  );
};

export default Video;
