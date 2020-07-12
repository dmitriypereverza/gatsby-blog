import { FormikProps } from "formik";
import { curry } from "ramda";

export const formikSetterAutoSubmit = curry(function (
  propName: string,
  formikProps: FormikProps<any>,
  value,
) {
  formikProps.setFieldValue(propName, value);
  return new Promise((resolve) => {
    setTimeout(() => {
      formikProps.submitForm().then(resolve);
    }, 1);
  });
});
