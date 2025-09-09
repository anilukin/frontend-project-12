import * as Yup from 'yup';

const validationSchema = (t) => {
  return Yup.object().shape({
    username: Yup.string()
      .transform((value) => value.trim())
      .min(3, t('errorMessages.lengthRangeError'))
      .max(20, t('errorMessages.lengthRangeError'))
      .required(t('errorMessages.requiredFieldError')),
    password: Yup.string()
      .transform((value) => value.trim())
      .min(6, t('errorMessages.minLengthError')),
    confirmPassword: Yup.string()
      .required(t('errorMessages.requiredFieldError'))
      .oneOf([Yup.ref('password'), null], t('errorMessages.passwordsMustMatchError')),
  });
};

export default validationSchema;
