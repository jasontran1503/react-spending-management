import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState<number>(0);
  const routes = [
    { to: 'editor', icon: 'plus-circle', text: 'Nhập liệu' },
    { to: 'calendar', icon: 'calendar', text: 'Lịch' },
    { to: 'report', icon: 'pie-chart', text: 'Báo cáo' },
    { to: 'other', icon: 'ellipsis-h', text: 'Khác' }
  ];

  return (
    <nav className="nav">
      {routes.map((route, index) => (
        <Link
          to={route.to}
          className={`nav__link ${active === index ? 'nav-active' : ''}`}
          key={route.text}
          onClick={() => setActive(index)}
        >
          <i className={`fa fa-${route.icon}`} aria-hidden="true"></i>
          <span className="nav__text">{route.text}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Header;
