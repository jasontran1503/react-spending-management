import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import formatDate from 'common/logic/formatDate';
import { removeStorage } from 'common/logic/storage';
import { setToken } from 'common/logic/token';
import React from 'react';
import Loading from 'react-loading';
import { NavLink, Outlet, useNavigate, useRoutes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import './Header.css';

const Expenses = React.lazy(() => import('features/expenses/Expenses'));
const Category = React.lazy(() => import('features/category/Category'));

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const links = [
    { to: 'expenses/editor', icon: 'plus-circle', text: 'Nhập liệu' },
    { to: `expenses/calendar/${formatDate(new Date())}`, icon: 'calendar', text: 'Lịch' },
    { to: 'expenses/report', icon: 'pie-chart', text: 'Báo cáo' }
  ];

  const routes = useRoutes([
    {
      path: 'expenses/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        </React.Suspense>
      )
    },
    {
      path: 'category/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        </React.Suspense>
      )
    }
  ]);

  return (
    <>
      <nav className="nav">
        {links.map((link) => (
          <NavLink
            className={(navData) => (navData.isActive ? 'nav__link nav-active' : 'nav__link')}
            to={link.to}
            key={link.text}
          >
            <i className={`fa fa-${link.icon}`} aria-hidden="true"></i>
            <span className="nav__text">{link.text}</span>
          </NavLink>
        ))}
        <div className="nav__link" onClick={() => setOpen(true)}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          <span className="nav__text">Đăng xuất</span>
        </div>
      </nav>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>Bạn có chắc muốn đăng xuất?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Đóng</Button>
          <Button
            onClick={() => {
              setToken(null);
              removeStorage('token');
              navigate('/auth');
            }}
          >
            Đăng xuất
          </Button>
        </DialogActions>
      </Dialog>
      {routes}
      <Outlet />
    </>
  );
};

export default Header;
