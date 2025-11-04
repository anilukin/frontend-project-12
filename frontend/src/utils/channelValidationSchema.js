import * as Yup from 'yup'

const validationSchema = (channelNames, t) => {
  return Yup.object().shape({
    name: Yup.string()
      .transform((value) => value.trim())
      .min(3, t('infoMessages.lengthRangeError'))
      .max(20, t('infoMessages.lengthRangeError'))
      .notOneOf(channelNames, t('infoMessages.uniqueNameError'))
      .required(t('infoMessages.requiredFieldError')),
  })
}

export default validationSchema
