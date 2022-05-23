// Get the mental value from the end of the name.
export const getMentalValueFromName = (name: string | null): number | null => {
  if (name === null) return null;

  const numStr = name.replace(/[^0-9]/g, "");

  const mentalValue = Number(numStr);

  if (mentalValue < 1) return null;

  if (mentalValue > 10) {
    const num = mentalValue % 10;
    if (num === 0) return null;
    return num;
  }

  return mentalValue;
};
