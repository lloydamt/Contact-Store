import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/authContext";
import AlertContext from "../../contexts/alert/alertContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, login, error, clearError, loadUser } = authContext;
  const { setAlert } = alertContext;

  const navigate = useNavigate();

  const [state, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(state);
  };

  const { email, password } = state;
  return (
    <div className='form-container'>
      <h1 className='text-primary'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onInputChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-lg btn-block bg-primary'
          required
        />
      </form>
    </div>
  );
};

export default Login;
