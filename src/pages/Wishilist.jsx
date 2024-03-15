import React from "react";
import Header from "../Component/Header";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../REDUX/Slices/wishilistSlice";
import { addToCart } from "../REDUX/Slices/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

function Wishilist() {
  const cart =useSelector(state=>state.cartReducer)
  const wishlist = useSelector((state) => state.wishilistReducer)
  const dispatch = useDispatch()

  const handleCart = (product)=>{
    const exisitingProduct = cart?.find(item=>item.id==product.id)
   if (exisitingProduct) {
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
    toast.success("Products added to your cart!!!")
   } else{
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
    
   }
  }
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
      { wishlist?.length>0?
       
        
        <Row>
          {
            wishlist?.map(product=>(
              <Col className="mb-5" sm={12} md={6} lg={4} xl={4}>
              <Card className="shadow rounded" style={{ width: "14rem" }}>
                <Card.Img
                
                  variant="top"
                  src={product?.thumbnail}
                />
                <Card.Body>
                  <Card.Title>{product?.title.slice(0,16)}...</Card.Title>
  
                  <div className="d-flex justify-content-between">
                    <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className="btn ">
                    <i className="fa-solid fa-heart-circle-xmark text-danger"></i>{" "}
                    </button>
                    <button onClick={()=>handleCart(product)} className="btn ">
                      <i className="fa-solid fa-cart-plus text-success"></i>{" "}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            ))
          
          }
        </Row>
        :
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
      }
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  );
}

export default Wishilist;
