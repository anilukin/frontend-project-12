import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
