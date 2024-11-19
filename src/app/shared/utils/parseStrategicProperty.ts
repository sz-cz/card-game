export function parseStrategicProperty(property: string | undefined): number {
  if (!property || property === 'unknown') {
    return 0;
  }

  const numericValue = parseFloat(property.replace(/,/g, ''));
  return isNaN(numericValue) ? 0 : numericValue;
}
