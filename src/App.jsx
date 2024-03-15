
import './App.css'
import Footer from './Component/Footer'

import {Navigate, Route, Routes  } from 'react-router-dom'
import Wishilist from './pages/Wishilist'
import Cart from './pages/Cart'
import Home from './pages/Home'
import View from './pages/View'
function App() {
  

  return (
    <>
    
     <Routes>
       <Route path ='/' element={<Home/>} />
       <Route path ='/wishlist' element={<Wishilist/>} />
       <Route path ='/cart' element={<Cart/>} />
       <Route path ='/view/:id' element={<View/>} />
       <Route path ='/*' element={<Navigate to={'/'}/>} />
     </Routes>
     
     <Footer/>
    </>
  )
}

export default App
