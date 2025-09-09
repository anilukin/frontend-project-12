import * as Yup from 'yup';

const validationSchema = (channelNames, t) => {
  return Yup.object().shape({
    name: Yup.string()
      .transform((value) => value.trim())
      .min(3, t('errorMessages.lengthRangeError'))
      .max(20, t('errorMessages.lengthRangeError'))
      .notOneOf(channelNames, t('errorMessages.uniqueNameError'))
      .required(t('errorMessages.requiredFieldError')),
  });
};

export default validationSchema;
