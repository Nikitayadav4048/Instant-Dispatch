import React from 'react'
import Navbar from './Components/homecomponent/Navbar'
import Footer from './Components/homecomponent/footer'
import Orderlisthead from './Components/Orderlist/orderlisthead'
// import Dashbord from './Components/Orderlist/Dashbord'

 const Oderlistpage = () => {
  return (
    <>
      <Navbar />
      {/* <Dashbord />  */}
      <Orderlisthead />
      <Footer />
    </>
  )
}
export default Oderlistpage