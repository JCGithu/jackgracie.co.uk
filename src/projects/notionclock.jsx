import React from 'react';
import '../styles/globals.scss';

import clockUpdate from '../modules/projects/notionclock';

import { useQueryParams, StringParam } from 'use-query-params';

export default function NotionClock({ toggleNav }) {
  const [query, setQuery] = useQueryParams({
    bg: StringParam,
    bghex: StringParam,
    text: StringParam,
    texthex: StringParam,
    align: StringParam,
    format: StringParam,
    time: StringParam,
  });

  let clockStyle = {
    width: '100%',
    overflow: 'hidden',
    padding: '0.5rem',
    display: 'flex',
    textAlign: 'flex-start',
    justifyContent: 'start',
    fontFamily: 'Poppins',
    flexDirection: 'column',
    color: 'white',
    lineHeight: '1.3rem',
  };

  // 24 Hour clock
  let formatCode,
    formatTime = '';

  function styleUpdate(clock, frame) {
    if (query.bg) frame.style.backgroundColor = query.bg;
    if (query.bghex) frame.style.backgroundColor = `#${query.bghex}`;
    if (query.text) clock.style.color = query.text;
    if (query.texthex) clock.style.color = `#${query.texthex}`;
    if (query.format) formatCode = query.format;
    if (query.time) formatTime = query.time;
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
    styleUpdate(clock, frame);
    const timer = setTimeout(() => {
      timeReset(clockUpdate(formatCode, formatTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div id="frame" style={{ height: '100vh', backgroundColor: '#2f3437' }}>
      <div id="clock" style={clockStyle}>
        <span id="time" style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
          {time.time}
        </span>
        <span id="date">{time.date}</span>
      </div>
    </div>
  );
}
