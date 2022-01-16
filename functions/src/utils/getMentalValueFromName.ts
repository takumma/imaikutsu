// Get the mental value from the end of the name.
export const getMentalValueFromName = (name: string | null): number | null => {
  if (name === null) return null;

  const doubleDigit = Number(name.slice(-2));
  const singleDigit = Number(name.slice(-1));

  if (isNaN(doubleDigit)) {
    if (!isNaN(singleDigit)) return singleDigit;
    else return null;
  } else {
    if (doubleDigit > 10) return singleDigit;
    else return doubleDigit;
  }
};
