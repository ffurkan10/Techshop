import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeName,
  changeEmail,
  changePassword,
  register,
} from "../../features/AuthSlice";

const SignUp = () => {
  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const handleName = (e) => {
    dispatch(changeName(e.currentTarget.value));
  };

  const handleEmail = (e) => {
    dispatch(changeEmail(e.currentTarget.value));
  };

  const handlePassword = (e) => {
    dispatch(changePassword(e.currentTarget.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up </h1>
      <input
        type="text"
        autoFocus
        autoComplete="name"
        name="name"
        placeholder="Full Name"
        required
        onChange={handleName}
        value={name}
      />
      <input
        type="email"
        autoComplete="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleEmail}
        value={email}
      />
      <input
        type="password"
        autoComplete="password"
        name="password"
        placeholder="Password"
        required
        onChange={handlePassword}
        value={password}
      />
      <button type="submit" disabled={isLoading}>
        {" "}
        {isLoading ? "Loading..." : "Sign up"}
      </button>
      <div className="sign__container__link">
        <Link to="/sign-in">Already have an account? Sign in</Link>
      </div>
    </form>
  );
};

export default SignUp;
