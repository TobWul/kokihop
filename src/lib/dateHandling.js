// Turns 1 --> 01
export const leadingZero = (s) => {
  return ("0" + s).slice(-2);
};

// Check if two dates are the same day
export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const getTimestamp = (prevUpdate) => {
  // Returns the format 12:42
  const time =
    leadingZero(prevUpdate.getHours()) +
    ":" +
    leadingZero(prevUpdate.getMinutes());
  // Returns the format 24.04.20
  const date = `${leadingZero(prevUpdate.getDate())}.${leadingZero(
    prevUpdate.getMonth() + 1
  )}.${leadingZero(prevUpdate.getYear())}`;
  // If dates are the same date, print time instead of date.
  if (datesAreOnSameDay(prevUpdate, new Date())) {
    return `i dag kl. ${time}`;
  } else {
    return date;
  }
};
