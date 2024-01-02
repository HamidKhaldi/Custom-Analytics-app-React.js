import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import livePath from '../../hooks/usePathString';
import './Navbar.scss';

const Navbar = ({adminUser}) => {
  const livePathNav = livePath();

  useEffect(()=>{
    console.log('adminUser in navbar', adminUser);
  }, [adminUser]);

  return (
    <ul className='navbar-list'>
      <li><Link to={`${livePathNav}`} >Home</Link></li>
      <li><Link to={`${livePathNav}/about`} >About</Link></li>
      <li><Link to={`${livePathNav}/contact`} >Contact Us</Link></li>
     { adminUser && <li><Link to={`${livePathNav}/analytics-page`} >Analytics</Link></li> } 
    </ul>
  );
};
export default Navbar;
