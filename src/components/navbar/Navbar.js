import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsLoggedIn } from "../../config/Hooks";
import { BsHandbag } from "react-icons/bs";
import logo from "./logo.jpeg";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useIsLoggedIn();

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__container__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar__container__cart">
          <ul className="navbar__container__cart__ul">
            <li className="navbar__container__cart__ul__li">
              <Link to="/">
                <p>Home</p>
              </Link>
            </li>
            <li className="navbar__container__cart__ul__li">
              <Link to={isLoggedIn ? "/profile" : "/sign-in"}>
                <p>{isLoggedIn ? "Your Profile" : "Sign"}</p>
              </Link>
            </li>
            <li className="navbar__container__cart__ul__li">
              <Link
                className="navbar__container__cart__ul__li__link"
                to="/Cart"
              >
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
      </div>
    </div>
  );
};

export default Navbar;
