import React, { useState } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SocialList from './social_icons';
import JSONData from '../data/pageData.json';

export default function Layout({ children }) {
  const [menuActive, setMenuState] = useState(false);
  const [navBarOn, toggleNav] = useState(true);
  const [home, toggleHome] = useState(false);

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
          {JSONData.map((page) => (
            <Link
              to={page.path}
              key={page.name}
              onClick={() => {
                setMenuState(!menuActive);
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
