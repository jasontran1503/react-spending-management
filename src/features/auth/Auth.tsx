import { Navigate, useRoutes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const Auth = () => {
  const routes = useRoutes([
    {
      path: '',
      element: <Navigate to="login" />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    }
  ]);

  return <>{routes}</>;
}

export default Auth;