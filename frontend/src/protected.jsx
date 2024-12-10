import { Navigate } from 'react-router-dom';
import { UseAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children; 
};

export default ProtectedRoute;
