function ordinal_suffix_of(i: number) {
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

function formatAMPM(date: Date) {
  return date.getHours() >= 12 ? 'PM' : 'AM';
}
function formatEmoji(date: Date) {
  if (date.getHours() > 19 || date.getHours() < 5) {
    return '🌙';
  }
  return '☀️';
}

function clockConvert(hours: number, double?: boolean) {
  hours = hours > 12 ? hours - 12 : hours;
  if (double) return hours.toLocaleString('default', { minimumIntegerDigits: 2 });
  return hours;
}

function timeFormatter(formatTime: string, timeNow: Date) {
  const map: Record<string, string | number> = {
    h: timeNow.getHours().toLocaleString('default'),
    hh: timeNow.getHours().toLocaleString('default', { minimumIntegerDigits: 2 }),
    H: clockConvert(parseInt(timeNow.toLocaleString('default', { hour: 'numeric' }).replace(/\D/g, ''))),
    HH: clockConvert(parseInt(timeNow.toLocaleString('default', { hour: '2-digit' }).replace(/\D/g, '')), true),
    m: timeNow.getMinutes().toLocaleString('default'),
    mm: timeNow.getMinutes().toLocaleString('default', { minimumIntegerDigits: 2 }),
    s: timeNow.getSeconds().toLocaleString('default'),
    ss: timeNow.getSeconds().toLocaleString('default', { minimumIntegerDigits: 2 }),
    P: formatAMPM(timeNow),
    E: formatEmoji(timeNow),
  };

  let finalTime = formatTime.replace(/h(?!h)|h{2}|H(?!H)|H{2}|m(?!m)|m{2}|s(?!s)|s{2}|P|E/g, (matched) => {
    return map[matched]?.toString() || matched;
  });
  return finalTime;
}

function dateFormatter(formatCode: string, timeNow: Date) {
  const map: Record<string, string | number> = {
    m: timeNow.toLocaleString('default', { month: 'numeric' }),
    mm: timeNow.toLocaleString('default', { month: '2-digit' }),
    M: timeNow.toLocaleString('default', { month: 'narrow' }),
    MM: timeNow.toLocaleString('default', { month: 'short' }),
    MMM: timeNow.toLocaleString('default', { month: 'long' }),
    d: timeNow.toLocaleString('default', { day: 'numeric' }),
    dd: timeNow.toLocaleString('default', { day: '2-digit' }),
    ds: ordinal_suffix_of(parseInt(timeNow.toLocaleString('default', { day: 'numeric' }))),
    dds: ordinal_suffix_of(parseInt(timeNow.toLocaleString('default', { day: '2-digit' }))),
    D: timeNow.toLocaleString('default', { weekday: 'narrow' }),
    DD: timeNow.toLocaleString('default', { weekday: 'short' }),
    DDD: timeNow.toLocaleString('default', { weekday: 'long' }),
    yy: timeNow.toLocaleString('default', { year: '2-digit' }),
    yyyy: timeNow.getFullYear(),
    E: formatEmoji(timeNow),
  };

  let finalDate = formatCode.replace(
    /m(?!m)|m{2}|M(?!M)|MM(?!M)|M{3}|d(?![ds])|dd{2}(?!s)|(?<!d)ds|dds|D(?!D)|DD(?!D)|D{3}|yy(?!y)|y{4}|E/g,
    (matched: string) => {
      return map[matched]?.toString() || matched;
    }
  );
  return finalDate;
}

export default function clockUpdate(formatCode: string, formatTime: string) {
  let timeNow = new Date();
  let formattedTime = timeFormatter(formatTime, timeNow);
  let formattedDate = dateFormatter(formatCode, timeNow);
  return { time: formattedTime, date: formattedDate };
}

