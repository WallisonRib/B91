export function setFinalValue(value: number, tax: number) {
  return value - value * tax * 0.01;
}
