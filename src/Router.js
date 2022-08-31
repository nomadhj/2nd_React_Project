import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import MainRouter from './MainRouter';
import { AuthContextProvider } from './context/AuthContext';

const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainRouter />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default Router;
