import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../features/FavoriteSlice";
import * as AiIcons from "react-icons/ai";

const Favorites = () => {
  const favorite = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFav = (itemFavorite) => {
    dispatch(removeFavorite(itemFavorite));
  };

  return (
    <div className="favorites">
      {favorite?.favorites?.length === 0 && (
        <div className="emptyCart">
          <h2>Your favorites is empty!</h2>
          <p>To make a choice</p>
          <Link to="/">
            <button>Return to home</button>
          </Link>
        </div>
      )}
      <div className="favorites__container">
        <ul className="favorites__container__list">
          {favorite.favorites?.map((itemFavorite) => (
            <li
              key={itemFavorite.id}
              className="favorites__container__list__map"
            >
              <Link to={`/itemdetail/${itemFavorite.id}`}>
                <div className="favorites__container__list__map__card">
                  <div className="favorites__container__list__map__card__img">
                    <img src={itemFavorite?.coverImage} alt="" />
                  </div>
                  <div className="favorites__container__list__map__card__name">
                    <span>
                      <strong>{itemFavorite?.name}</strong>
                    </span>
                    <span>{itemFavorite?.title}</span>
                  </div>
                </div>
              </Link>
              <div className="favorites__container__list__map__icon">
                <button onClick={() => handleRemoveFav(itemFavorite)}>
                  <AiIcons.AiFillHeart />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
