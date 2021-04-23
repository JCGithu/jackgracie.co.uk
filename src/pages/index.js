import React, { useEffect } from 'react';
import '../styles/globals.scss';
import Layout from '../modules/Layout';
import Helmet from 'react-helmet';

//Modules
import Anime from 'react-animejs-wrapper';

//Components
import SocialList from '../modules/social_icons';
import Backdrop from '../modules/backdrop';

//Tools
import SplitText from '../modules/tools/split-text';

const IndexPage = ({ toggleHome }) => {
  useEffect(() => {
    function windowResize() {
      if (document.getElementById('backdrop')) {
        let backdrop = document.getElementById('backdrop');
        let lott = backdrop.children[0];
        if (window.outerWidth >= window.outerHeight * 1.78) {
          lott.setAttribute('preserveAspectRatio', 'xMinYMid meet');
        } else {
          lott.setAttribute('preserveAspectRatio', 'xMidYMax slice');
        }
        if (backdrop.children[1]) {
          let del = backdrop.children[1];
          backdrop.removeChild(del);
        }
      }
    }

    window.addEventListener('resize', windowResize);
    windowResize();
  });

  toggleHome(true);

  return (
    <div className="home">
      <Helmet>
        <title>Jack Gracie</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Backdrop></Backdrop>
      <div className="titleBox">
        <div className="titleText">
          <h1 className="DMserif">
            <SplitText copy="jack gracie"></SplitText>
          </h1>
          <Anime
            config={{
              width: ['0', '17rem'],
              opacity: [0, 1],
              background: ['white', 'linear-gradient(90deg, #ffffff 30%, #bdbdbd 39%, #ffffff 48% )'],
              easing: 'easeOutCirc',
              duration: 2000,
            }}
          >
            <div className="underline"></div>
          </Anime>
          <p className="mini">contact@jackgracie.co.uk</p>
          <SocialList colour="yellow"></SocialList>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
