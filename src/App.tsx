import { useAppDispatch } from 'app/hooks';
import { getStorage } from 'common/logic/storage';
import { setToken } from 'common/logic/token';
import { authActions } from 'features/auth/authSlice';
import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

const Auth = React.lazy(() => import('./features/auth/Auth'));
const Header = React.lazy(() => import('./common/layouts/Header/Header'));
const NotFound = React.lazy(() => import('./common/layouts/NotFound/NotFound'));

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const routes = useRoutes([
    {
      path: 'auth/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Auth />
        </React.Suspense>
      )
    },
    {
      path: '/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Header />
        </React.Suspense>
      )
    },
    {
      path: '404',
      element: (
        <React.Suspense fallback={<Loading />}>
          <NotFound />
        </React.Suspense>
      )
    },
    {
      path: '*',
      element: <Navigate to="404"></Navigate>
    }
  ]);

  useEffect(() => {
    const token = getStorage('token');

    if (token) {
      setToken(token);
      dispatch(authActions.getCurrentUserBegin());
      navigate('/expenses');
    } else {
      dispatch(authActions.logout());
      navigate('/auth');
    }
  }, []);

  return (
    <div className="app">
      <div className="wrapper">
        {routes}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
