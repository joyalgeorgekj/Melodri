export const formatForFFmpeg = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);

  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  const ms = String(Math.floor((seconds % 1) * 1000)).padStart(3, "0");

  return `${hh}:${mm}:${ss}.${ms}`;
};
