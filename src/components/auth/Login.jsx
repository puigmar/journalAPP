import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { startCustomLogin, startGoogleLogin } from "../../actions/auth.actions";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  const [formValues, handleInputChanges] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startCustomLogin(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <div className='block pb-0'>
        <h3 className='auth__title'>Login</h3>
      </div>
      <form onSubmit={handleLogin}>
        <div className='block'>
          <input
            type='text'
            placeholder='email'
            name='email'
            className='auth__input'
            autoComplete='false'
            value={email}
            onChange={handleInputChanges}
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            className='auth__input'
            autoComplete='false'
            value={password}
            onChange={handleInputChanges}
          />
          <button
            disabled={loading}
            type='submit'
            className='btn btn-primary mt-1'>
            Login
          </button>
        </div>
        <div className='block block--high-light'>
          <div className='auth__social-networks mb-5'>
            <p>Login with social networks</p>
            <div className='google-btn' onClick={handleGoogleLogin}>
              <div className='google-icon-wrapper'>
                <img
                  className='google-icon'
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='google button'
                />
              </div>
              <p className='btn-text'>
                <b>Sign in with google</b>
              </p>
            </div>
          </div>
          <Link className='link' to='/auth/register'>
            Create new account
          </Link>
        </div>
      </form>
    </>
  );
};
