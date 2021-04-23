import React from 'react';
import Anime from 'react-animejs-wrapper';

export default function splitText(props) {
  return (
    <Anime
      config={{
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 2250,
        delay: (_, i) => 150 * (i + 1),
      }}
    >
      {props.copy.split('').map(function (char, index) {
        return (
          <span aria-hidden="true" key={index}>
            {char}
          </span>
        );
      })}
    </Anime>
  );
}
