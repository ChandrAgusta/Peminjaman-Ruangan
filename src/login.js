import React, { useState } from 'react';
import * as api from './utils/constants';
import './loginForm.css'
import Dashboard from './dashboard';

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('../bglogin.png')`,
    backgroundSize: 'cover',
    filter: 'blur(4px)',
  };
  const contentStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    zIndex: 1,
  };

  return (
    <div>
    <div style={backgroundStyle}></div>
    <div className="Auth-form-container" style={contentStyle}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Masukkan password"
            />
          </div>
          <div className="d-grid gap-2 mt-3 mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;