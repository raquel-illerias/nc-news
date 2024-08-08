import { useNavigate } from "react-router-dom";
import "./loginHomepage.css";
import { useState } from "react";

export default function LoginHomepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
  });

  function handleUserChange(e) {
    const newUsername = e.target.value;
    setUser((prevUser) => ({ ...prevUser, username: newUsername }));
  }

  function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("username", user.username);
    navigate("/articles");
  }

  return (
    <div className="login-homepage">
      <div className="login-container">
        <div className="login-container__h1-container">
          <h1 className="login-container__h1">Welcome to NC News</h1>
        </div>
        <section className="login-section">
          <form action="" className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                onChange={handleUserChange}
                value={user.username}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Sign up
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
