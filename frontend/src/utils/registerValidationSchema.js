import * as Yup from 'yup';

const validationSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .transform((value) => value.trim())
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .transform((value) => value.trim())
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });
};

export default validationSchema;
