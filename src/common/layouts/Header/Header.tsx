import formatDate from 'common/logic/formatDate';
import React, { useState } from 'react';
import Loading from 'react-loading';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import './Header.css';

const Expenses = React.lazy(() => import('features/expenses/Expenses'));
const Category = React.lazy(() => import('features/category/Category'));

const Header = () => {
  const [active, setActive] = useState<number>(0);
  const links = [
    { to: 'expenses/editor', icon: 'plus-circle', text: 'Nhập liệu' },
    { to: `expenses/calendar/${formatDate(new Date())}`, icon: 'calendar', text: 'Lịch' },
    { to: 'expenses/report', icon: 'pie-chart', text: 'Báo cáo' },
    { to: 'other', icon: 'ellipsis-h', text: 'Khác' }
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
        {links.map((link, index) => (
          <Link
            to={link.to}
            className={`nav__link ${active === index ? 'nav-active' : ''}`}
            key={link.text}
            onClick={() => setActive(index)}
          >
            <i className={`fa fa-${link.icon}`} aria-hidden="true"></i>
            <span className="nav__text">{link.text}</span>
          </Link>
        ))}
      </nav>
      {routes}
      <Outlet />
    </>
  );
};

export default Header;
