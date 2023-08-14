import React from "react";
import { useState } from "react";
import styles from "../styles/Login.module.css";

const Login = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email.trim(), password.trim());
      }}
      className={styles.login_form}
    >
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button disabled={loading} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
