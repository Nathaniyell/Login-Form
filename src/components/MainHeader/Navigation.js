import React,{ useContext } from 'react';
import AuthContext from '../contextStore/auth-context'
import classes from './Navigation.module.css';

const Navigation = () => {
  const cntxt = useContext(AuthContext)
  return (
    <nav className={classes.nav}>
      <ul>
        {cntxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cntxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cntxt.isLoggedIn && (
          <li>
            <button onClick={cntxt.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
