import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import styles from './Header.module.scss';

const Header = () => (
	<header>
	  <Link to={ROUTES.HOME}><img src="./leveler-logo-reduced.png" alt="Logo img" /></Link>
	  <p className={styles.top}>the admin panel</p>
    <ul className={styles.sections}>
      <li><Link to={ROUTES.HOME}>home</Link></li>
      <li><Link to={ROUTES.EDIT}>manage users</Link></li>
	  <li><Link to={ROUTES.RESOURCES}>manage resources</Link></li>
    </ul>
	</header>
)
export default Header;