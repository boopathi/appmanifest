const header = s => {
  const len = 20;
  const shortname = s.substring(0, len);
  let result = shortname;
  for (let i = 0; i < len - shortname.length; i++)
    result += ' ';
  return `### ${result} :`;
};

export default function consoleLogger(title) {
  return {
    warn(...args) {
      console.warn(header(title), ...args);
    },
    error(...args) {
      console.error(header(title), ...args);
    },
    log(...args) {
      console.log(header(title), ...args);
    },
  };
}
