/**
 * Check if a string is a valid number
 * allows empty strings
 */
export function isNumeric(n: string) {
  const regex = /^[0-9]*\.?[0-9]*$/g;

  return regex.test(n);
}
