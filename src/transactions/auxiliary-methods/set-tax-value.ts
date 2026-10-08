export function setTaxValue(installment: number) {
  let tax;
  if (installment >= 7) tax = 3.99; // 7 ou mais
  else if (installment >= 2) tax = 3.49; // 2 - 6
  else tax = 2.99; // 1

  return tax;
}
