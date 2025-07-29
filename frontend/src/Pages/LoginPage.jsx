import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <label htmlFor="login">Ваш ник</label>
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />

          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </fieldset>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginPage