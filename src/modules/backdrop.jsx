//import Lottie from 'lottie-react';
import lottie from 'lottie-web';
import backdrop from '../lottie/backdrop.json';
import React, { useEffect } from 'react';

const Backdrop = () => {
  let animationContainer = React.createRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      animationData: backdrop,
    });
  });

  return <div id="backdrop" ref={animationContainer} className="backdrop" />;
};
export default Backdrop;
