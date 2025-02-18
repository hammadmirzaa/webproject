import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../store/authContext";

const LoginForm = () => {
  const {formData, setFormData, login} = UseAuthContext()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   login()

  };

  return (
    <div>
      <h2 >Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label  htmlFor="username">
          Username or Email
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
