import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../Slices/authSlice';

const LoginPage = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [authFailed, setAuthFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post('/api/v1/login', values);
        if (response.status === 200) {
          const { username, token } = response.data;
          dispatcher(
            setCredentials({
              username,
              token,
            })
          );
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          navigate('/');
        } else {
          setAuthFailed(true);
        }
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className='d-flex flex-column h-100'>
      <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
          <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card shadow-sm'>
              <div className='card-body row p-5'>
                <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                  <img
                    src='/avatar.jpg'
                    className='rounded-circle'
                    alt={t('loginPage.loginPageTitle')}
                  />
                </div>
                <Form
                  onSubmit={formik.handleSubmit}
                  className='col-12 col-md-6 mt-3 mt-md-0'
                >
                  <h1 className='text-center mb-4'>{t('loginPage.loginPageTitle')}</h1>
                  <fieldset>
                    <Form.Group className='form-floating mb-3'>
                      <Form.Control
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder='username'
                        name='username'
                        id='username'
                        autoComplete='username'
                        isInvalid={authFailed}
                        required
                        ref={inputRef}
                      />
                      <Form.Label htmlFor='username'>{t('loginPage.userName')}</Form.Label>
                    </Form.Group>
                    <Form.Group className='form-floating mb-4'>
                      <Form.Control
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='password'
                        name='password'
                        id='password'
                        autoComplete='current-password'
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor='password'>{t('loginPage.password')}</Form.Label>
                      <Form.Control.Feedback type='invalid'>
                        {t('errorMessages.loginError')}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      className='w-100 mb-3 btn btn-outline-primary'
                      type='submit'
                      variant='outline-primary'
                    >
                      {t('buttons.loginButton')}
                    </Button>
                  </fieldset>
                </Form>
              </div>
              <div className='card-footer p-4'>
                <div className='text-center'>
                  <span>{t('loginPage.noAccount')}</span> <a href='/signup'>{t('loginPage.goSignup')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
