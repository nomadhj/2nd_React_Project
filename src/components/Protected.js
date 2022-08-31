import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Protected = ({ children }) => {
  const context = useContext(AuthContext);
  const { isLoggedIn } = context;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
