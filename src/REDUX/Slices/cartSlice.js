import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart :(state,action)=>{
          const exisitingProduct = state.find(item=>item.id==action.payload.id)  
          if (exisitingProduct) {
            const reminingProduct = state.filter(item=>item.id!=exisitingProduct.id)
            exisitingProduct.quantity++
            exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
            state = [...reminingProduct,exisitingProduct]
            
        } else{
           state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
        }
        },
        removecartItem: (state,action)=>{
            return state.filter(item=>item.id!==action.payload)
        }, 
        inQuantity :(state,action)=>{
            const exisitingProduct =state.find(item=>item.id==action.payload)
            exisitingProduct.quantity++
            exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
            const reminingProduct = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...reminingProduct,exisitingProduct]

        },
        deQuantity :(state,action)=>{
            const exisitingProduct =state.find(item=>item.id==action.payload)
            exisitingProduct.quantity--
            exisitingProduct.totalPrice = exisitingProduct.quantity * exisitingProduct.price
            const reminingProduct = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...reminingProduct,exisitingProduct]

        },
        emptyCart : (state,action)=>{
            return state =[]
        }
    }
})

export const {addToCart , removecartItem ,  inQuantity, deQuantity , emptyCart} = cartSlice.actions
export default cartSlice.reducer