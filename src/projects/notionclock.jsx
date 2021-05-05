import React from 'react';
import '../styles/globals.scss';

import clockUpdate from '../modules/projects/notionclock';

import { useQueryParams, StringParam, NumberParam } from 'use-query-params';

export default function NotionClock({ toggleNav }) {
  const [query, setQuery] = useQueryParams({
    bg: StringParam,
    bghex: StringParam,
    text: StringParam,
    texthex: StringParam,
    align: StringParam,
    format: StringParam,
    time: StringParam,
    scale: NumberParam,
  });

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
    fontFamily: 'Poppins',
    flexDirection: 'column',
    color: 'white',
    lineHeight: '1rem',
  };

  // 24 Hour clock
  let formatCode,
    formatTime = '';

  function styleUpdate(clock, frame, timeText) {
    if (query.bg) frame.style.backgroundColor = query.bg;
    if (query.bghex) frame.style.backgroundColor = `#${query.bghex}`;
    if (query.text) clock.style.color = query.text;
    if (query.texthex) clock.style.color = `#${query.texthex}`;
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
