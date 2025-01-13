import Booking from "./Components/bookingcomponent/Booking"
// import Form from "./Components/bookingcomponent/BookForm"

import Footer from "./Components/homecomponent/Footer"

import BookForm from "./Components/bookingcomponent/BookForm"
import CustomerNav from "./Components/NavbarComponents/CustomerNav"


function Book() {
  return (
    <>
    <CustomerNav/>
      <Booking/>
  
    <BookForm/>
      <Footer/>
    </>
  )
}

export default Book
