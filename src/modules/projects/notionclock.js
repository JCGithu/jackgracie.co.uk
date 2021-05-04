function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

function formatAMPM(date) {
  return date.getHours() >= 12 ? 'PM' : 'AM';
}

function clockConvert(hours, double) {
  hours = hours % 12 ? hours - 12 : hours;
  if (double) return hours.toLocaleString('default', { minimumIntegerDigits: 2 });
  return hours;
}

function timeFormatter(formatTime, timeNow) {
  if (!formatTime) formatTime = 'H:mm P';

  const map = {
    h: timeNow.getHours().toLocaleString('default'),
    hh: timeNow.getHours().toLocaleString('default', { minimumIntegerDigits: 2 }),
    H: clockConvert(timeNow.toLocaleString('default', { hour: 'numeric' })),
    HH: clockConvert(timeNow.toLocaleString('default', { hour: '2-digit', minimumIntegerDigits: 2 }), true),
    m: timeNow.getMinutes().toLocaleString('default'),
    mm: timeNow.getMinutes().toLocaleString('default', { minimumIntegerDigits: 2 }),
    s: timeNow.getSeconds().toLocaleString('default'),
    ss: timeNow.getSeconds().toLocaleString('default', { minimumIntegerDigits: 2 }),
    P: formatAMPM(timeNow),
  };

  let finalTime = formatTime.replace(/h(?!h)|h{2}|H(?!H)|H{2}|m(?!m)|m{2}|s(?!s)|s{2}|P/g, (matched) => {
    return map[matched];
  });
  return finalTime;
}

function dateFormatter(formatCode, timeNow) {
  if (!formatCode) formatCode = 'DDD, ds MMM, yyyy';

  const map = {
    m: timeNow.toLocaleString('default', { month: 'numeric' }),
    mm: timeNow.toLocaleString('default', { month: '2-digit' }),
    M: timeNow.toLocaleString('default', { month: 'narrow' }),
    MM: timeNow.toLocaleString('default', { month: 'short' }),
    MMM: timeNow.toLocaleString('default', { month: 'long' }),
    d: timeNow.toLocaleString('default', { day: 'numeric' }),
    dd: timeNow.toLocaleString('default', { day: '2-digit' }),
    ds: ordinal_suffix_of(timeNow.toLocaleString('default', { day: 'numeric' })),
    dds: ordinal_suffix_of(timeNow.toLocaleString('default', { day: '2-digit' })),
    D: timeNow.toLocaleString('default', { weekday: 'narrow' }),
    DD: timeNow.toLocaleString('default', { weekday: 'short' }),
    DDD: timeNow.toLocaleString('default', { weekday: 'long' }),
    yy: timeNow.toLocaleString('default', { year: '2-digit' }),
    yyyy: timeNow.getFullYear(),
  };

  let finalDate = formatCode.replace(
    /m(?!m)|m{2}|M(?!M)|MM(?!M)|M{3}|d(?![ds])|dd{2}(?!s)|(?<!d)ds|dds|D(?!D)|DD(?!D)|D{3}|yy(?!y)|y{4}|_/g,
    (matched) => {
      return map[matched];
    }
  );
  return finalDate;
}

export default function clockUpdate(formatCode, formatTime) {
  let timeNow = new Date();
  let formattedTime = timeFormatter(formatTime, timeNow);
  let formattedDate = dateFormatter(formatCode, timeNow);
  return { time: formattedTime, date: formattedDate };
}
