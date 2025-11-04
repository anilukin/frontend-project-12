import * as Yup from 'yup'

const validationSchema = t => {
  return Yup.object().shape({
    username: Yup.string()
      .transform(value => value.trim())
      .min(3, t('infoMessages.lengthRangeError'))
      .max(20, t('infoMessages.lengthRangeError'))
      .required(t('infoMessages.requiredFieldError')),
    password: Yup.string()
      .transform(value => value.trim())
      .min(6, t('infoMessages.minLengthError')),
    confirmPassword: Yup.string()
      .required(t('infoMessages.requiredFieldError'))
      .oneOf([Yup.ref('password'), null], t('infoMessages.passwordsMustMatchError')),
  })
}

export default validationSchema
