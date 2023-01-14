import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  currentPage: 0,
  totalPages: 0,
  status: "idle",
};

export const fetchItem = createAsyncThunk("fetchItem", async (page) => {
  const response = await axios.get(
    `https://mern-ecommerce-backend-ten.vercel.app/api/products?page=${page}`
  );
  return {
    products: response.data.products,
    totalPages: response.data.totalPages,
  };
});

const ItemSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    remove: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.data = action.payload;
      state.totalPages = action.payload.totalPages;

      state.status = "succeeded";
    });
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default ItemSlice.reducer;

export const selectAllPosts = (state) => state.data.data;
export const selectItemById = (state, id) =>
  state?.data?.data?.products?.find((item) => item.id === id);

export const { setCurrentPage, remove } = ItemSlice.actions;
