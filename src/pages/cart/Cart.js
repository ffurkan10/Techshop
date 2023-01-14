import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotal,
  remove,
} from "../../features/CartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const status = useSelector((state) => state.data.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  const handleRemove = (cartProduct) => {
    dispatch(remove(cartProduct));
  };

  const handleIncrease = (cartProduct) => {
    dispatch(addToCart(cartProduct));
  };

  const handleDecrease = (cartProduct) => {
    dispatch(decreaseCart(cartProduct));
  };

  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Your Cart</h2>{" "}
        <span>
          {" "}
          ( {cart?.cartItems?.length === 0 ? "0" : cart?.cartItems?.length}
        </span>
        <span>item )</span>
      </div>

      {cart?.cartItems?.length === 0 && (
        <div className="emptyCart">
          <h2>Your cart is empty!</h2>
          <p>To make a choice</p>
          <Link to="/">
            <button>Return to home</button>
          </Link>
        </div>
      )}
      <div className="cart__container">
        <div className="cart__container__items">
          {cart.cartItems.map((cartProduct) => (
            <div className="cart__container__items__box" key={cartProduct.id}>
              <div className="cart__container__items__box__left">
                <div className="cart__container__items__box__left__img">
                  <img src={cartProduct?.coverImage} alt="" />
                </div>
                <div className="cart__container__items__box__left__feature">
                  <p>{cartProduct?.name}</p>
                  <p>
                    <strong>
                      {cartProduct?.isPriceRange.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="cart__container__items__box__right">
                <button onClick={() => handleIncrease(cartProduct)}>+</button>
                <p>{cartProduct?.cartQuantity}</p>
                <button onClick={() => handleDecrease(cartProduct)}>-</button>
              </div>
              <div className="cart__container__items__box__mid">
                <span>
                  <strong>
                    {(
                      cartProduct?.isPriceRange * cartProduct.cartQuantity
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </strong>
                </span>
                <button onClick={() => handleRemove(cartProduct)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {cart?.cartItems?.length >= 1 && (
          <div className="cart__container__total">
            <div className="cart__container__total__subtotal">
              <div className="cart__container__total__subtotal__left">
                <h2>Subtotal</h2>
              </div>
              <div className="cart__container__total__subtotal__right">
                {cart?.cartTotalAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <div className="cart__container__total__check">
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <Link to="/">
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
