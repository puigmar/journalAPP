import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegister } from "../../actions/auth.actions";
import { setError, unsetError } from "../../actions/ui.actions";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange, reset, disableButton] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      reset();
      dispatch(startRegister(email, password, name));
    }
  };

  const existError = (field) => msgError[field];

  const errors = {
    name: {
      validation: name.trim().length === 0,
      error: "Name is required",
    },
    email: {
      validation: email.trim().length === 0 || !validator.isEmail(email),
      error: "Email in not valid",
    },
    password: {
      validation: password.length < 6,
      error: "Password should be at least 6 characthers",
    },
    confirmPassword: {
      validation: confirmPassword !== password || confirmPassword.length < 6,
      error: "Password and Confirmation have to match",
    },
  };

  const isFormValid = (field) => {
    if (field) {
      if (errors[field].validation) {
        dispatch(setError(`${field}`, errors[field].error));
      } else {
        dispatch(unsetError(`${field}`));
      }
    }

    if (!field && Object.keys(msgError).length === 0) {
      dispatch(unsetError());
      return true;
    }
  };

  const handleFieldError = (field, msgErrors = []) => {
    const labelErrors = Object.keys(msgErrors);
    const existError = labelErrors.find((error) => error === field);
    return existError ? "isError" : "";
  };

  return (
    <>
      <div className='block pb-0'>
        <h3 className='auth__title'>Register</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='block'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='name'
              name='name'
              className={`auth__input ${handleFieldError("name", msgError)}`}
              onChange={handleInputChange}
              onBlur={() => isFormValid("name")}
              value={name}
            />
            {existError("name") && (
              <div className='auth__alert-error'>{msgError["name"]}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='email'
              name='email'
              className={`auth__input ${handleFieldError("email", msgError)}`}
              autoComplete='false'
              onBlur={() => isFormValid("email")}
              onChange={handleInputChange}
              value={email}
            />
            {existError("email") && (
              <div className='auth__alert-error'>{msgError["email"]}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='password'
              name='password'
              className={`auth__input ${handleFieldError(
                "password",
                msgError
              )}`}
              autoComplete='false'
              onBlur={() => isFormValid("password")}
              onChange={handleInputChange}
              value={password}
            />
            {existError("password") && (
              <div className='auth__alert-error'>{msgError["password"]}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              className={`auth__input ${handleFieldError(
                "confirmPassword",
                msgError
              )}`}
              onBlur={() => isFormValid("confirmPassword")}
              onChange={handleInputChange}
              value={confirmPassword}
            />
            {existError("confirmPassword") && (
              <div className='auth__alert-error'>
                {msgError["confirmPassword"]}
              </div>
            )}
          </div>
          {
            <button
              disabled={
                (disableButton && Object.keys(msgError).length === 0) ||
                Object.keys(msgError).length !== 0
              }
              type='submit'
              className='btn btn-primary mt-5'>
              Register
            </button>
          }
        </div>
        <div className='block block--high-light'>
          <Link className='link' to='/auth/login'>
            ¿Already registered? Click here
          </Link>
        </div>
      </form>
    </>
  );
};
