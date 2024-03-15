import React from 'react'
import {Nav, Navbar,Form ,Container,Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { searchProduct } from '../REDUX/Slices/productSlice';

function Header({insideHome}) {

  const dispatch = useDispatch()
  const wishlistCount = useSelector(state=>state.wishilistReducer).length

  const cartCount = useSelector(state=>state.cartReducer).length

  return (
    <>
      <div  style={{color:'white'}} >
       <Navbar style={{zIndex:'10'}} expand="lg" className="bg-primary position-fixed top-0 w-100">
        <Container fluid className=''>
          <Navbar.Brand  > <Link to={'/'} style={{textDecoration:'none', color:'white'}}><i className="fa-solid fa-truck-fast "> </i> E Cart</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          
           {
           insideHome &&
            <Nav.Link>
              <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text" style={{width:'400px'}} className='form-control'placeholder="Search" />
               
           </Nav.Link>
           }
            <Nav 
              className="ms-auto my-2 my-lg-0  "
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
             <Nav.Link ><Link to={'/wishlist'} className='text-light fw-bolder' style={{textDecoration:'none'}}>
                <i className="fa-solid fa-heart text-primary"></i> Wishlist <Badge bg="secondary">{wishlistCount}</Badge>
                </Link></Nav.Link>

              <Nav.Link ><Link to={'/cart'}  style={{color:'white',textDecoration:'none'}}><i className="fa-solid fa-cart-shopping "></i> Cart <Badge bg="secondary">{cartCount}</Badge></Link></Nav.Link>
             
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    </>
  )
}

export default Header
