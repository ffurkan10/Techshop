import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../features/CartSlice";
import ItemSlice from "../features/ItemSlice";
import authSlice from "../features/AuthSlice";
import FavoriteSlice from "../features/FavoriteSlice";

export default configureStore({
  reducer: {
    data: ItemSlice,
    cart: CartSlice,
    auth: authSlice,
    favorites: FavoriteSlice,
  },
});
