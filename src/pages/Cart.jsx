import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removecartItem, inQuantity, deQuantity, emptyCart  } from "../REDUX/Slices/cartSlice";

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartReducer);
   const [cartTotal,setCartTotal]= useState(0)
  useEffect(()=>{
if(cartItems?.length>0){
  setCartTotal(cartItems?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
}else{
  setCartTotal(0)
}
  },[cartItems])

  const handleDecrementQuantity =(product)=>{
    if (product.quantity>1) {
      dispatch(deQuantity(product.id))
    }else{
      dispatch(removecartItem(product.id))
    }
  }
  return (
    <>
      <Header />

      <div className="container" style={{ marginTop: "100px" }}>
        {cartItems?.length > 0 ? (
          <div className="pt-5">
            <h1>Cart Summary</h1>
            <div className="row mt-5">
              <div className="col-lg-8">
                <table className="table">
                  <thead>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Qauntity</th>
                    <th>Price</th>
                    <th>...</th>
                  </thead>
                  <br />
                  <tbody>
                   { 
                   cartItems?.map((product,index)=>(
<tr>
                      <td>{index+1}</td>
                      <td>{product.title.slice(0,16)}...</td>
                      <td>
                        <img
                          width={"60px"}
                          height={"60px"}
                          src={product.thumbnail}
                          alt=""
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <button onClick={()=>handleDecrementQuantity(product)} className="btn fw-bolder text-dark">-</button>
                          <input
                          value={product.quantity}
                            style={{ width: "50px" }}
                            className="form-control text-center"
                            type="text"
                            placeholder="0"
                            readOnly
                          />
                          <button onClick={()=>dispatch(inQuantity(product.id))} className="btn fw-bolder text-dark">+</button>
                        </div>
                      </td>
                      <td>$ {product.totalPrice}</td>
                      <td>
                        <button onClick={()=>dispatch(removecartItem(product.id))} className="btn">
                          <i class="fa-solid fa-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                   ))
                   }
                  </tbody>
                </table>
                <div className="float-end mt-3">
                  <button onClick={()=>dispatch(emptyCart())} className="btn btn-primary">EMPTY CART</button>
                  <Link className="btn btn-danger ms-5" to={"/"}>
                    SHOP MORE
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shadow border-rounded p-4">
                  <h5>
                    Total Product: <b className="text-primary">{cartItems?.length}</b>{" "}
                  </h5>
                  <h5>
                    Total Amount: <b className="text-primary">$ {cartTotal}</b>{" "}
                  </h5>
                  <div className="d-grid mt-4">
                    <button className="btn btn-success">Check Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ height: "70vh" }}
            className="w-100 d-flex justify-content-center align-items-center flex-column"
          >
            <img
              width={"400px"}
              className="img-fluid"
              src="https://cdn-icons-png.flaticon.com/512/2854/2854521.png"
              alt=""
            />
            <h3>Your Wishlist Is Empty</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
