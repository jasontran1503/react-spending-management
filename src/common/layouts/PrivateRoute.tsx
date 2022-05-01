import { getStorage } from 'common/logic/storage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = getStorage('token');

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
