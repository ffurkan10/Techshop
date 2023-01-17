import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const FavoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
  },
  reducers: {
    addFavorite(state, action) {
      const itemFavorite = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (itemFavorite) {
        return;
      } else {
        state.favorites.push({ ...action.payload });
        toast.success(`${action.payload.name} added to favorites`);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      const itemFavorite = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      state.favorites = itemFavorite;
      toast.success(`${action.payload.name} removed from favorites`);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
