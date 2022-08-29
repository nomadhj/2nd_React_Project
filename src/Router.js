import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import MainRouter from './MainRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
