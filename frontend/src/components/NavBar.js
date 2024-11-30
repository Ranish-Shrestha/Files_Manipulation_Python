import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/files">Files</Link></li>
        <li><Link to="/logs">Activity Logs</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
