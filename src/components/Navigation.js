import React from 'react';
import { NavLink } from 'react-router-dom';

export default Navigation = () => {
  return (
    <nav>
      <NavLink>
        <p>Rancid Tomatillos</p>   
      </NavLink>
      <NavLink>
        <p>Filter</p>
      </NavLink>
    </nav>
  )
}