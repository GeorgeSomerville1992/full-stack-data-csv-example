export const formatTotal = (value: number) => {
  return Math.abs(Number(value)) >= 1.0e+9 ? Math.abs(Number(value)) / 1.0e+9 + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(value)) >= 1.0e+6

  ? Math.abs(Number(value)) / 1.0e+6 + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(value)) >= 1.0e+3

  ? Math.abs(Number(value)) / 1.0e+3 + "K"

  : Math.abs(value);
}