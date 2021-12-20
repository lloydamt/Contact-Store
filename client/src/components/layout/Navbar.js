import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ name, icon }) => {
  return (
    <nav className='navbar bg-primary'>
      <h2>
        <i className={icon}></i> {name}
      </h2>
      <ul>
        <li className='p-1'>
          <Link to='/'>Home</Link>
        </li>
        <li className='p-1'>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  name: "Contact Store",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
