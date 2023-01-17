import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsLoggedIn } from "../../config/Hooks";
import { BsHandbag } from "react-icons/bs";
import logo from "./logo.jpeg";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useIsLoggedIn();

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar__container__menu">
          <div className="navbar__container__menu__card">
            <ul
              className={
                sidebar
                  ? `navbar__container__menu__card__ul__active`
                  : `navbar__container__menu__card__ul`
              }
            >
              <li className="navbar__container__menu__card__ul__li">
                <Link to="/">
                  <AiIcons.AiOutlineHome size={"25px"} />
                  <p>Home</p>
                </Link>
              </li>
              <li className="navbar__container__menu__card__ul__li">
                <Link to={isLoggedIn ? "/profile" : "/sign-in"}>
                  <AiIcons.AiOutlineUser size={"25px"} />
                  <p>{isLoggedIn ? "Your Profile" : "Sign"}</p>
                </Link>
              </li>
              <li className="navbar__container__menu__card__ul__li">
                <Link to="/favorites">
                  <AiIcons.AiOutlineHeart size={"25px"} />
                  <p>Favorites</p>
                </Link>
              </li>
              <li className="navbar__container__menu__card__ul__li">
                <Link to="/Cart">
                  <button>
                    <BsHandbag />
                  </button>
                  <span>
                    {cart?.cartItems?.length === 0
                      ? "0"
                      : cart?.cartItems?.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar__container__menu__hamburger">
            <Link>
              {sidebar ? (
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              ) : (
                <FaIcons.FaBars onClick={showSidebar} />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
