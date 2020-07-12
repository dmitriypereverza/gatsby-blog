export function digitOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function phoneIsCorrect(phone: string) {
  return digitOnly(phone).length === 11;
}

export function toWestStyleNumber(str: string, ifNaN?: any) {
  const value = parseFloat(str.replace(/,/g, "."));
  return isNaN(value) ? ifNaN : value;
}
