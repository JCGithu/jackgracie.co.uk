import React from 'react';
import '../styles/globals.scss';

import clockUpdate from '../modules/projects/notionclock';

export default function NotionClock({ toggleNav }) {

  let timeStyle = {
    fontWeight: 'bold',
    fontSize: '1.8rem',
    lineHeight: '1.8rem',
  };

  let clockStyle = {
    width: '100%',
    overflow: 'hidden',
    padding: '0.5rem',
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'start',
    fontFamily: 'gotham',
    flexDirection: 'column',
    color: 'white',
    lineHeight: '1rem',
  };

  let query = {
    bg = 'rgba(0,0,0,0)',
    align = 'center',
    format = ' ',
  }

  // 24 Hour clock
  let formatCode,
    formatTime = '';

  function styleUpdate(clock, frame, timeText) {
    if (query.bg) frame.style.backgroundColor = query.bg;
    if (query.bghex) frame.style.backgroundColor = `#${query.bghex}`;
    if (query.text) clock.style.color = query.text;
    if (query.texthex) clock.style.color = `#${query.texthex}`;
    if (query.font) clock.style.fontFamily = query.font.replaceAll('_', ' ');
    if (query.format) formatCode = query.format;
    if (query.time) formatTime = query.time;
    if (query.scale) {
      clock.style.fontSize = `${query.scale}rem`;
      clock.style.lineHeight = `${query.scale}rem`;
      timeText.style.fontSize = `${query.scale * 1.8}rem`;
      timeText.style.lineHeight = `${query.scale * 1.8}rem`;
    }
    if (query.align === 'right') {
      clock.style.textAlign = 'right';
      clock.style.justifyContent = 'flex-end';
    }
    if (query.align === 'center') {
      clock.style.textAlign = 'center';
      clock.style.justifyContent = 'center';
    }
    if (query.padding) clock.style.padding = `${query.padding}px`;
    if (query.paddingTop) clock.style.paddingTop = `${query.paddingTop}px`;
    if (query.paddingBottom) clock.style.paddingBottom = `${query.paddingBottom}px`;
    if (query.paddingLeft) clock.style.paddingLeft = `${query.paddingLeft}px`;
    if (query.paddingRight) clock.style.paddingRight = `${query.paddingRight}px`;
    if (query.timePadding) timeText.style.padding = `${query.timePadding}px`;
  }

  let [time, timeReset] = React.useState({ time: '', date: '' });

  React.useEffect(() => {
    toggleNav(false);
    let clock = document.getElementById('clock');
    let frame = document.getElementById('frame');
    let timeText = document.getElementById('time');
    styleUpdate(clock, frame, timeText);
    const timer = setTimeout(() => {
      timeReset(clockUpdate(formatCode, formatTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div id="frame" style={{ height: '100vh', backgroundColor: '#2f3437' }}>
      <div id="clock" style={clockStyle}>
        <span id="time" style={timeStyle}>
          {time.time}
        </span>
        <span id="date">{time.date}</span>
      </div>
    </div>
  );
}
