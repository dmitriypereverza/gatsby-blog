import { is } from "ramda";

export type TryTakeErrorFieldType = string | (string | [string, string])[];

export function decodeError(
  errors: { [name: string]: string },
  tryTakeErrorField: TryTakeErrorFieldType,
) {
  if (is(Array, tryTakeErrorField)) {
    for (const field of tryTakeErrorField) {
      if (is(Array, field)) {
        const [fieldName, fieldLabel] = field;
        const fieldValue = errors[fieldName];
        if (fieldValue) return `${fieldLabel}: ${fieldValue}`;
      }
      const fieldValue = errors[field as string];
      if (fieldValue) return fieldValue;
    }
  }
  const fieldValue = errors[tryTakeErrorField as string];
  return fieldValue || null;
}
