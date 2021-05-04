import * as React from 'react';
import '../styles/globals.scss';
import { graphql } from 'gatsby';
import ContentGrid from '../modules/contentGrid';
import toolList from '../data/tools.json';
import lazyLoad from '../modules/tools/lazyload';

const isBrowser = typeof window !== 'undefined';

export const query = graphql`
  query($name: String!) {
    allPageDataJson(filter: { name: { eq: $name } }) {
      edges {
        node {
          name
          path
          description
          tools
          posts {
            accent
            client
            description
            feature {
              embed
              url
              video
              image {
                childImageSharp {
                  original {
                    src
                  }
                }
              }
            }
            links {
              text
              url
            }
            video
            tools
            subtitle
            title
            poster {
              childImageSharp {
                original {
                  src
                }
                resize {
                  src
                }
              }
            }
          }
          banner {
            position
            alt
            fit
            url {
              publicURL
            }
          }
        }
      }
    }
  }
`;

const Subpage = ({ data, toggleHome }) => {
  React.useEffect(() => {
    toggleHome(false);
  });
  let page = data.allPageDataJson.edges[0].node;
  if (isBrowser) lazyLoad();

  return (
    <div className="subpage_holder">
      <div className="page_banner">
        {page.banner.map((b) => {
          let classAdd = 'banner_image';
          console.log(b);
          classAdd = b.position ? classAdd + ` b_${b.position}` : classAdd;
          classAdd = b.fit ? classAdd + ` ${b.fit}` : classAdd;
          return <img src={b.url.publicURL} className={`${classAdd}`} alt={b.alt} key={b.alt} />;
        })}
        <div className="banner_frame">
          <div className="page_banner_box">
            <h1>{page.name}</h1>
            {page.description && (
              <section className="description" dangerouslySetInnerHTML={{ __html: page.description }} />
            )}
            <div>
              {page.tools &&
                page.tools.map((tool) => <img className="toolIcon" src={toolList[tool]} alt={tool} key={tool} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="page_content_box">
        <ContentGrid data={page}></ContentGrid>
      </div>
    </div>
  );
};

export default Subpage;
