export function parseMass(mass: string | undefined): number {
  if (!mass || mass === 'unknown') {
    return 0;
  }

  const numericValue = parseFloat(mass.replace(/,/g, ''));
  return isNaN(numericValue) ? 0 : numericValue;
}
