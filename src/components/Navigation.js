import React from 'react';
import { NavLink } from 'react-router-dom';
import rancidTomato from '../assets/rancidTomatillo.png';
import '../styles/Navigation.scss';

const Navigation = () => {
  return (
    <nav className="navBar">
      <NavLink to='/'>
        <img className='logo' src={rancidTomato} height='50px' width='50px'/>   
      </NavLink>
    </nav>
  )
}

export default Navigation;