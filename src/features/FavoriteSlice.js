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
        // state içerisindeki "favorites" dizisinde action payload'ının id'sine eşit olan bir eleman bulunur.
        (item) => item.id === action.payload.id
      );
      if (itemFavorite) {
        return;
      } else {
        state.favorites.push({ ...action.payload }); // action payload'ındaki verilerle birlikte yeni bir eleman "favorites" dizisine eklendi
        toast.success(`${action.payload.name} added to favorites`);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      const itemFavorite = state.favorites.filter(
        //"favorites" dizisinde action payload'ının id'sine eşit olmayan elemanları bulunur
        (item) => item.id !== action.payload.id
      );
      state.favorites = itemFavorite; // state içerisindeki "favorites" değişkenine eşitlenir.
      toast.success(`${action.payload.name} removed from favorites`);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
