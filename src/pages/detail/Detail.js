import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectItemById } from "../../features/ItemSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Scrollbar, Pagination } from "swiper";
import moment from "moment/moment";
import ReactStars from "react-rating-stars-component";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Loading from "../../components/loading/Loading";

const Detail = () => {
  const { id } = useParams();
  const status = useSelector((state) => state.data.status);
  const item = useSelector((state) => selectItemById(state, id));

  if (status === "loading") {
    return <Loading />;
  }

  const productStar = {
    size: 40,
    count: 5,
    isHalf: false,
    color: "grey",
    border: "yellow",
    activeColor: "#FFD700",
    onChange: (newValue) => {
      console.log(`Example 3: new value is ${newValue}`);
    },
  };

  return (
    <div className="itemDetail">
      <div className="itemDetail__container">
        <div className="itemDetail__container__detail">
          <div className="itemDetail__container__detail__img">
            <Swiper
              style={{ cursor: "pointer" }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {item?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <picture>
                    <source srcSet={image} type="image/webp" />
                    <img src={image} alt="" />
                  </picture>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="itemDetail__container__detail__feature">
            <div className="itemDetail__container__detail__feature__name">
              <h1>{item?.name}</h1>
              <p>{item?.title}</p>
            </div>

            <div className="itemDetail__container__detail__feature__price">
              <p>
                <strong>
                  {item?.isPriceRange.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </strong>
              </p>
            </div>
            <div className="itemDetail__container__detail__feature__rate">
              <ReactStars value={item?.rating} edit={false} size={25} />
              <span>({item?.ratingCount}) Reviews</span>
            </div>
            <div className="itemDetail__container__detail__feature__btn">
              <button>Add to Cart</button>
            </div>
          </div>
        </div>

        <div className="itemDetail__container__information">
          <div className="itemDetail__container__information__header">
            <h2>Product Features</h2>
          </div>
          <ul className="itemDetail__container__information__ul">
            {item?.properties?.productDetails?.specifications.map(
              (item, index) => (
                <li
                  className="itemDetail__container__information__ul__li"
                  key={index}
                >
                  <div className="itemDetail__container__information__ul__li__img">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="itemDetail__container__information__ul__li__detail">
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <span>{item.value}</span>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="itemDetail__container__comments">
          <div className="itemDetail__container__comments__header">
            <h2>User Comments</h2>
          </div>
          <ul className="itemDetail__container__comments__reviews">
            {item?.properties?.customerReviews?.reviews.map((item, index) => (
              <li
                className="itemDetail__container__comments__reviews__li"
                key={index}
              >
                <div className="itemDetail__container__comments__reviews__li__user">
                  <div className="itemDetail__container__comments__reviews__li__user__content">
                    <div className="itemDetail__container__comments__reviews__li__user__content__picture">
                      <picture>
                        <source
                          src={`https://i.pravatar.cc/300?img${index}`}
                          type="image/webp"
                        />
                        <img
                          src={`https://i.pravatar.cc/300?img${index}`}
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="itemDetail__container__comments__reviews__li__user__content__comment">
                      <h3>{item.name}</h3>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                </div>
                <div className="itemDetail__container__comments__reviews__li__date">
                  <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                  <ReactStars value={item?.rating} edit={false} size={25} />
                </div>
              </li>
            ))}
          </ul>
          <div className="itemDetail__container__comments__rateThis">
            <p>
              <strong>Rate this product</strong>
            </p>
            <ReactStars value={item?.rating} {...productStar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
