import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slices/productSlice";
import wishilistSlice from "./Slices/wishilistSlice";
import cartSlice from "./Slices/cartSlice";


const cartStore =configureStore({
    reducer:{
        productReducer:productSlice,
        wishilistReducer:wishilistSlice,
        cartReducer: cartSlice 
    }
})

export default cartStore