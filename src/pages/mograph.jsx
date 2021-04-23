import * as React from 'react';
import '../styles/globals.scss';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import ContentGrid from '../modules/contentGrid';

import foreground from '../images/motion_foreground.png';
import colin from '../images/colin.svg';

const toolIcons = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg', alt: 'aftereffects' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', alt: 'photoshop' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg', alt: 'illustrator' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg', alt: 'premiere' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg', alt: 'blender' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/d/d8/C4D_Logo.png', alt: 'cinema4d' },
];

const MotionGraphics = () => {
  return (
    <div>
      <Helmet>
        <script src={withPrefix('/scripts/lazyload.js')} type="text/javascript" />
      </Helmet>
      <div className="page_banner">
        <img className="banner_image_bottom" src={foreground} alt="banner foreground"></img>
        <img className="banner_image_bottom" src={colin} alt="Colin"></img>
        <div className="banner_frame">
          <div className="page_banner_box">
            <h1>Motion Graphics</h1>
            <p>
              Here are a few highlights from my work for brands <br /> such as Headspace, ViewRanger, and Metro.co.uk
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
        <ContentGrid page="mograph"></ContentGrid>
      </div>
    </div>
  );
};

export default MotionGraphics;
