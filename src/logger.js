const header = (s) => {
  s = s.toString();
  const len = 25;
  const shortname = s.substring(0, len);
  let result = shortname;
  for (let i = 0; i < len - shortname.length; i++)
    result += ' ';
  return `### ${result} :`;
};

export default function consoleLogger(...title) {
  return {
    warn(...args) {
      /* eslint-disable no-console */
      console.warn(header(...title), ...args);
      /* eslint-enable */
    },
    error(...args) {
      /* eslint-disable no-console */
      console.error(header(...title), ...args);
      /* eslint-enable */
    },
    log(...args) {
      /* eslint-disable no-console */
      console.log(header(...title), ...args);
      /* eslint-enable */
    }
  };
}
