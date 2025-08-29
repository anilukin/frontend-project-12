import * as Yup from 'yup';

const validationSchema = (channelNames) => {
  return Yup.object().shape({
    name: Yup.string()
      .transform((value) => value.trim())
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });
};

export default validationSchema;
