import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import your AuthContext

const useAuth = () => {
  const { dispatch, currentUser } = useContext(AuthContext); // Get dispatch and currentUser from AuthContext
  const location = useLocation();
  const navigate = useNavigate();
  const userId = currentUser ? currentUser.userId : null; // Directly retrieve userId from currentUser

  useEffect(() => {
    console.log("Current user in useAuth:", currentUser); // Log the current user for debugging
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/'); // Redirect authenticated users away from login/register
    }
  }, [currentUser, location, navigate]);

  return { userId }; 
};

export default useAuth;
