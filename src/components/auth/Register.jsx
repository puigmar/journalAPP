import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
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
      console.log(formValues);
    }
  };

  const existError = (field) => msgError[field];

  const isFormValid = (field) => {
    switch (field) {
      case "name":
        if (name.trim().length === 0) {
          dispatch(setError("name", "Name is required"));
          return false;
        } else {
          dispatch(unsetError("name"));
        }
        break;
      case "email":
        if (email.trim().length === 0 || !validator.isEmail(email)) {
          dispatch(setError("email", "Email in not valid"));
          return false;
        } else {
          dispatch(unsetError("email"));
        }
        break;
      case "password":
        if (password.length < 6) {
          dispatch(
            setError("password", "Password should be at least 6 characthers")
          );
          return false;
        } else {
          dispatch(unsetError("password"));
        }
        break;
      case "confirmPassword":
        if (confirmPassword !== password || confirmPassword.length < 6) {
          dispatch(
            setError(
              "confirmPassword",
              "Password and Confirmation have to match"
            )
          );
          return false;
        } else {
          dispatch(unsetError("confirmPassword"));
        }
        break;
      default:
        dispatch(unsetError());
        return true;
    }
  };

  const handleFieldError = (field, errors = []) => {
    const labelErrors = Object.keys(errors);
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
