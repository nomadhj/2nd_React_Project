import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode = location.search.split('=')[1].split('&')[0];

  useEffect(() => {
    fetch(
      `http://52.15.84.15:8000/users/signin/naver/callback?code=${authorizationCode}&state=${process.env.REACT_APP_STATE} `,
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(result => {
        localStorage.setItem('token', result.token);
        navigate('/');
      });
  }, [authorizationCode]);
};

export default NaverCallback;
