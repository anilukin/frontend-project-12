import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { setCredentials } from '../Slices/authSlice'
import validationSchema from '../utils/registerValidationSchema'
import routes from '../utils/routes'

const SignupPage = () => {
  const dispatcher = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  const [registrationFailed, setRegistrationFailed] = useState(false)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async values => {
      setRegistrationFailed(false)
      try {
        const { username, password } = values
        const response = await axios.post(routes.signupPath(), {
          username,
          password,
        })
        if (response.status === 201) {
          const { username, token } = response.data
          dispatcher(
            setCredentials({
              username,
              token,
            }),
          )
          localStorage.setItem('token', token)
          localStorage.setItem('username', username)
          navigate('/')
        } else {
          setRegistrationFailed(true)
        }
      } catch (err) {
        if (err.isAxiosError) {
          if (err.response.status === 409) {
            setRegistrationFailed(true)
            inputRef.current.select()
            return
          }
        }
        throw err
      }
    },
  })
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="/avatar_1.jpg"
                    className="rounded-circle"
                    alt={t('signupPage.signupPageTitle')}
                  />
                </div>
                <Form
                  onSubmit={formik.handleSubmit}
                  className="col-12 col-md-6 mt-3 mt-md-0"
                >
                  <h1 className="text-center mb-4">{t('signupPage.signupPageTitle')}</h1>
                  <fieldset>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={e => {
                          setRegistrationFailed(false)
                          formik.handleChange(e)
                        }}
                        value={formik.values.username}
                        placeholder="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={
                          (formik.touched.username
                            && !!formik.errors.username)
                          || registrationFailed
                        }
                        required
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">
                        {t('signupPage.newUserName')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username
                          || (registrationFailed
                            && t('infoMessages.userExistError'))}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={e => {
                          setRegistrationFailed(false)
                          formik.handleChange(e)
                        }}
                        value={formik.values.password}
                        placeholder="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={
                          (formik.touched.password
                            && !!formik.errors.password)
                          || registrationFailed
                        }
                        required
                      />
                      <Form.Label htmlFor="password">{t('signupPage.newUserPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={e => {
                          setRegistrationFailed(false)
                          formik.handleChange(e)
                        }}
                        value={formik.values.confirmPassword}
                        placeholder="confirmPassword"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="current-password"
                        isInvalid={
                          (formik.touched.confirmPassword
                            && !!formik.errors.confirmPassword)
                          || registrationFailed
                        }
                        required
                      />
                      <Form.Label htmlFor="confirmPassword">
                        {t('signupPage.confirmNewUserPassword')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      className="w-100 mb-3 btn btn-outline-primary"
                      type="submit"
                      variant="outline-primary"
                    >
                      {t('buttons.registrationButton')}
                    </Button>
                  </fieldset>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
