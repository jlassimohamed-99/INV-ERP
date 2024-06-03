import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleBasedRedirect = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      switch (currentUser.role) {
      
        case 'responsable rh':
          navigate('/hr');
          break;
        case 'chef de projet':
          navigate('/project');
          break;
        case 'comptable':
          navigate('/finance');
          break;
        case 'employee':
          navigate('/employee');
          break;
        default:
          navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return null;
};

export default RoleBasedRedirect;
