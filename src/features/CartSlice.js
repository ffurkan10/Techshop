import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  isLoading: false,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      ); // sepet öğeleri arasında aynı id'ye sahip bir ürün var mı diye kontrol ettik

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1; // var ise sepet adedini bir arttır
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }; // yok ise ürünü sepete ekler
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    remove: (state, action) => {
      // sepet öğelerinden action.payload ile belirtilen id'ye sahip ürün filtrelendi.
      const nextCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      toast.info(`${action.payload.name} deleted`);
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      ); // Azaltma işlemi yapılırken aynı şekilde sepet öğeleri arasındaki ürün bulundu
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        // adedi 1'den fazla ise bir azaltıldı
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        // 1 ise tamamen sepetten çıkarıldı
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.info(`${action.payload.name} deleted`);
        state.cartItems = nextCartItems;
      }
    },

    getTotal: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        // tek bir değere reduce ediyoruz
        (cartTotal, cartItem) => {
          const { isPriceRange, cartQuantity } = cartItem; // değerleri çektik
          const itemTotal = isPriceRange * cartQuantity; // çarpımı oluşturduk

          cartTotal.total += itemTotal; //"cartTotal" nesnesinin "total" ve "quantity" özellikleri her bir döngüde
          cartTotal.quantity += cartQuantity; // "itemTotal" ve "cartQuantity" değerleri ile arttırılır.

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity; // state'in cartTotalQuantity özelliğine quantity değerini atadık
      state.cartTotalAmount = total; // state'in cartTotalAmount özelliğine total değerini atadık.
    },
  },
});

export const { addToCart, remove, decreaseCart, getTotal } = CartSlice.actions;
export default CartSlice.reducer;
