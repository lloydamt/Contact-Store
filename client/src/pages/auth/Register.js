import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import AlertContext from "../../contexts/alert/alertContext";

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { registerUser, error, isAuthenticated, loading, clearError } =
    authContext;
  const { setAlert } = alertContext;

  const [state, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }

    if (isAuthenticated & !loading) {
      navigate("/");
    }
  }, [error, isAuthenticated, loading]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      registerUser(state);
    }
  };

  const { name, email, password, confirmPassword } = state;
  return (
    <div className='container'>
      <div className='form-container'>
        <h1>
          <span className='text-primary'>Register</span> User
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              minLength='6'
              required
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='btn btn-lg btn-block bg-dark-grey'
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
