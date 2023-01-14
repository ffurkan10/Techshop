import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem, selectAllPosts } from "../../features/ItemSlice";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { addToCart } from "../../features/CartSlice";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Pagination from "../../components/pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const item = useSelector(selectAllPosts);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItem());
    }
  }, [dispatch, status]);

  const handleAdd = (list) => {
    dispatch(addToCart(list));
  };

  if (status === "failed") {
    return <Error message={error} />;
  }

  return (
    <div className="itemlist">
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="itemlist__container">
          <ul className="itemlist__container__main">
            {item.products.map((list) => (
              <li key={list.id} className="itemlist__container__main__card">
                <Link to={`/itemdetail/${list.id}`}>
                  <div className="itemlist__container__main__card__img">
                    <img src={list?.coverImage} alt="" />
                  </div>
                  <div className="itemlist__container__main__card__title">
                    <span>
                      {" "}
                      <strong> {list?.title} </strong>
                    </span>
                    <span>{list?.name}</span>
                  </div>
                  <div className="itemlist__container__main__card__price">
                    <p>
                      <strong>
                        {list?.isPriceRange.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </strong>
                    </p>
                  </div>
                  <div className="itemlist__container__main__card__rate">
                    <ReactStars value={list?.rating} edit={false} size={25} />
                    <span>({list?.ratingCount})</span>
                  </div>
                </Link>
                <button onClick={() => handleAdd(list)}>Add To Cart</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
