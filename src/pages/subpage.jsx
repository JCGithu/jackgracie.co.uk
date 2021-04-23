import * as React from 'react';
import '../styles/globals.scss';
import Helmet from 'react-helmet';
import { withPrefix, graphql } from 'gatsby';
import Img from 'gatsby-image';
import ContentGrid from '../modules/contentGrid';

export const data = graphql`
  query pageQuery($name: String!) {
    allPageDataJson {
      edges {
        node(name: { eq: $name }) {
          name
          path
          posts {
            video
            title
            subtitle
            description
            client
            accent
            poster {
              childImageSharp {
                resize(width: 260) {
                  src
                }
                original {
                  src
                }
              }
            }
            feature {
              url
              video
              embed
              image {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
            tools {
              alt
              url
            }
            links {
              text
              url
            }
          }
        }
      }
    }
  }
`;

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

const Subpage = ({ data }) => {
  let page = data.data.allPageDataJson.edges.node;

  return (
    <div>
      <Helmet>
        <script src={withPrefix('/scripts/lazyload.js')} type="text/javascript" />
      </Helmet>
      <div className="page_banner">
        <Img fluid={data.fl}></Img>
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

export default Subpage;
