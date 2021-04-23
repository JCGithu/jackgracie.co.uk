import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SocialList from './social_icons';

export const query = graphql(`
  {
    allPageDataJson {
      edges {
        name
        path
      }
    }
  }
`);

const menuItems = [
  { url: '/video', name: 'Video' },
  { url: '/mograph', name: 'Motion Graphics' },
  { url: '/webdesign', name: 'Web Design' },
  { url: '/audio', name: 'Audio' },
  { url: '/photography', name: 'Photography' },
  { url: '/projects', name: 'Other Projects' },
];

export default function Layout({ children, data }) {
  const [menuActive, setMenuState] = useState(false);
  const [navBarOn, toggleNav] = useState(true);
  const [home, toggleHome] = useState(false);

  let menu_items = data.data.allPageJson.edges;

  const childrenWithProps = React.Children.map(children, (child, i) =>
    React.cloneElement(child, { toggleNav: toggleNav, toggleHome: toggleHome })
  );

  return (
    <div>
      {navBarOn && (
        <div className={home ? 'navBar' : 'navBar navBar_black'}>
          <Link to="/">
            <button
              className="monogram"
              onClick={() => {
                setMenuState(false);
              }}
            >
              jg
            </button>
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            id="hamburger"
            className="hamburger"
            onClick={() => {
              setMenuState(!menuActive);
            }}
          />
        </div>
      )}
      <div id="menu" className={menuActive ? 'menu__on' : ''}>
        <div className="menu_inner">
          {menu_items.map((page) => (
            <Link
              to={page.path}
              key={page.name}
              onClick={() => {
                setMenuState(!menuActive);
                toggleHome(false);
              }}
            >
              <li className="menu_item" key={page.url}>
                {page.name}
              </li>
            </Link>
          ))}
          <SocialList colour="maroon"></SocialList>
        </div>
      </div>
      {childrenWithProps}
    </div>
  );
}
