import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slices/wishilistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function View() {
  const cart = useSelector(state=>state.cartReducer)
  const wishlist = useSelector(state=>state.wishilistReducer)
 const dispatch = useDispatch()
  const [product,setProduct] = useState({})
  const {id}= useParams()
  // console.log(id);

  useEffect(()=>{
   if(sessionStorage.getItem("allProducts")){
    const allProducts =JSON.parse(sessionStorage.getItem("allProducts"))
    // console.log(allProducts);
    setProduct(allProducts.find(item=>item.id==id))
   }
  },[])
  // console.log(product);

 const handleWish=(product)=>{
   if(wishlist?.includes(product)){
    toast.info('item already in your Wishlist!!!')
   }else{
    dispatch(addWishlistItem(product))
   }
  }

  const handleCart = (product)=>{
    const exisitingProduct = cart?.find(item=>item.id==product.id)
   if (exisitingProduct) {
    dispatch(addToCart(product))
    toast.success("Products added to your cart!!!")
   } else{
    dispatch(addToCart(product))
   toast.success("Product added to your cart!!!")
   }
  }
  return (
    <>
    <Header/>
    <div style={{marginTop:'150px', height:'50vh'}} className='container d-flex'>
      <div className="row mb-5 aligin-item-center">
        <div className="col-lg-1"></div>
        <div className="col-lg-4">
          <img width={'400px'} height={'300px'} className='imgfluid' src={product?.thumbnail} alt="" />

        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-5">
          <h5> PID : {product?.id}</h5>
          <h1>{product?.title}</h1>
          <h3 className='text-danger'>$ {product?.price}</h3>
          <p style={{textAlign:'justify'}}><b>Description</b> :{product?.description}</p>
          <div className="d-flex justify-content-between">
            <button onClick={()=>handleWish(product)} className='btn btn-outline-dark'><i className="fa-solid fa-heart "></i> Wishlist</button>
            <button onClick={()=>handleCart(product)} className='btn btn-outline-dark'><i className="fa-solid fa-cart-shopping text-warnig"></i> Cart</button>
          </div>
        </div>
       
 
      </div>

    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      
    </>
  )
}

export default View
