import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import ContactContext from "../../contexts/contacts/contactContext";

const Navbar = ({ name, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
  const contactContext = useContext(ContactContext);
  const { emptyContacts } = contactContext;

  const onLogout = () => {
    emptyContacts();
    logout();
  };

  return (
    <nav className='navbar bg-primary'>
      <h2>
        <i className={icon}></i> {name}
      </h2>
      {isAuthenticated ? (
        <ul>
          <li className='p-1'>Hello {user && `${user.name}`}</li>
          <li className='p-1'>
            <Link to='/login' onClick={onLogout}>
              <i className='fas fa-sign-out-alt'></i> Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li className='p-1'>
            <Link to='/register'>Register</Link>
          </li>
          <li className='p-1'>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

Navbar.defaultProps = {
  name: "Contact Store",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
