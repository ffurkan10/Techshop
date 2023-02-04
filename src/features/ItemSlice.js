import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  currentPage: 0, //geçerli sayfa numarasını tutar
  totalPages: 0, // toplam sayfa sayısını tutar
  status: "idle",
};

export const fetchItem = createAsyncThunk("fetchItem", async (page) => {
  // axios kütüphanesini kullanarak API'ye bir GET isteği yapan bir Redux Toolkit async thunk aksiyonu
  const response = await axios.get(
    `https://mern-ecommerce-backend-ten.vercel.app/api/products?page=${page}`
  ); // API yanıtındaki ürün verilerini ve toplam sayfa sayısını döndürür.
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
