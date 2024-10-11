import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [cookies, setCookies, removeCookies] = useCookies(['authToken']);
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.authToken) {
      try {
        const decoded = jwtDecode(cookies.authToken);
        const userId = decoded[Object.keys(decoded).find(key => key.includes("nameidentifier"))];
        setUserId(userId);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [cookies.authToken]);

  useEffect(() => {
    if (cookies.authToken && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/');
    }
  }, [cookies, location, navigate]);

  return { cookies, setCookies, removeCookies, userId };
};

export default useAuth;
