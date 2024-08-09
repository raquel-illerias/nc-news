import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import logoutIcon from "../../assets/logout-icon.svg";

export default function Header() {
  const location = useLocation();
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [localStorage.getItem("username")]);

  return (
    !(location.pathname === "/") && (
      <div className="header">
        <Link className="logo-anchor" to="/articles">
          <img
            className="logo-img"
            src={logo}
            alt="Company logo featuring a stylized globe with interconnected lines symbolizing global connectivity. The logo is composed of blue and teal colors, emphasizing a modern and digital look."
          />
          <h1>NC NEWS</h1>
        </Link>
        <div className="header__log-container">
          <div className="header__username-container">
            <h2 className="header__username">
              Hi,{" "}
              {username &&
                username.charAt(0).toUpperCase() +
                  username.slice(1).toLowerCase()}
              !
            </h2>
          </div>
          <div className="logout-container">
            <Link to={`/`}>
              <img
                className="header__logout-img"
                src={logoutIcon}
                alt="Icon depicting a logout symbol, which consists of a right-pointing arrow exiting an open door."
              />
              <h2 className="header__logout-text">Logout</h2>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
