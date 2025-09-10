import './App.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { setCredentials } from './Slices/authSlice';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import SignupPage from './Pages/SignupPage';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, username } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      dispatch(
        setCredentials({ username: storedUsername, token: storedToken })
      );
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(setCredentials({ username: null, token: null }));
    navigate('/login');
  };

  return (
    <div className='d-flex flex-column h-100'>
      <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            {t('header.appName')}
          </Link>
          {token && username ? (
            <Button
              className='btn btn-primary'
              type='submit'
              variant='btn-primary'
              onClick={handleLogout}
            >
              {t('buttons.logoutButton')}
            </Button>
          ) : null}
        </div>
      </nav>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
