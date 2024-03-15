import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import { Row ,Col,Card, Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import productSlice, { fetchProducts } from '../REDUX/Slices/productSlice'



function Home() {
  
  
  const dispatch = useDispatch()
  const {allProducts,error,loading} = useSelector(state=>state.productReducer)
  // console.log(allProducts,error,loading);

  const [currentPage,setCurrentPage] = useState(1)
  const productPerPage = 8
  const totalPage =Math.ceil (allProducts?.length/productPerPage)
  const lastProductIndex = currentPage * productPerPage
  const FirstProductIndex = lastProductIndex - productPerPage
  const visibileCards = allProducts?.slice(FirstProductIndex,lastProductIndex)
  
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const navigationToNext = ()=>{
    if(currentPage!=totalPage){
      setCurrentPage(currentPage+1)
    }
    
  }

  const navigationToPrev = ()=>{
    if (currentPage!=1) {
      setCurrentPage(currentPage-1)
    }
  }
  return (
    <>
      <Header insideHome ={true}/>
     <div className='container' style={{marginTop:'100px'}}> 
     { loading?<div className='mt-5 text-center fw-bloder'> <Spinner animation="border" variant="success" className='me-2' />Loading...</div>
     :
      <Row>
      { allProducts?.length  >0? (
       visibileCards?.map((product)=>(
        <Col className='mb-5' sm={12} md={6} lg={4} xl={4}>
        <Card className='shadow rounded' style={{ width: '18rem' }}>
       <Card.Img style={{height:'180px'}} variant="top" src={product?.thumbnail} />
       <Card.Body>
         <Card.Title>{product?.title.slice(0,15)}...</Card.Title>
          <div className='text-center mt-4'><Link to={`/view/ ${product?.id}`} variant="primary"> View More...</Link></div>
       </Card.Body>
     </Card>
 
          
        </Col>
       )))
       :
       <div className='fw-bolder text-primary text-center mt-5 mb-5 fs-4'>Noting to display!!</div>
       }
     </Row>
     }
     <div className="d-flex justify-content-center align-item-center-mt-5 mb-5">
      <span onClick={navigationToPrev} style={{cursor:'pointer'}} ><i className="fa-solid fa-caret-left me-2"></i></span>
      <span style={{cursor:'pointer'}} className='me-2'> {currentPage} of {totalPage}  </span>
      <span onClick={navigationToNext} style={{cursor:'pointer'}}> <i className="fa-solid fa-caret-right me-2"></i></span>
     </div>
     </div>

    </>
  )
}

export default Home
